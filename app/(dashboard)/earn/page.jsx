'use client'
import React, { useState } from 'react'
import ProviderCard from '@/components/ProviderCard'

const page = () => {


const providers = [
  {
    name: "Bitlabs Offers",
    image: "/images/Bitlabs Offers.svg",
    iframeName: "Bitlabs",
    iframeSrc: `https://web.bitlabs.ai/?uid=12345&token=2b557582-2d62-4083-975c-efa2cd7c3af1`

  }
]

  return (
    <div className='w-full h-[80vh] text-white mt-24 justify-center items-center text-center'>
      <span>
        <h1 className='font-medium text-xl text-blue-200 opacity-85'>Click on any of our providers to start a task</h1>
      </span>
      <div className='flex w-full py-2'>
        {providers.map((provider, index)=>
          (<ProviderCard key={index} provider={provider}/>)
        )}
      </div>
    </div>
  )
}

export default page;