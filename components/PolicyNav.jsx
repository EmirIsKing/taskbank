'use client'
import React from 'react'
import { usePathname } from 'next/navigation';

const PolicyNav = () => {

const pathname = usePathname();



  return (
    <div className='px-6 text-white flex flex-col gap-5 mb-5 mt-20'>
        <h1 className='text-2xl font-bold'>Policies</h1>
        <div className='flex gap-3 justify-left text-blue-100 items-center'>
            <a href="/terms-of-service" className={` opacity-75 font-semibold bg-opacity-70 px-[16px] py-[9.5px] rounded-md hover:text-base-2
                ${pathname==='/terms-of-service'? 'bg-base-2 bg-opacity-30 text-base-2':'text-blue-100 bg-base-3'}`}>Terms of Services</a>
            <a href="/privacy-policy" className={` opacity-75 font-semibold bg-opacity-70 px-[16px] py-[9.5px] rounded-md hover:text-base-2
                ${pathname==='/privacy-policy'? 'bg-base-2 bg-opacity-30 text-base-2':'text-blue-100 bg-base-3'}`}>Privacy Policy</a>
            <a href="/cookie-policy" className={` opacity-75 font-semibold bg-opacity-70 px-[16px] py-[9.5px] rounded-md hover:text-base-2
                ${pathname==='/cookie-policy'? 'bg-base-2 bg-opacity-30 text-base-2':'text-blue-100 bg-base-3'}`}>Cookie Policy</a>
        </div>
    </div>
  )
}

export default PolicyNav