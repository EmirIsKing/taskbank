"use client";

import React, { useState } from "react";
import { Poppins } from "next/font/google";
import { Checkbox } from "../components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useSignUp, useSignIn } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
  

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const LandingSignUp = () => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openPass, setOpenPass] = useState(true);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const { signIn } = useSignIn();
  const { openSignIn, openSignUp } = useClerk();


if (!isLoaded) return <p className="text-xl font-bold text-white justify-center items-center w-full text-center">Loading...</p>;

const handleGoogleSignUp = async () => {
    try {
      // Start the Google OAuth flow with redirect
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",  // Google OAuth strategy
        redirectUrl: "/earn",      // Redirect after successful authentication
      });
    } catch (error) {
      console.error("Error during Google sign-up:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 bg-base-1 rounded-xl items-center text-white text-center py-[24px] px-[32px] max-md:px-3">
      <p className="text-2xl font-bold">Sign up for free</p>
        <form className="flex flex-col w-full gap-3 justify-between">
          <button
            onClick={() => openSignUp({ afterSignUpUrl: "/earn" })}
            type="button"
            className={`${poppins.className} hover:bg-green-500 active:opacity-70 transition-all mt-1 w-full h-12 rounded-lg bg-base-2 text-black font-bold`}
          >
            Start earning now
          </button>
        </form>
      <div className="w-full flex justify-center gap-3 items-center text-slate-400">
        <div className="w-full h-[1px] bg-gradient-to-l from-slate-300 to-base-4"></div>
        OR
        <div className="w-full h-[1px] bg-gradient-to-l to-slate-300 from-base-4"></div>
      </div>

      <div className="w-full">
        <button onClick={handleGoogleSignUp} className={`${poppins.className} mt-1 w-full h-12 rounded-lg bg-white hover:bg-slate-200 hover:opacity-85 active:opacity-70 text-black font-semibold`}>
          Sign Up with Google
        </button>
      </div>

      <div className="w-full flex gap-2 justify-center items-center">
        <span className="font-semibold">42975+</span>
        <span className="text-gray-300 font-semibold text-opacity-85">sign ups in the past 24 hours</span>
      </div>
    </div>
  );
};

export default LandingSignUp;
