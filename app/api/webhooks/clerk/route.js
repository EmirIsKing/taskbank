import { clerkClient } from '@clerk/nextjs/server'
import { Webhook } from "svix";
import { headers } from "next/headers";
import { doc, setDoc, updateDoc, increment, query, where, getDocs, collection, addDoc, getDoc } from "firebase/firestore"; 
import { db } from "@/utils/firebase/clientApp"; 

function generateReferralCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("Missing WEBHOOK_SECRET");
    return new Response("Server misconfigured", { status: 500 });
  }

  const headerPayload = headers();
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id"),
    "svix-timestamp": headerPayload.get("svix-timestamp"),
    "svix-signature": headerPayload.get("svix-signature"),
  };

  if (!svixHeaders["svix-id"] || !svixHeaders["svix-timestamp"] || !svixHeaders["svix-signature"]) {
    return new Response("Missing webhook headers", { status: 400 });
  }

  const payload = await req.json();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(JSON.stringify(payload), svixHeaders);
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Webhook verification failed", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    console.log("Fetching Clerk user with ID:", id);
    if (!id) {
      console.error("User ID is undefined");
      return new Response("Invalid user ID", { status: 400 });
    }

    const client = await clerkClient();


    let user_data;
    try {
      user_data = await client.users.getUser(id);
    } catch (error) {
      console.error("Error fetching user from Clerk:", error);
      return new Response("Error fetching user", { status: 500 });
    }

    const { emailAddresses, username, firstName, lastName } = user_data;
    const referredByCode = user_data.unsafeMetadata.referredBy || null;
    const referralCode = generateReferralCode();

    const user = {
      clerkId: id,
      email: emailAddresses[0].emailAddress ,
      username,
      firstName: firstName,
      lastName: lastName,
      reward: 0,
      referralCode,
      referredBy: referredByCode,
      referralCount: 0,
      offers: [],
      withdrawal: [],
      dateJoined: new Date(),
      referralEarnings: 0,
      notification: [
        {
          date: new Date(),
          message: `Welcome to Taskbank, ${firstName}! 🎉 We're thrilled to have you on board. Ready to start earning rewards by completing simple tasks? You're just a few steps away from unlocking exciting opportunities to make money in your spare time.`,
        },
      ],
    };

    console.log("Creating new Firestore user");

    try {
      const userDocRef = doc(db, "users", id);
      await setDoc(userDocRef, user, { merge: true });  // ✅ Prevents overwriting
    
      if (referredByCode) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("referralCode", "==", referredByCode));
        const querySnapshot = await getDocs(q);
    
    
        if (querySnapshot) {
          const referrerDoc = querySnapshot.docs[0];
        
          const userDocRef = doc(db, "users", referrerDoc.id);
          const userDoc = await getDoc(userDocRef);
          const userInfo = userDoc.data();
    
          await updateDoc(userDocRef, {
            referralCount: (userInfo.referralCount || 0) + 1,  // ✅ Ensures it exists
            referralEarnings: (userInfo.referralEarnings || 0) + 0.10,
          });
    
          const referralDocRef = doc(db, "referrals", referredByCode);
          const referralInfoDoc = await getDoc(referralDocRef);
          const referralInfo = referralInfoDoc.data();

          const referralDoc = [
            ...(referralInfo || []),
            {
            referrerId: referrerDoc.id,
            referredId: id,
            referralCode: referredByCode,
            timestamp: new Date(),
            rewardPaid: "Paid",
            status: "completed",
          }];
    
          await setDoc(referralDocRef, referralDoc);
        }
      }
    
      return new Response(JSON.stringify({ message: "User created", user }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Firestore error:", error);
      return new Response("Error creating user", { status: 500 });
    }
    
  }

  console.log(`Webhook received: ${eventType}`);
  return new Response("OK", { status: 200 });
}
