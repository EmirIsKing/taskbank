import React from 'react'
import Logo from './Logo'
import Image from 'next/image'
import Cashout from '../public/images/cashout.svg'
import Earn from '../public/images/earn.svg'

const LandingNavBar = () => {
  return (
    <div className='fixed flex top-0 w-full h-16 z-10 bg-base-1 justify-center max-md:h-14 py-3'>
        <div className='flex justify-start gap-12 w-full items-center max-sm:w-20 pl-10 transition-all max-sm:pl-3'>
            <Logo/>
            <div className='h-12 w-px bg-gray-500 opacity-50 max-lg:hidden'></div>
            <a href='/earn' className='flex text-blue-100 font-bold max-lg:hidden opacity-55 gap-2'>
              <div>
                <Earn className="text-[#c4ddf6] w-6 h-6"/>
              </div>
              Earn</a>
            <a href='/cashout' className='flex text-blue-100 font-bold max-lg:hidden opacity-55 gap-2'>
              <div>
              <Cashout className='text-[#c4ddf6] w-6 h-6'/>
              </div>
              Cashout</a>
        </div>
        <div className='w-full flex items-center justify-end gap-5 pr-10 max-md:gap-1 max-md:pr-3'>
            <a href='/sign-in' className='text-white font-bold transition-all px-8 max-md:px-6 max-md:text-xs py-3 hover:bg-opacity-30 bg-gray-300 bg-opacity-20 border-gray-500 border rounded-sm '>
                Sign In
            </a>
            <a href='/sign-up' className="bg-base-2 transition-all font-bold px-8 max-md:px-6 max-md:text-xs py-3 hover:bg-green-500 rounded-sm">Sign Up</a>
        </div>
    </div>
  )
}

export default LandingNavBar