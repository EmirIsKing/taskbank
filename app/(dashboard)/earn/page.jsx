"use client"
import React from 'react'
import ProviderCard from '@/components/ProviderCard'
import BitlabsSvg from '@/public/images/bitlabs.svg'
import { useUser, useAuth } from '@clerk/nextjs'
import Loader from '@/components/Loader'
import NotikLogo from '@/components/NotikLogo'
import UpwallLogo from '@/components/UpwallLogo'

const Page = () => {

  const { userId } = useAuth();

  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <Loader/>
    )
  }

  const providers = [
    {
      name: "Notik",
      image: NotikLogo,
      iframeName: "Notik",
      iframeSrc: `https://notik.me/coins?api_key=3aDTefZTCqzvZso73pLsfrlxbg5Rx8I8&pub_id=bz3rUe&app_id=wtrRrdzVLs&user_id=${userId}`
  
    },
    {
      name: "Upwall",
      image: UpwallLogo,
      iframeName: "Upwall",
      iframeSrc: `https://epicwall.net/wall/offers/884/743763/${userId}`
  
    }
  ]

  return (
    <div className='w-full h-[70vh] text-white mt-24 justify-center items-center text-center'>
      <span>
        <h1 className='font-medium text-xl text-blue-200 opacity-85'>Choose any of our providers to start a task</h1>
      </span>
      <div className="grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:flex gap-4 py-2 max-md:mt-3 max-md:pl-3">
        {providers && providers.map((provider, index) => (
          <ProviderCard key={index} img={provider.image} iframeName={provider.iframeName} iframeSrc={provider.iframeSrc} name={provider.name}/>
        ))}
      </div>

    </div>
  )
}

export default Page;