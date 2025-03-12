"use client";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { useUser } from "@clerk/nextjs";
import { useRef, useEffect } from "react";
import Image from "next/image";

export default function TawkToChatDashboard({ data }) {
  const tawkMessengerRef = useRef();
  const { user } = useUser();

  const setUserAttributes = () => {
    if (!window.Tawk_API) {
      console.error("❌ Tawk_API is not available yet.");
      return;
    }

    const firstName = data?.firstName;
    const email = data?.email;

    if (firstName && email) {

      // Use setAttributes if available
      if (typeof window.Tawk_API.setAttributes === "function") {
        window.Tawk_API.setAttributes(
          { name: firstName, email },
          (error) => {
            if (error) {
              console.error("❌ Error setting Tawk.to user details:", error);
            } else {
              console.log("✅ User details set successfully");
            }
          }
        );
      } else {
        console.warn("⚠️ setAttributes not found. Using visitor object.");
      }
    } else {
      console.error("❌ User data is missing.");
    }
  };

  useEffect(() => {
    if (user) {
      const checkTawkReady = setInterval(() => {
        if (window.Tawk_API) {
          clearInterval(checkTawkReady);
          setUserAttributes();
        }
      }, 500);
    }
  }, [data]); // Runs when `data` changes

  const toggleChat = () => {
    if (window.Tawk_API && typeof window.Tawk_API.toggle === "function") {
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
      />
    </>
  );
}
