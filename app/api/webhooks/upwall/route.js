import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore"; 
import { db } from "@/utils/firebase/clientApp"; 

export const dynamic = "force-dynamic";

export async function GET(req, res) {
  try {
    // ✅ Extract query parameters using `req.nextUrl.searchParams`

    
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("userid");
    const offer_id = searchParams.get("offer_id");
    const offer_name = searchParams.get("offer_name");
    const payout = parseFloat(searchParams.get("payout")) || 0;
    const timestamp = searchParams.get("date");
    const txn_id = searchParams.get("transactionID");
    const conversion_ip = searchParams.get("ip_address");
    const amount = parseFloat(searchParams.get("user_amount")) || 0;

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
            provider: "Upwall",
            offerId: offer_id,
            offerName: offer_name,
            payout,
            date: timestamp,
            transactionId: txn_id,
            ip: conversion_ip,
            amount,
          },
        ],
      });
    }

    return new Response(
      JSON.stringify({ message: "Offer added - Upwall", user_id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Firestore error:", error);
    return new Response(JSON.stringify({ error: "Error adding offer - Upwall" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

