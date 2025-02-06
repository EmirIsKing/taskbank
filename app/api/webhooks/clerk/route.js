import { clerkClient } from "@clerk/nextjs/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { doc, setDoc, getDoc, updateDoc, increment, query, where, getDocs } from "firebase/firestore"; 
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/utils/firebase/clientApp";  // Ensure this is correctly set up and points to your Firestore database

// Function to generate a random referral code
function generateReferralCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  console.log('check 1')

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  console.log('check 2')


  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  console.log('check 3')


  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, username, first_name, last_name } = evt.data;
    
    // Get referral code from user's public metadata
    const user_data = await clerkClient.users.getUser(id);
    const referredByCode = user_data.publicMetadata.referredBy || null;
    
    // Generate a unique referral code for the new user
    const referralCode = generateReferralCode();

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username,
      firstName: first_name,
      lastName: last_name,
      reward: 0,
      offers: [],
      referrals: [],
      referralCode: referralCode,
      referredBy: referredByCode || null,
      referralCount: 0,
      referralEarnings: 0,
      notification: [{
        date: new Date,
        message: `Welcome to Taskbank, ${first_name}! 🎉 We're thrilled to have you on board. Ready to start earning rewards by completing simple tasks? You're just a few steps away from unlocking exciting opportunities to make money in your spare time.`
      }],
    };

    console.log('check 4')


    console.log('Creating new user');

    try {
      // Firestore: Create a new user document
      const userDocRef = doc(db, 'users', id); // Use Clerk ID as the document ID
      await setDoc(userDocRef, user);

      // If user was referred, update referrer's stats
      if (referredByCode) {
        try {
          // Query for the referrer using the referral code
          const usersRef = collection(db, 'users');
          const q = query(usersRef, where('referralCode', '==', referredByCode));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const referrerDoc = querySnapshot.docs[0];
            
            // Update referrer's stats
            await updateDoc(doc(db, 'users', referrerDoc.id), {
              referralCount: increment(1),
              referralEarnings: increment(5) // Add 5 units to earnings (adjust as needed)
            });

            // Create a record in the referrals collection
            await addDoc(collection(db, 'referrals'), {
              referrerId: referrerDoc.id,
              referredId: id,
              referralCode: referredByCode,
              timestamp: new Date(),
              status: 'completed'
            });
          }
        } catch (error) {
          console.error("Error processing referral:", error.message);
          console.error("Full error:", error);
          // Continue with user creation even if referral processing fails
        }
      }

      return new Response(JSON.stringify({ message: "New user created", user }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Error creating user or updating metadata:", error);
      return new Response('Error creating user', {
        status: 500,
      });
    }
  }

  console.log('check 5')


  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);

  return new Response('Done', { status: 200 });
}
