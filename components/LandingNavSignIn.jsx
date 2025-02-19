"use client";
import React, { useState, useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LandingNavSignIn = ({ referredBy }) => {
  const { openSignIn, openSignUp } = useClerk();
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setHidden(pathname.includes("/ref/"));
  }, [pathname]);

  return (
    <div className="w-full flex items-center justify-end gap-5 pr-10 max-md:gap-1 max-md:pr-3">
      {/* Sign In Button */}
      {!hidden && (
        <button
          onClick={() => openSignIn({ fallbackRedirectUrl: "/earn" })}
          className={cn(
            "text-white font-bold transition-all px-8 max-md:px-6 max-md:text-xs py-3 hover:bg-opacity-30 bg-gray-300 bg-opacity-20 border-gray-500 border rounded-sm"
          )}
        >
          Sign In
        </button>
      )}

      {/* Sign Up Button */}
      <button
        onClick={() =>
          openSignUp({
            fallbackRedirectUrl: "/earn",
            ...(referredBy && { unsafeMetadata: { referredBy } }),
          })
        }
        className="bg-base-2 transition-all font-bold px-8 max-md:px-6 max-md:text-xs py-3 hover:bg-green-500 rounded-sm"
      >
        Sign Up
      </button>
    </div>
  );
};

export default LandingNavSignIn;
