"use client"
import React, { useState, useEffect } from 'react'
import ProviderCard from '@/components/ProviderCard'
import BitlabsSvg from '@/public/images/bitlabs.svg'
import { useUser, useAuth } from '@clerk/nextjs'
import Loader from '@/components/Loader'
import NotikLogo from '@/components/NotikLogo'
import EpicwallLogo from '@/components/Epicwall'
import getDetails from '@/utils/actions/getDetails'
import UpwallLogo from '@/components/Upwall'

const Page = () => {
  const [data, setData] = useState(null);
  const [referralCode, setReferralCode] = useState(true);
  

  const { userId } = useAuth();

  const { isLoaded } = useUser();

  useEffect(() => {
    const unsubscribe = getDetails(userId, (data) => {
      if (data) { 
        setData(data);
        setReferralCode(data.referralCode);
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

useEffect(() => {
  console.log("data:",data);
  console.log("referralCode:",referralCode);
  console.log("userId:",userId);
}, [userId, data, referralCode]);



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
      name: "Epicwall",
      image: EpicwallLogo,
      iframeName: "Epicwall",
      iframeSrc: `https://epicwall.net/wall/offers/884/743763/${referralCode}`
  
    },
    {
      name: "Upwall",
      image: UpwallLogo,
      iframeName: "Upwall",
      iframeSrc: `https://offerwall.upwall.net/?app_id=6233-0982-3969-4c17&userid=${userId}`
  
    }
  ]

  return (
    <div className='w-full h-[70vh] text-white mt-24 justify-center items-center text-center'>
      <span>
        <h1 className='font-medium text-xl text-blue-200 opacity-85'>Choose any of our providers to start a task. More coming soon.</h1>
      </span>
      <div className="flex flex-wrap gap-4 py-2 max-md:pl-8 max-md:mt-3">
        {providers && providers.map((provider, index) => (
          <ProviderCard key={index} img={provider.image} iframeName={provider.iframeName} iframeSrc={provider.iframeSrc} name={provider.name}/>
        ))}
      </div>

    </div>
  )
}

export default Page;