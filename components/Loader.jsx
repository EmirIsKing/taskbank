import React from 'react'
import Image from 'next/image'

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-base-2 flex justify-center items-center">
              <Image
                src={"/images/coin3.webp"}
                width={30}
                height={30}
                alt="coin"
                loading='eager'
                className="spin-clockwise"
              />
            </div>
          </div>
  )
}

export default Loader