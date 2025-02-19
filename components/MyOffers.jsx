import React from 'react'
import Image from 'next/image'

const MyOffers = ({ src, Name }) => {
  return (
    <div className='flex w-24 flex-col gap-2 p-3 justify-center items-center text-center bg-base-3 bg-opacity-80 rounded-md'>
              <Image loading='eager' alt={Name} src={src} width={50} height={50}/>
              <span className='text-blue-200 text-opacity-85 text-sm'>{Name}</span>
    </div>
  )
}

export default MyOffers