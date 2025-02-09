'use client'
import React, { useState, useEffect } from 'react'
import { SignedIn, UserButton } from '@clerk/nextjs';
import { useClerk } from '@clerk/nextjs';
import { SignOutButton } from '@clerk/nextjs';

const UserProfileButton = () => {
 
  const { openUserProfile } = useClerk();

  return (
    <div className='flex gap-3 justify-center items-center'>
      <div className='bg-white bg-opacity-20 p-2 font-bold rounded-md text-base-2 hover:bg-opacity-15 hover:text-opacity-85'>
        <SignOutButton redirectUrl='/'/>
      </div>
        <SignedIn>
        <button
          className="text-base-2 font-semibold flex justify-center items-center gap-2"
          onClick={openUserProfile} // Click anywhere to open profile
        >
          <UserButton />
          Settings
        </button>
      </SignedIn>
    </div>
  );
};

export default UserProfileButton;
