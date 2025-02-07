"use client";
import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import Image from "next/image";
import Bell from "../public/images/bell.svg";
import { useUser } from "@clerk/nextjs";
import getDetails from "@/utils/actions/getDetails";
import { useAuth } from "@clerk/nextjs";

const DashboardNav = () => {
  const { user, isLoaded } = useUser();
  const { userId } = useAuth()
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsubscribe = getDetails(userId, (data) => {
      if (data) { 
        setData(data);
        setReward(data.reward);
      } else {
        console.log("No data or error occurred");
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [ userId ]); 
  

  // Fallback profile image if user.imageUrl is not available
  const profileImageUrl = user?.imageUrl || "/images/coin1.webp";

  return (
    <div className="py-2 w-full fixed top-0 z-10 bg-base-1 bg-opacity-80 px-4 md:px-2">
      <div className="flex items-center justify-between max-md:justify-evenly px-4 max-md:px-1">
        {/* Logo - Hidden on Mobile */}
        <div className="hidden md:block">
          <Logo />
        </div>

        {/* User Info + Balance */}
        <div className="flex items-center gap-2 max-md:w-full max-md:justify-between max-md:gap-3">
          {/* Balance & User Section */}
          <div className="flex items-center max-md:flex-row-reverse max-md:justify-between max-md:w-[65%]">
            {/* Balance */}
            <a href="#" className="flex items-center rounded-lg p-1">
              <div className="bg-green-700 bg-opacity-85 flex items-center justify-center p-2 rounded-l-sm">
                <Image
                  alt="logo"
                  width={25}
                  height={25}
                  src="/images/coin1.webp"
                  className="rounded-full bg-gradient-to-b from-pink-500 to-base-2 bg-opacity-70"
                />
              </div>
              <span className="text-white flex font-bold bg-green-400 bg-opacity-20 p-2 rounded-r-sm max-md:hidden">
                $ {((data?.reward/1000) + data?.referralEarnings).toFixed(2)}
              </span>
            </a>

            {/* User Name */}
            <a
              href="/myprofile"
              className="flex items-center bg-white bg-opacity-15 p-1 rounded-md max-md:rounded-full py-2 max-md:border max-md:px-3"
            >
              <div className="text-white max-md:bg-transparent px-1 flex items-center justify-center rounded-full">
                <img
                  src={profileImageUrl} // Use the fallback URL here
                  alt="Profile Image"
                  style={{ width: 25, height: 25, borderRadius: "50%" }}
                />
              </div>
              <span className="text-white font-bold bg-opacity-30 px-1 rounded-r-sm max-md:hidden">
                {user?.firstName || "User"} {/* Display user's first name or fallback text */}
              </span>
            </a>
          </div>

          {/* Notification Bell */}
          <button type="button" className="ml-2">
            <Bell className="text-base-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
