import { clerkClient } from '@clerk/nextjs/server';
import { Webhook } from "svix";
import { headers } from "next/headers";
import { doc, setDoc, updateDoc, collection, addDoc, query, where, getDocs, getDoc } from "firebase/firestore";
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
      email: emailAddresses[0].emailAddress,
      username,
      firstName,
      lastName,
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
          message: `Welcome to Taskbank, ${firstName}! 🎉 Ready to start earning rewards by completing simple tasks?`,
        },
      ],
    };

    console.log("Creating new Firestore user");

    try {
      const userDocRef = doc(db, "users", id);
      await setDoc(userDocRef, user, { merge: true });

      if (referredByCode) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("referralCode", "==", referredByCode));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const referrerDoc = querySnapshot.docs[0];
          const referrerId = referrerDoc.id;

          const referrerUserDocRef = doc(db, "users", referrerId);
          const referrerData = (await getDoc(referrerUserDocRef)).data();

          // Update referral stats for referrer
          await updateDoc(referrerUserDocRef, {
            referralCount: (referrerData.referralCount || 0) + 1,
            referralEarnings: (referrerData.referralEarnings || 0) + 0.10,
          });

          // Add referral entry under referrals/{referrerId}/{auto-generated-doc}
          const referralSubCollectionRef = collection(db, "referrals", referrerId, "referrals");
          await addDoc(referralSubCollectionRef, {
            referrerId: referrerId,
            referredId: id,
            referralCode: referredByCode,
            timestamp: new Date(),
            rewardPaid: "Paid",
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
