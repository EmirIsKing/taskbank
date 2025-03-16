'use client'
import React, { useState, useEffect } from 'react'
import BackSvg from '@/public/images/back.svg'
import getDetails from '@/utils/actions/getDetails'
import { useAuth } from '@clerk/nextjs'
import MobileWithdrawal from '@/components/MobileWithdrawal'

const Page = () => {

  const { userId } = useAuth();
  const [withdrawals, setWithdrawals] = useState([]);
  
  useEffect(() => {
    const unsubscribe = getDetails(userId, (data) => {
      if (data) { 
        setWithdrawals(data?.withdrawal || []);
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
    <div className='w-full flex flex-col pt-24'>
      <div className='flex text-white gap-2 pl-3 items-center'>
        <a href='/myprofile' className='p-3 flex justify-center gap-2 items-center border border-white rounded-full'>
          <BackSvg className="w-4 h-4"/>
        </a>
        <span className='text-xl font-bold'>Withdrawals</span>
      </div>
      <div className='flex flex-col justify-center items-center pt-6 text-white gap-3 px-3'>
          {withdrawals.length > 0 ? (
                withdrawals && withdrawals.map((element, index)=>(
                  <MobileWithdrawal key={index} amount={element.amount} method={element.method} status={element.status} txnId={element.transactionId}/>
                ))
              ) : (
                  <span colSpan="4" className="p-4 text-center text-blue-200">
                    No withdrawals yet
                  </span>
              )}

      </div>
    </div>
  )
}

export default Page