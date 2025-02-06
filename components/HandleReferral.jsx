"use client"; // Ensure this is a client-side component

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useClerk } from "@clerk/nextjs";

export default function HandleReferral() { 
  const { query } = useRouter(); // Capture query params
  const { user } = useClerk(); // Access the logged-in Clerk user

  useEffect(() => {
    const referredByCode = query.ref; // Get the referral code from the URL

    if (referredByCode && user) {
      // Store the referredByCode in the user's metadata
      user.updateMetadata({
        referredBy: referredByCode, // Storing the referral code in the user's metadata
      }).then(() => {
        console.log("Referral code stored in user metadata");
      }).catch(err => {
        console.error("Error updating metadata:", err);
      });
    }
  }, [query, user]);

  // This component doesn't need to return anything, so it simply handles the logic.
  return null; // No HTML is returned
}
