"use client"; // Ensure this is a client-side component

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs"; // useUser is better than useClerk
import { useParams } from "next/navigation";

export default function HandleReferral() { 
  const { user } = useUser(); // Get the current user
  const referredby = localStorage.getItem("referredby");


  useEffect(() => {
    if (!user) return; // Ensure the user is logged in before proceeding

    console.log(ref)

    if (referredby) {
      user?.update({
        unsafeMetadata: { referredby }, // Store in Clerk user metadata
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
