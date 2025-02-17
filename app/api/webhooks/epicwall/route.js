import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore"; 
import { db } from "@/utils/firebase/clientApp"; 

export const dynamic = "force-dynamic";

export async function GET(req, res) {
  try {
    // ✅ Extract query parameters using `req.nextUrl.searchParams`

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

    const userDocRef = doc(db, "users", user_id);
    
    // ✅ Check if user document exists, otherwise create it
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
      await setDoc(userDocRef, { reward: 0, offers: [] }, { merge: true });
    }

    // ✅ Fetch user data
    const userDoc = await getDoc(userDocRef);
    const userInfo = userDoc.data();

    if (userInfo) {
      await updateDoc(userDocRef, {
        reward: (userInfo.reward || 0) + amount, // ✅ Increment reward
        offers: [
          ...(userInfo.offers || []), // ✅ Ensure `offers` is always an array
          {
            provider: "Epicwall",
            offerId: offer_id,
            offerName: offer_name,
            payout,
            date: timestamp,
            transactionId: txn_id,
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
