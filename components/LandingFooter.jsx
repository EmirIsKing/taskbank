import React from 'react'
import Logo from './Logo'

const LandingFooter = () => {
  return (
    <footer className='w-full bg-base-1 py-14 mt-12'>
        <div className='w-full px-20 flex gap-28 text-blue-200 items-center justify-center opacity-85'>
          <div className='flex flex-col text-blue-200 opacity-85'>
            <Logo/>
            <p className='text-sm'>© 2020 - 2024 Freecash. All rights reserved.</p>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-bold text-xl text-slate-200'>About</p>
            <div className='flex flex-col gap-1'>
              <a href="/terms-of-service">Terms of Service</a>
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/cookie-policy">Cookie Policy</a>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
          <p className='font-bold text-xl text-slate-200'>Support</p>
            <div className='flex flex-col gap-1'>
              <a href="/how-it-works">How does TaskBank work?</a>
              <a href="/support">Support</a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default LandingFooter