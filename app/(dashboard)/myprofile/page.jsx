'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { db } from '@/utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useUser } from '@clerk/nextjs'
import ReferralLink from '@/components/ReferralLink'
import SettingSvg from '@/public/images/settings.svg'
import BagSvg from "@/public/images/earnings-mobile.svg"
import WithdrawSvg from "@/public/images/withdrawals-mobile.svg"
import SupportSvg from "@/public/images/support.svg"
import UserProfileButton from '@/components/UserProfileButton'
import ProfiileDP from '@/components/ProfiileDP'
import UserFirstName from '@/components/UserFirstName'
import { SignOutButton } from '@clerk/nextjs'

const page = () => {
  const { user } = useUser();
  const [referralStats, setReferralStats] = useState({
    referralCode: '',
    referralCount: 0,
    referralEarnings: 0
  });

  useEffect(() => {
    const fetchReferralStats = async () => {
      if (!user?.id) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.id));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setReferralStats({
            referralCode: data.referralCode || '',
            referralCount: data.referralCount || 0,
            referralEarnings: data.referralEarnings || 0
          });
        }
      } catch (error) {
        console.error('Error fetching referral stats:', error);
      }
    };

    fetchReferralStats();
  }, [user?.id]);

  return (
    <>
    {/* Desktop my profile page */}
      <div className='w-full pl-3 h-auto text-white mt-20 flex flex-col gap-3 max-md:hidden'>
      
      <div className='flex justify-between items-center px-3'>
        <span className='text-2xl font-bold'>My Profile</span>
        <div className='gap-4 flex px-3'>
          <UserProfileButton/>
        </div>
      </div>
      <div className='flex p-4 rounded-lg items-center gap-7'>
        <div className='flex gap-5 p-7 bg-base-1 rounded-lg justify-center items-center pr-10'>
          <ProfiileDP width={155} height={155}/>
          <UserFirstName/>
        </div>
        <div className='flex flex-col p-9 gap-10 rounded-lg bg-base-1'>
          <div className='flex gap-10'>
            <div className='flex justify-center items-center gap-3'>
              <div className='bg-base-2 w-[51px] h-[51px] rounded-lg bg-opacity-10 flex justify-center items-center'>
                <Image src={'/images/wallet.svg'} alt='wallet' width={30} height={30} className='w-[30px] h-[30px]'/>
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-white flex gap-1 text-xl'><span className='text-base-2 font-bold'>$</span>0.32</span>
                <h1 className='text-base text-blue-200 text-opacity-85'>Total Earnings</h1>
              </div>
            </div>
            <div className='flex justify-center items-center gap-3'>
              <div className='bg-base-2 w-[51px] h-[51px] rounded-lg bg-opacity-10 flex justify-center items-center'>
                <Image src={'/images/completed.svg'} alt='completed' width={30} height={30} className='w-[30px] h-[30px]'/>
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-white flex gap-1 text-xl'>4</span>
                <h1 className='text-base text-blue-200 text-opacity-85'>Completed Offers</h1>
              </div>
            </div>
          </div>
          <div className='flex gap-10'>
            <div className='flex justify-center items-center gap-3'>
                <div className='bg-base-2 w-[51px] h-[51px] rounded-lg bg-opacity-10 flex justify-center items-center'>
                  <Image src={'/images/reffered.svg'} alt='wallet' width={30} height={30} className='w-[30px] h-[30px]'/>
                </div>
                <div className='flex flex-col'>
                  <span className='font-bold text-white flex gap-1 text-xl'>0</span>
                  <h1 className='text-base text-blue-200 text-opacity-85'>Users referred</h1>
                </div>
              </div>
              <div className='flex justify-center items-center gap-3'>
                <div className='bg-base-2 w-[51px] h-[51px] rounded-lg bg-opacity-10 flex justify-center items-center'>
                  <Image src={'/images/total-earned.svg'} alt='wallet' width={30} height={30} className='w-[30px] h-[30px]'/>
                </div>
                <div className='flex flex-col'>
                  <span className='font-bold text-white flex gap-1 text-xl'><span className='text-base-2 font-bold'>$</span>0.02</span>
                  <h1 className='text-base text-blue-200 text-opacity-85'>Earnings last 30 days</h1>
                </div>
            </div>
          </div>

        </div>
      </div>

      {/* Referral Section */}
      <div className='flex flex-col gap-5'>
        <div className='flex'><span className='bg-base-2 bg-opacity-10 p-3 rounded-md text-base-2'>Referrals</span></div>
        <div className='flex flex-col gap-5'>
          <ReferralLink referralCode={referralStats.referralCode} />
          <div className='flex gap-6 p-4 bg-base-1 rounded-lg'>
            <div className='flex items-center gap-3'>
              <div className='bg-base-2 w-[51px] h-[51px] rounded-lg bg-opacity-10 flex justify-center items-center'>
                <Image src={'/images/reffered.svg'} alt='referrals' width={30} height={30} />
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-white text-xl'>{referralStats.referralCount}</span>
                <h1 className='text-base text-blue-200 text-opacity-85'>Total Referrals</h1>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='bg-base-2 w-[51px] h-[51px] rounded-lg bg-opacity-10 flex justify-center items-center'>
                <Image src={'/images/wallet.svg'} alt='earnings' width={30} height={30} />
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-white flex gap-1 text-xl'>
                  <span className='text-base-2 font-bold'>$</span>
                  {referralStats.referralEarnings.toFixed(2)}
                </span>
                <h1 className='text-base text-blue-200 text-opacity-85'>Referral Earnings</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-5' id='withdrawals'>
        <div className='flex '><span className='bg-base-2 bg-opacity-10 p-3 rounded-md text-base-2'>Withdrawals</span></div>
        <div className='flex justify-start items-center gap-2'>
          <Image src={'/images/information.svg'} alt='info' width={20} height={20}/>
          <span className='text-blue-200 text-opacity-80'>All your withdrawals, including pending ones, will be displayed here</span>
        </div>
        <table className='gap-2'>
          <thead className='border-b border-blue-200 border-opacity-30'>
            <tr>
              <th className='py-[11.25px] px-[22.5px] justify-start'><p className='text-center'>Type</p></th>
              <th className='py-[11.25px] px-[22.5px] justify-start'><p className='text-center'>Rewards</p></th>
              <th className='py-[11.25px] px-[22.5px] justify-start'><p className='text-center'>Number/address</p></th>
              <th className='py-[11.25px] px-[22.5px] justify-start'><p className='text-center'>Transaction ID</p></th>
              <th className='py-[11.25px] px-[22.5px] justify-start'><p className='text-center'>Date</p></th>
              <th className='py-[11.25px] px-[22.5px] justify-start'><p className='text-center'>Status</p></th>
            </tr>
          </thead>
          <tbody className='text-blue-200 text-opacity-85'>
            <tr>
              <td><p className='text-center overflow-hidden'>Litecoin</p></td>
              <td><p className='text-center overflow-hidden'>$ 3.00</p></td>
              <td><p className='text-center overflow-hidden'>hvfsbvhsfbvfhvbfhvfhuvbfhvbfvfbvfhvbdffvhsfvbfhv</p></td>
              <td><p className='text-center overflow-hidden'>45425245</p></td>
              <td><p className='text-center overflow-hidden'>02/02/2025</p></td>
              <td><p className='text-center overflow-hidden'>Completed</p></td>
            </tr>
          </tbody>

        </table>

      </div>
    </div>
    {/* Mobile my profile page */}
    <div className='hidden max-md:flex w-full h-auto text-white mt-20 flex-col gap-3'>
      <div className='flex justify-between items-center px-3'>
        <span className='text-2xl font-bold pl-2'>My Profile</span>
        <button className='text-base-2 font-semibold flex justify-center items-center gap-2'>
          <SettingSvg className="w-5 h-5"/>
        </button>
      </div>
      <div className='flex w-full items-center gap-7 border-b border-blue-200 border-opacity-55'>
        <div className='flex gap-5 py-5 px-3  rounded-lg justify-center items-center'>
          <ProfiileDP width={32} height={32}/>
          <div className='flex flex-col'>
          <UserFirstName/>
          <div className='flex gap-10'>
            <div className='flex justify-center items-center gap-3'>
              <div className='flex justify-center items-center'>
                <Image src={'/images/wallet.svg'} alt='wallet' width={30} height={30} className=''/>
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-white flex gap-1 text-xl'><span className='text-base-2 font-bold'>$</span>0.32</span>
                <h1 className='text-xs text-blue-200 text-opacity-85'>Total Earnings</h1>
              </div>
            </div>
            <div className='flex justify-center items-center gap-3'>             
              <div className='flex flex-col'>
                <span className='font-bold text-white flex gap-1 text-xl'>4</span>
                <h1 className='text-xs text-blue-200 text-opacity-85'>Completed Offers</h1>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div className='w-full mt-3 flex flex-col justify-center items-center px-2'> 
       <a className='flex justify-between items-center text-xl w-full border-blue-200 border-opacity-55 border-t py-5 font-bold'>
        <span className='flex gap-2 justify-center items-center'>
          <BagSvg className="text-white w-5 h-5"/>
          Earnings</span>
        <span className='text-2xl'>→</span>
       </a>
       <a href='/withdrawals' className='flex justify-between items-center text-xl w-full border-blue-200 border-opacity-55 border-t py-5 font-bold'>
        <span className='flex gap-2 justify-center items-center'>
          <WithdrawSvg className="text-white w-5 h-5"/> 
          Withdrawals</span>
        <span className='text-2xl'>→</span>
       </a>
       <a className='flex justify-between items-center text-xl w-full border-blue-200 border-opacity-55 border-t py-5 font-bold'>
        <span className='flex gap-2 justify-center items-center'>
          <SupportSvg className="text-white w-5 h-5"/>
          Support</span>
        <span className='text-2xl'>→</span>
       </a>
       <a className='flex justify-between items-center text-xl w-full border-blue-200 border-opacity-55 border-t py-5 font-bold'>
        <span className='flex gap-2 justify-center items-center'>
          <Image src={'/images/reffered.svg'} alt='referrals' width={20} height={20} className="text-white"/>
          Referrals ({referralStats.referralCount})
        </span>
        <span className='text-2xl'>→</span>
       </a>
      </div>
    </div>


    </>
  )
}

export default page
