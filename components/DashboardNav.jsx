import React from 'react'
import Logo from './Logo'
import Image from 'next/image'
import Bell from '../public/images/bell.svg'

const DashboardNav = () => {
  return (
    <div className='py-2 w-full bg-base-1 bg-opacity-80 fixed top-0 z-10 px-4'>
      <div className='flex justify-between items-center'>
        <div><Logo/></div>
        <div className='flex justify-between items-center gap-2'>
          <a href="" className='flex py-2 px-1 rounded-lg justify-center items-center'>
            <div className='bg-green-700 h-full flex justify-center items-center p-[7.5px] rounded-l-sm'>
              <Image alt='logo' width={25} height={25} src={'/images/coin1.webp'} className='bg-base-2 bg-gradient-to-b from-pink-500 to-base-2 bg-opacity-70 rounded-full'/>
            </div>
            <span className='text-white font-bold bg-green-400 bg-opacity-30 h-full justify-center text-center p-2 rounded-r-sm'>
              $0.32
            </span>
          </a>
          <a href="" className='flex py-2 px-1 rounded-lg justify-center items-center'>
            <div className='bg-green-700 h-full flex justify-center items-center p-[7.5px] rounded-l-sm'>
              <Image alt='logo' width={25} height={25} src={'/images/coin1.webp'} className='bg-base-2 bg-gradient-to-b from-pink-500 to-base-2 bg-opacity-70 rounded-full'/>
            </div>
            <span className='text-white font-bold bg-green-400 bg-opacity-30 h-full justify-center text-center p-2 rounded-r-sm'>
              Emir
            </span>
          </a>
          <div className='ml-2'>
            <button type='button'>
              <Bell className='text-base-2'/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardNav