"use client";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { useUser } from "@clerk/nextjs";
import { useRef, useEffect } from "react";
import Image from "next/image";

export default function TawkToChatDashboard({ data }) {
  const tawkMessengerRef = useRef();
  const { user } = useUser();

  const onTawkLoad = () => {
    const firstName = user?.firstName;
    const email = user?.emailAddresses?.[0]?.email;
    console.log("✅ Tawk.to widget loaded");

    if (window.Tawk_API) {
      console.log("Tawk_API is available");

      if (firstName && email) {
        console.log("Setting user details in Tawk.to");

        window.Tawk_API.setAttributes(
          {
            name: firstName,
            email: email,
          },
          function (error) {
            if (error) {
              console.error("❌ Error setting Tawk.to user details:", error);
            } else {
              console.log("✅ User details set successfully");
            }
          }
        );
      } else {
        console.error("❌ User data is missing, cannot set attributes.");
        console.log("firstName:", firstName);
        console.log("email:", email);
        console.log("user:", user);
        console.log("data:", data);
      }
    } else {
      console.error("❌ Tawk_API is not available");
    }
  };

  // 🔹 Ensure the chat toggles properly
  const toggleChat = () => {
    if (window.Tawk_API && window.Tawk_API.toggle) {
      console.log("🔄 Toggling Tawk.to chat");
      window.Tawk_API.toggle();
    } else {
      console.error("❌ Tawk.to API not loaded yet");
    }
  };

  return (
    <>
      {/* Open/Close Chat Button */}
      <button
        onClick={toggleChat}
        className="text-blue-200 opacity-85 flex justify-start items-center"
      >
        <Image src={"/images/help-circle.svg"} width={25} height={25} alt="help" />
      </button>

      {/* Tawk.to Chat Widget */}
      <TawkMessengerReact
        propertyId="67a918d3825083258e12901e"
        widgetId="1ijm8hvht"
        ref={tawkMessengerRef}
        onLoad={onTawkLoad}
      />
    </>
  );
}
