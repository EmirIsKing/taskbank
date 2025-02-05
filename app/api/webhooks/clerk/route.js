import { clerkClient } from "@clerk/nextjs/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { doc, setDoc } from "firebase/firestore"; 
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/utils/firebase/clientApp";  // Ensure this is correctly set up and points to your Firestore database

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

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

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, username, first_name, last_name } = evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username,
      firstName: first_name,
      lastName: last_name,
      reward: 0,
      offers: [],
      referrals: [],
      notification: [{
        date: new Date,
        message: `Welcome to Taskbank, ${first_name}! 🎉 We're thrilled to have you on board. Ready to start earning rewards by completing simple tasks? You're just a few steps away from unlocking exciting opportunities to make money in your spare time.`
      }],
    };

    console.log('Creating new user');

    try {
      // Firestore: Create a new user document
      const userDocRef = doc(db, 'users', id); // Use Clerk ID as the document ID
      await setDoc(userDocRef, user);

      

      // Update Clerk user metadata with Firestore document ID
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: id, // Firestore document ID is the same as Clerk ID in this case
        },
      });

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

  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);

  return new Response('Done', { status: 200 });
}
