'use client'
import React, { useState, useEffect } from 'react'
import { UserProfile } from '@clerk/nextjs'
import SettingSvg from '@/public/images/settings.svg';
import { usePathname, useRouter } from 'next/navigation';

const UserProfileButton = () => {
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // UseEffect for pathname-based logic for profile visibility
  useEffect(() => {
    const { hash } = window.location; // Access the hash part of the URL (e.g., #settings=n)

    if (hash === '#settings=n') {
      setShowProfile(false); // Close the profile if hash = '#settings=n'
    } else if (pathname === "/myprofile" || pathname === "/myprofile/security") {
      setShowProfile(true); // Open profile when on profile or security tab
    }
  }, [pathname]); // Re-run the effect if pathname changes

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  const closeProfile = () => {
    setShowProfile(false);
    // Update the URL with hash-based routing to close the profile
    router.push('/myprofile#settings=n', undefined, { shallow: true });
  };

  return (
    <>
      <button
        onClick={toggleProfile}
        className="text-base-2 font-semibold flex justify-center items-center gap-2"
      >
        <SettingSvg className="w-5 h-5" />
        Settings
      </button>

      {showProfile && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-700 bg-opacity-50 pt-7">
          <div className="bg-white p-6 rounded-lg shadow-xl w-auto max-h-[80vh] overflow-y-scroll">
            {/* Close button */}
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={closeProfile}
                className="text-gray-500 hover:text-gray-700 text-3xl"
              >
                &times; {/* Close button */}
              </button>
            </div>

            {/* UserProfile Content */}
            <div className="mt-4">
              <UserProfile routing="hash" /> {/* Use hash-based routing */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileButton;
