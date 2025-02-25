"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { db } from "@/utils/firebase/clientApp"; 
import { doc, getDoc } from 'firebase/firestore'
import { useUser, useAuth } from '@clerk/nextjs'
import ReferralLink from '@/components/ReferralLink'
import SettingSvg from '@/public/images/settings.svg'
import BagSvg from "@/public/images/earnings-mobile.svg"
import WithdrawSvg from "@/public/images/withdrawals-mobile.svg"
import SupportSvg from "@/public/images/support.svg"
import UserProfileButton from '@/components/UserProfileButton'
import ProfiileDP from '@/components/ProfiileDP'
import UserFirstName from '@/components/UserFirstName'
import getDetails from '@/utils/actions/getDetails';

const Page = () => {
  const { user, isLoaded } = useUser();
  const [referralStats, setReferralStats] = useState({
    referralCode: '',
    referralCount: 0,
    referralEarnings: 0
  });
  const { userId } = useAuth();
  const [data, setData] = useState(null);
  const [reward, setReward] = useState(0);
  const [offers, setOffers] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    const unsubscribe = getDetails(userId, (data) => {
      if (data) { 
        setData(data);
        setReward(data?.reward || 0);
        setOffers(data?.offers || []);
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


  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-base-2 flex justify-center items-center">
          <Image
            src={"/images/coin3.webp"}
            width={30}
            height={30}
            alt="coin"
            className="spin-clockwise"
          />
        </div>
      </div>
    );
  }


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
                <span className='font-bold text-white flex gap-1 text-xl'><span className='text-base-2 font-bold'>$</span>{(reward/1000 + data?.referralEarnings).toFixed(2)}</span>
                <h1 className='text-base text-blue-200 text-opacity-85'>Total Earnings</h1>
              </div>
            </div>
            <div className='flex justify-center items-center gap-3'>
              <div className='bg-base-2 w-[51px] h-[51px] rounded-lg bg-opacity-10 flex justify-center items-center'>
                <Image src={'/images/completed.svg'} alt='completed' width={30} height={30} className='w-[30px] h-[30px]'/>
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-white flex gap-1 text-xl'>{offers?.length ?? 0}</span>
                <h1 className='text-base text-blue-200 text-opacity-85'>Offer Count</h1>
              </div>
            </div>
          </div>
          <div className='flex gap-10'>
            <div className='flex justify-center items-center gap-3'>
                <div className='bg-base-2 w-[51px] h-[51px] rounded-lg bg-opacity-10 flex justify-center items-center'>
                  <Image src={'/images/reffered.svg'} alt='wallet' width={30} height={30} className='w-[30px] h-[30px]'/>
                </div>
                <div className='flex flex-col'>
                  <span className='font-bold text-white flex gap-1 text-xl'>{referralStats.referralCount}</span>
                  <h1 className='text-base text-blue-200 text-opacity-85'>Users referred</h1>
                </div>
              </div>
              <div className='flex justify-center items-center gap-3'>
                <div className='bg-base-2 w-[51px] h-[51px] rounded-lg bg-opacity-10 flex justify-center items-center'>
                  <Image src={'/images/wallet.svg'} alt='wallet' width={30} height={30} className='w-[30px] h-[30px]'/>
                </div>
                <div className='flex flex-col'>
                  <span className='font-bold text-white flex gap-1 text-xl'><span className='text-base-2 font-bold'>$</span>{(referralStats.referralEarnings || 0).toFixed(2)}</span>
                  <h1 className='text-base text-blue-200 text-opacity-85'>Referral Earnings</h1>
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
              <th className='py-[11.25px] px-[22.5px] justify-start'><p className='text-center'>Method</p></th>
              <th className='py-[11.25px] px-[22.5px] justify-start'><p className='text-center'>Rewards</p></th>
              <th className='py-[11.25px] px-[22.5px] justify-start'><p className='text-center'>Number/address</p></th>
              <th className='py-[11.25px] px-[22.5px] justify-start'><p className='text-center'>Transaction ID</p></th>
              <th className='py-[11.25px] px-[22.5px] justify-start'><p className='text-center'>Date</p></th>
              <th className='py-[11.25px] px-[22.5px] justify-start'><p className='text-center'>Status</p></th>
            </tr>
          </thead>
          <tbody className='text-blue-200 text-opacity-85'>
          {withdrawals.length > 0 ? (
            withdrawals.map((element, index) => (
              <tr key={index}>
                <td className="p-4 text-center text-blue-200">{element.method}</td>
                <td className="p-4 text-center text-blue-200">$ {Number(element.amount).toFixed(2)}</td>
                <td className="p-4 text-center text-blue-200">{element.address}</td>
                <td className="p-4 text-center text-blue-200">{element.transactionId}</td>
                <td className="p-4 text-center text-blue-200">
                  {new Date(element.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-center">
                  <div
                    className={`p-2 rounded-full font-bold ${
                      element.status === 'Pending'
                        ? 'text-yellow-500 bg-yellow-100 bg-opacity-40'
                        : element.status === 'Paid'
                        ? 'text-green-500 bg-green-100 bg-opacity-40'
                        : element.status === 'Cancelled'
                        ? 'text-red-400 bg-red-100 bg-opacity-40'
                        : 'text-gray-400 bg-gray-100 bg-opacity-40'
                    }`}
                  >
                    {element.status}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-blue-200">
                No referrals yet
              </td>
            </tr>
          )}

          </tbody>

        </table>

      </div>
    </div>
    {/* Mobile my profile page */}
    <div className='hidden max-md:flex w-full h-auto text-white mt-20 flex-col gap-3'>
      <div className='flex justify-between items-center px-3'>
        <span className='text-2xl font-bold pl-2'>My Profile</span>
        <button className='text-base-2 font-semibold flex justify-center items-center gap-2'>
        <UserProfileButton/>
        </button>
      </div>
      <div className='flex w-full items-center gap-7 border-b border-blue-200 border-opacity-55'>
        <div className='flex gap-5 py-5 px-3  rounded-lg justify-center items-center'>
          <ProfiileDP width={70} height={70}/>
          <div className='flex flex-col'>
          <UserFirstName/>
          <div className='flex gap-10'>
            <div className='flex justify-center items-center gap-3'>
              <div className='flex justify-center items-center'>
                <Image src={'/images/wallet.svg'} alt='wallet' width={30} height={30} className=''/>
              </div>
              <div className='flex flex-col'>
                <span className='font-bold text-white flex gap-1 text-xl'><span className='text-base-2 font-bold'>$</span>{(reward/1000 + data?.referralEarnings).toFixed(2)}</span>
                <h1 className='text-xs text-blue-200 text-opacity-85'>Total Earnings</h1>
              </div>
            </div>
            <div className='flex justify-center items-center gap-3'>             
              <div className='flex flex-col'>
                <span className='font-bold text-white flex gap-1 text-xl'>{offers?.length ?? 0}</span>
                <h1 className='text-xs text-blue-200 text-opacity-85'>Offer Count</h1>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div className='w-full mt-3 flex flex-col justify-center items-center px-2'> 

       <a href='/withdrawals' className='flex justify-between items-center text-xl w-full border-blue-200 border-opacity-55 border-t py-5 font-bold'>
        <span className='flex gap-2 justify-center items-center'>
          <WithdrawSvg className="text-white w-5 h-5"/> 
          Withdrawals</span>
        <span className='text-2xl'>→</span>
       </a>
       <a className='flex justify-between items-center text-xl w-full border-blue-200 border-opacity-55 border-t py-5 font-bold'>
        <span className='flex gap-2 justify-center items-center'>
        <Image src={'/images/reffered.svg'} alt='referrals' width={20} height={20} className="text-white"/>
          Referrals</span>
        <span className='text-2xl pr-4 text-base-2 text-opacity-90'>{referralStats?.referralCount || 0}</span>
       </a>
      </div>
    </div>


    </>
  )
}

export default Page;
