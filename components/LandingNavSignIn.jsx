'use client'
import React from 'react'
import { SignInButton, SignUpButton, useClerk } from "@clerk/nextjs";

const LandingNavSignIn = () => {

  const { openSignIn, openSignUp } = useClerk();


  return (
    <div className='w-full flex items-center justify-end gap-5 pr-10 max-md:gap-1 max-md:pr-3'>
      <button  onClick={() => openSignIn({ afterSignInUrl: "/earn" })} className='text-white font-bold transition-all px-8 max-md:px-6 max-md:text-xs py-3 hover:bg-opacity-30 bg-gray-300 bg-opacity-20 border-gray-500 border rounded-sm '>
            Sign In
    	</button>
      <button onClick={() => openSignUp({ afterSignUpUrl: "/earn" })} className="bg-base-2 transition-all font-bold px-8 max-md:px-6 max-md:text-xs py-3 hover:bg-green-500 rounded-sm">Sign Up</button>
    </div>
  )
}

export default LandingNavSignIn;