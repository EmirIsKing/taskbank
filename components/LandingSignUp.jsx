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


  if (!isLoaded) return <p className="text-xl font-bold text-white">Loading...</p>;

  const { signIn } = useSignIn();
  
const handleGoogleSignUp = async () => {
      // Accessing the useSignIn hook
    
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send email verification
      await signUp.prepareEmailAddressVerification();
      setPendingVerification(true);
    } catch (err) {
      setError(err.errors[0]?.message || "Something went wrong");
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        window.location.href = "/earn"; // Redirect after sign-up
      }
    } catch (err) {
      setError(err.errors[0]?.message || "Invalid verification code");
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 bg-base-1 rounded-xl items-center text-white text-center py-[24px] px-[32px] max-md:px-3">
      <p className="text-2xl font-bold">Sign up for free</p>

      {!pendingVerification ? (
        <form onSubmit={handleSignUp} className="flex flex-col w-full gap-3 justify-between">
          <div className="flex flex-col gap-1">
            <input
              onClick={() => setOpenPass(false)}
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="tracking-wide border-base-4 border placeholder:font-bold placeholder:text-blue-200 placeholder:opacity-75 w-full pl-12 outline-none focus:outline-none focus:ring-0 block h-12 rounded-lg bg-base-3/100"
              required
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                `transition-all duration-300 ease-in-out tracking-wide border-base-4 border 
                 placeholder:font-bold placeholder:text-blue-200 placeholder:opacity-75 
                 w-full pl-12 outline-none focus:outline-none focus:ring-0 
                 rounded-lg bg-base-3/100`,
                {
                  hidden: openPass,
                  "opacity-0 h-0": openPass,
                  "opacity-100 h-12": !openPass,
                }
              )}
              required
            />
          </div>
          <div className={cn("transition-all flex flex-col w-full justify-between py-2", { hidden: openPass })}>
            <label className="inline-flex items-center mb-3">
              <Checkbox id="terms" required name="terms" className="w-4 h-4 data-[state=checked]:bg-base-2 border-white data-[state=checked]:border-base-2" />
              <p className="ml-2 text-xs text-blue-200 text-opacity-85 font-medium">I agree to the Terms of Services and Privacy Policy</p>
            </label>
          </div>
          <button
            type="submit"
            className={`${poppins.className} hover:bg-green-500 active:opacity-70 transition-all mt-1 w-full h-12 rounded-lg bg-base-2 text-black font-bold`}
          >
            Start earning now
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyEmail} className="flex flex-col w-full gap-3 justify-between">
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="tracking-wide border-base-4 border placeholder:font-bold placeholder:text-blue-200 placeholder:opacity-75 w-full pl-12 outline-none focus:outline-none focus:ring-0 block h-12 rounded-lg bg-base-3/100"
            required
          />
          <button
            type="submit"
            className={`${poppins.className} hover:bg-green-500 active:opacity-70 transition-all mt-1 w-full h-12 rounded-lg bg-base-2 text-black font-bold`}
          >
            Verify Email
          </button>
        </form>
      )}

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
