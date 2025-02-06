import { clerkClient } from "@clerk/clerk-sdk-node"; // Ensure correct import
import { Webhook } from "svix";
import { headers } from "next/headers";
import { doc, setDoc, updateDoc, increment, query, where, getDocs, collection, addDoc } from "firebase/firestore"; 
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

    let user_data;
    try {
      user_data = await clerkClient.users.getUser(id);
    } catch (error) {
      console.error("Error fetching user from Clerk:", error);
      return new Response("Error fetching user", { status: 500 });
    }

    const { email_addresses, username, first_name, last_name } = user_data;
    const referredByCode = user_data.publicMetadata.referredBy || null;
    const referralCode = generateReferralCode();

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username,
      firstName: first_name,
      lastName: last_name,
      reward: 0,
      referrals: [],
      referralCode,
      referredBy: referredByCode,
      referralCount: 0,
      referralEarnings: 0,
      notification: [
        {
          date: new Date(),
          message: `Welcome to Taskbank, ${first_name}! 🎉 Ready to start earning?`,
        },
      ],
    };

    console.log("Creating new Firestore user");

    try {
      const userDocRef = doc(db, "users", id);
      await setDoc(userDocRef, user);

      if (referredByCode) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("referralCode", "==", referredByCode));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const referrerDoc = querySnapshot.docs[0];

          await updateDoc(doc(db, "users", referrerDoc.id), {
            referralCount: increment(1),
            referralEarnings: increment(5),
          });

          await addDoc(collection(db, "referrals"), {
            referrerId: referrerDoc.id,
            referredId: id,
            referralCode: referredByCode,
            timestamp: new Date(),
            status: "completed",
          });
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
