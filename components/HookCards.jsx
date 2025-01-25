import React from 'react'
import Image from 'next/image'
import { Poppins, Rethink_Sans } from 'next/font/google'

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"]
  });


const HookCards = ({ img, title, desc, alt }) => {
  return (
    <div className={`bg-base-1 mt-4 rounded-lg py-7 px-6 flex flex-col items-center justify-center gap-5 ${poppins.className}`}>
        <Image src={img} height={90} width={90} alt={alt}/>
        <span className='font-extrabold text-xl'>{title}</span>
        <p className='text-center text-blue-200 opacity-85 text-sm'>
        {desc}
        </p>
    </div>
  )
}

export default HookCards