import React from 'react'
import Logo from './Logo'
import Image from 'next/image'

const LandingNavBar = () => {
  return (
    <div className='fixed flex top-0 w-full h-16 z-10 bg-base-1 justify-center max-md:h-14 py-3'>
        <div className='flex justify-start gap-12 w-full items-center max-sm:w-20 pl-10 transition-all max-sm:pl-3'>
            <Logo/>
            <div className='h-12 w-px bg-gray-500 opacity-50 max-lg:hidden'></div>
            <span className='flex text-blue-100 font-bold max-lg:hidden opacity-55 gap-2'>
              <Image src={'/images/earn.svg'} height={25} width={25} alt='earn' className=''/>
              Earn</span>
            <span className='flex text-blue-100 font-bold max-lg:hidden opacity-55 gap-2'>
              <Image src={'/images/cashout.svg'} height={25} width={25} alt='cashout' className=''/>
              Cashout</span>
        </div>
        <div className='w-full flex items-center justify-end gap-5 pr-10 max-md:gap-1 max-md:pr-3'>
            <button className='text-white font-bold transition px-8 max-md:px-6 max-md:text-xs py-3 hover:bg-opacity-30 bg-gray-300 bg-opacity-20 border-gray-500 border rounded-sm '>
                Sign In
            </button>
            <button className="bg-base-2 transition font-bold px-8 max-md:px-6 max-md:text-xs py-3 hover:bg-green-600 rounded-sm">Sign Up</button>
        </div>
    </div>
  )
}

export default LandingNavBar