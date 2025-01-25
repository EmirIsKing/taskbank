import React from 'react'
import Image from 'next/image'
import localFont from "next/font/local";
import { Roboto, Rowdies, Rubik_Mono_One } from 'next/font/google'


// const RobotoItalic = Roboto({
//     subsets: ["latin"],
//     style: ['italic'],
//     weight: "900"
// })

const rowdies = Rowdies({
    subsets: ["latin"],
    weight: "700"
})

const Logo = () => {
  return (
    <a className='flex items-center justify-center gap-1' href='/'>
        <Image alt='logo' width={30} height={30} src={'/images/coin1.webp'} className='bg-base-2 bg-gradient-to-b from-pink-500 to-base-2 bg-opacity-70 rounded-full'/>
        <div className={`text-2xl italic font-extrabold text-base-2 tracking-widest max-sm:hidden`}>
            TASK<span className={`text-2xl text-white`}>BANK</span>
        </div>
    </a>
  )
}

export default Logo