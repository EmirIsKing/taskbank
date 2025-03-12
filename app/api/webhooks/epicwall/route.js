import { doc, setDoc, updateDoc, getDoc, query, collection, where, getDocs } from "firebase/firestore"; 
import { db } from "@/utils/firebase/clientApp"; 

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const offer_id = searchParams.get("offer_id");
    const offer_name = searchParams.get("offer_name");
    const payout = parseFloat(searchParams.get("payout")) || 0;
    const timestamp = searchParams.get("start_time");
    const conversion_ip = searchParams.get("ip");
    const amount = parseFloat(searchParams.get("reward")) || 0;
    const secret = searchParams.get("secret");

    if (!user_id) {
      return new Response(JSON.stringify({ error: "Missing user_id" }), { status: 400 });
    }

    // ✅ Get user document where referral_code == user_id
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("referral_code", "==", user_id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching user found for referral_code:", user_id);
    } else {
      querySnapshot.forEach(async (docSnap) => {
        const userRef = doc(db, "users", docSnap.id);
        const userInfo = docSnap.data();

        // ✅ Update user referral reward
        await updateDoc(userRef, {
          reward: (userInfo.reward || 0) + amount,
        });
      });
    }

    // ✅ Update the user who completed the offer
    const userDocRef = doc(db, "users", user_id);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      await setDoc(userDocRef, { reward: 0, offers: [] }, { merge: true });
    }

    const userDoc = await getDoc(userDocRef);
    const userInfo = userDoc.data();

    if (userInfo) {
      await updateDoc(userDocRef, {
        reward: (userInfo.reward || 0) + amount,
        offers: [
          ...(userInfo.offers || []),
          {
            provider: "Epicwall",
            offerId: offer_id,
            offerName: offer_name,
            payout,
            date: timestamp,
            ip: conversion_ip,
            amount,
            secret,
          },
        ],
      });
    }

    return new Response(
      JSON.stringify({ message: "Offer added - Epicwall", user_id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Firestore error:", error);
    return new Response(JSON.stringify({ error: "Error adding offer - Epicwall" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
