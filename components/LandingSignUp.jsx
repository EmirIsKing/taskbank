'use client'
import React from 'react'
import { Poppins } from 'next/font/google'
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"]
  });




const LandingSignUp = () => {

    const [openPass, setOpenPass] = useState(true);

    const openPassHandler = () => {
        setOpenPass(false);
    }


  return (
    <div className='w-full flex flex-col gap-5 bg-base-1 rounded-xl items-center text-white text-center py-[24px] px-[32px]'>
        <p className='text-2xl font-bold'>Sign up for free</p>
        <form action="submit" className='flex flex-col w-full gap-3 justify-between'>
            <div className='flex flex-col gap-1'>
                <input
                onClick={()=>openPassHandler()} 
                type="text" 
                placeholder='Email Address' 
                className={`tracking-wide border-base-4 border placeholder:font-bold placeholder:text-blue-200 placeholder:opacity-75 w-full pl-12 outline-none focus:outline-none focus:ring-0 outline-transparent block h-12 rounded-lg bg-base-3/100`}/>
                <input 
                type="password" 
                placeholder='Enter password' 
                className={cn(`transition-all duration-300 ease-in-out tracking-wide border-base-4 border 
            placeholder:font-bold placeholder:text-blue-200 placeholder:opacity-75 
            w-full pl-12 outline-none focus:outline-none focus:ring-0 
            rounded-lg bg-base-3/100`,
                    {
                        'hidden': openPass,
                        'opacity-0 h-0': openPass,
                        'opacity-100 h-12': !openPass,
                    }
                )}/>
            </div>
            <div className={cn('transition-all flex flex-col w-full justify-between py-2',
                {
                    'hidden': openPass,
                    'opacity-0 h-0': openPass,
                    'opacity-100': !openPass,
                }
            )}>
                <label className="inline-flex items-center mb-3">
                    <Checkbox className="w-4 h-4 data-[state=checked]:bg-base-2 border-white data-[state=checked]:border-base-2" />
                    <p className="ml-2 text-xs text-blue-200 text-opacity-85 font-medium">I agree to the Terms of Services and Privacy Policy</p>
                </label>
                <p className='text-xs text-left leading-4 text-blue-200 text-opacity-85 font-medium'>Further information on the processing of your personal data can be found in the Privacy Policy.</p>
            </div>
            <button className={`${poppins.className} mt-1 w-full flrx h-12 rounded-lg bg-base-2 text-black font-bold`}>Start earning now</button>
        </form> 
        <div className='w-full flex justify-center gap-3 items-center text-slate-400'>
            <div className='w-full h-[1px] bg-gradient-to-l from-slate-300 to-base-4'></div>
            OR
            <div className='w-full h-[1px] bg-gradient-to-l to-slate-300 from-base-4'></div>
        </div>
        <div className='w-full'>
            <button className={`${poppins.className} mt-1 w-full h-12 rounded-lg bg-white text-black font-semibold`}>
                Sign Up with Google
            </button>
        </div>
        <div className='w-full flex gap-2 justify-center items-center'>
            <span className='font-semibold'>42975+</span>
            <span className='text-gray-300 font-semibold text-opacity-85'>sign ups in the past 24 hours</span>
        </div>
    </div>
  )
}

export default LandingSignUp