'use client'
import React, { useState } from 'react';
import Image from 'next/image';

const ReferralLink = ({ referralCode }) => {
  const [copied, setCopied] = useState(false);
  
  const referralUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://taskbank.online'}/${referralCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-base-1 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-white font-bold">Your Referral Link</span>
        <div className="bg-base-2 bg-opacity-10 p-2 rounded-md">
          <span className="text-base-2 text-sm">Referral Code: {referralCode}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={referralUrl}
          readOnly
          className="flex-1 bg-white bg-opacity-5 text-blue-200 p-3 rounded-md outline-none"
        />
        <button
          onClick={handleCopy}
          className="bg-base-2 bg-opacity-10 p-3 rounded-md hover:bg-opacity-20 transition-all duration-200 flex items-center gap-2"
        >
          <Image 
            src="/images/copy.svg" 
            alt="Copy" 
            width={20} 
            height={20}
          />
          <span className="text-base-2 font-semibold">
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>
      </div>
      
      <div className="flex items-center gap-2 text-blue-200 text-opacity-80 text-sm">
        <Image 
          src="/images/information.svg" 
          alt="info" 
          width={16} 
          height={16}
        />
        <span>Share this link with friends to earn rewards when they join</span>
      </div>
    </div>
  );
};

export default ReferralLink;