"use client"
import React, { useState, useEffect } from 'react'
import MyOffers from '@/components/MyOffers'
import getDetails from '@/utils/actions/getDetails'
import { useAuth } from '@clerk/nextjs'

const page = () => {

  const { userId } = useAuth();
  const [offers, setOffers] = useState([]);
  
    useEffect(() => {
      const unsubscribe = getDetails(userId, (data) => {
        if (data) { 
          setOffers(data.offers);
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



  return (
    <div className='w-full pl-3 h-auto text-white mt-20 flex flex-col gap-5'>
      <span className='text-2xl font-bold'>My Offers</span>
      <div className='grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full py-2 max-md:mt-3 max-md:pl-3'>
          {offers &&
            offers.map((offer, index)=>{
              <MyOffers key={index} src={offer.img} Name={offer.name}/>
            })
          }
      </div>
    </div>
  )
}

export default page