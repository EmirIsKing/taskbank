"use client";
import React from "react";
import Logo from "./Logo";
import Cashout from "../public/images/cashout.svg";
import Earn from "../public/images/earn.svg";
import LandingNavSignIn from "./LandingNavSignIn";
import { useClerk, useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";

const LandingNavBar = ({ referredBy }) => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { openSignUp } = useClerk();
  const params = useParams(); // Get URL parameters safely

  // Handle referral tracking: prioritize ref from URL over props
  const referralCode = params?.ref || referredBy;

  // Function to handle sign-up with referral metadata
  const handleSignUp = () => {
    openSignUp({
      fallbackRedirectUrl: "/earn",
      unsafeMetadata: { referredBy: referralCode },
    });
  };

  return (
    <div className="fixed flex top-0 w-full h-16 z-10 bg-base-1 justify-center max-md:h-14 py-3">
      <div className="flex justify-start gap-12 w-full items-center max-sm:w-20 pl-10 transition-all max-sm:pl-3">
        <Logo />
        <div className="h-12 w-px bg-gray-500 opacity-50 max-lg:hidden"></div>

        {/* Render Different Buttons for Signed-in vs. Guest Users */}
        {!isSignedIn ? (
          <>
            {/* Earn Button for Guest */}
            <button
              onClick={handleSignUp}
              className="flex text-blue-100 font-bold max-lg:hidden opacity-55 gap-2"
            >
              <Earn className="text-[#c4ddf6] w-6 h-6" />
              Earn
            </button>

            {/* Cashout Button for Guest */}
            <button
              onClick={handleSignUp}
              className="flex text-blue-100 font-bold max-lg:hidden opacity-55 gap-2"
            >
              <Cashout className="text-[#c4ddf6] w-6 h-6" />
              Cashout
            </button>
          </>
        ) : (
          <>
            {/* Earn Button for Signed-in Users */}
            <button
              onClick={() => router.push("/earn")}
              className="flex text-blue-100 font-bold opacity-55 gap-2"
            >
              <Earn className="text-[#c4ddf6] w-6 h-6" />
              Earn
            </button>

            {/* Cashout Button for Signed-in Users */}
            <button
              onClick={() => router.push("/cashout")}
              className="flex text-blue-100 font-bold opacity-55 gap-2"
            >
              <Cashout className="text-[#c4ddf6] w-6 h-6" />
              Cashout
            </button>
          </>
        )}
      </div>

      {/* Sign-in Component (Only Show for Guests) */}
      {!isSignedIn && <LandingNavSignIn referredBy={referralCode} />}
    </div>
  );
};

export default LandingNavBar;
