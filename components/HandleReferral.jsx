"use client"; // Ensure this is a client-side component

import { useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Import from next/navigation
import { useUser } from "@clerk/nextjs"; // useUser is better than useClerk

export default function HandleReferral() { 
  const searchParams = useSearchParams(); // Get URL parameters
  const { user } = useUser(); // Get the current user

  useEffect(() => {
    if (!user) return; // Ensure the user is logged in before proceeding

    const referredByCode = searchParams.get("ref"); // Get the "ref" query param

    if (referredByCode) {
      user.update({
        public_metadata: { referredBy: referredByCode }, // Store in Clerk user metadata
      })
      .then(() => {
        console.log("Referral code stored in user metadata");
      })
      .catch(err => {
        console.error("Error updating metadata:", err);
      });
    }
  }, [searchParams, user]);

  return null; // No UI needed
}
