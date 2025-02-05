import React from 'react'
import Logo from './Logo'
import Cashout from '../public/images/cashout.svg'
import Earn from '../public/images/earn.svg'
import LandingNavSignIn from './LandingNavSignIn'

const LandingNavBar = () => {
  return (
    <div className='fixed flex top-0 w-full h-16 z-10 bg-base-1 justify-center max-md:h-14 py-3'>
        <div className='flex justify-start gap-12 w-full items-center max-sm:w-20 pl-10 transition-all max-sm:pl-3'>
            <Logo/>
            <div className='h-12 w-px bg-gray-500 opacity-50 max-lg:hidden'></div>
            <a href='#' className='flex text-blue-100 font-bold max-lg:hidden opacity-55 gap-2'>
              <div>
                <Earn className="text-[#c4ddf6] w-6 h-6"/>
              </div>
              Earn</a>
            <a href='#' className='flex text-blue-100 font-bold max-lg:hidden opacity-55 gap-2'>
              <div>
              <Cashout className='text-[#c4ddf6] w-6 h-6'/>
              </div>
              Cashout</a>
        </div>
        <LandingNavSignIn/>
    </div>
  )
}

export default LandingNavBar;