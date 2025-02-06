'use client'
import React from 'react'
import { useClerk } from '@clerk/nextjs'



const ProfiileDP = ({ width, height }) => {

  const { user } = useClerk();
  const profileImageUrl = user?.imageUrl || '/images/coin3.webp';


  return (
    <img
      src={profileImageUrl} // Use the fallback URL here
      alt="Profile Image"
      style={{ width: width, height: height, borderRadius: '50%' }}
      />
  )
}

export default ProfiileDP;