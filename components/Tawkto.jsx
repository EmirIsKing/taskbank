"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export default function TawkToChatDashboard() {
  const [isClient, setIsClient] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setIsClient(true); // Ensures the component renders only on the client

    if (window.Tawk_API) return; // Prevent duplicate script injections

    // Load Tawk.to script dynamically
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/67a918d3825083258e12901e/1ijm8hvht";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    script.id = "tawk-script"; // Unique ID to prevent removing other scripts
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Tawk_API) {
        window.Tawk_API.hide(); // Hide the widget initially
      }
    };

    return () => {
      const existingScript = document.getElementById("tawk-script");
      if (existingScript) {
        existingScript.remove(); // Removes only the Tawk.to script
      }
    };
  }, []);

  useEffect(() => {
    if (window.Tawk_API && user?.firstName && user?.emailAddresses?.[0]?.email) {
      window.Tawk_API.setAttributes(
        {
          name: user.firstName,
          email: user.emailAddresses[0].email,
        },
        function (error) {
          if (error) {
            console.error("Error setting Tawk.to attributes:", error);
          }
        }
      );
    }
  }, [user]); // Re-run when `user` changes

  // Toggle Chat Window
  const toggleChat = () => {
    if (window.Tawk_API && window.Tawk_API.toggle) {
      window.Tawk_API.toggle();
    } else {
      console.error("Tawk.to API not loaded yet");
    }
  };

  if (!isClient) return null; // Prevents SSR rendering

  return (
    <>
      {/* Open/Close Chat Button */}
      <button
        onClick={toggleChat}
        className="text-blue-200 opacity-85 flex justify-start items-center"
      >
        <Image src={'/images/help-circle.svg'} width={25} height={25} alt="help"/>
      </button>
    </>
  );
}
