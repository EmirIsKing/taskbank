"use client"; // Ensure this is a client-side component

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs"; // useUser is better than useClerk

export default function HandleReferral({ ref }) { 
  const { user } = useUser(); // Get the current user

  useEffect(() => {
    if (!user) return; // Ensure the user is logged in before proceeding

    console.log(ref)

    if (ref) {
      user.update({
        publicMetadata: { ref }, // Store in Clerk user metadata
      })
      .then(() => {
        console.log("Referral code stored in user metadata");
      })
      .catch(err => {
        console.error("Error updating metadata:", err);
      });
    }
  }, []);

  return null; // No UI needed
}
