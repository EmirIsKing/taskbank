'use client'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { getReferralDetails } from '@/utils/actions/referral'
import ReferralLink from '@/components/ReferralLink'
import Image from 'next/image'

const Page = () => {
  const { user } = useUser()
  const [referralDetails, setReferralDetails] = useState(null)

  useEffect(() => {
    if (!user) return

    const unsubscribe = getReferralDetails(user.id, (details) => {
      setReferralDetails(details)
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [user])

  if (!referralDetails) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-base-2"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Affiliate Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-base-1 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-base-2 bg-opacity-10 p-2 rounded-md">
              <Image 
                src="/images/users.svg" 
                alt="Referrals" 
                width={24} 
                height={24}
              />
            </div>
            <div>
              <p className="text-sm text-blue-200">Total Referrals</p>
              <p className="text-xl font-bold text-white">{referralDetails.referralCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-base-1 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-base-2 bg-opacity-10 p-2 rounded-md">
              <Image 
                src="/images/dollar.svg" 
                alt="Earnings" 
                width={24} 
                height={24}
              />
            </div>
            <div>
              <p className="text-sm text-blue-200">Total Earnings</p>
              <p className="text-xl font-bold text-white">${referralDetails.totalEarnings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-base-1 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-base-2 bg-opacity-10 p-2 rounded-md">
              <Image 
                src="/images/rate.svg" 
                alt="Rate" 
                width={24} 
                height={24}
              />
            </div>
            <div>
              <p className="text-sm text-blue-200">Reward Rate</p>
              <p className="text-xl font-bold text-white">$5 / referral</p>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Link Section */}
      <ReferralLink referralCode={referralDetails.referralCode} />

      {/* Referred Users Table */}
      <div className="bg-base-1 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-white border-opacity-10">
          <h2 className="text-lg font-bold text-white">Referred Users</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-base-2 bg-opacity-10">
              <tr>
                <th className="text-left p-4 text-blue-200">User ID</th>
                <th className="text-left p-4 text-blue-200">Date Joined</th>
                <th className="text-left p-4 text-blue-200">Status</th>
                <th className="text-left p-4 text-blue-200">Reward Status</th>
              </tr>
            </thead>
            <tbody>
              {referralDetails.referrals.length > 0 ? (
                referralDetails.referrals.map((referral) => (
                  <tr key={referral.id} className="border-t border-white border-opacity-5">
                    <td className="p-4 text-blue-200">{referral.referredId.slice(0, 8)}...</td>
                    <td className="p-4 text-blue-200">
                      {new Date(referral.timestamp.toDate()).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        referral.status === 'active' 
                          ? 'bg-green-500 bg-opacity-10 text-green-500' 
                          : 'bg-yellow-500 bg-opacity-10 text-yellow-500'
                      }`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        referral.rewardPaid 
                          ? 'bg-green-500 bg-opacity-10 text-green-500' 
                          : 'bg-yellow-500 bg-opacity-10 text-yellow-500'
                      }`}>
                        {referral.rewardPaid ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-blue-200">
                    No referrals yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Page
