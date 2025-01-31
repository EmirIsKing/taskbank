import React from 'react'
import Image from 'next/image'
import ProgressBar from '@/components/ProgressBar'
import UserSvg from "../public/images/users.svg"

const PaymentCard = ({ img, className, name, }) => {
  return (
    <button className='bg-base-1 w-[220px] h-[200px] rounded-lg flex flex-col gap-3'>
          <h1 className='text-center font-bold w-full'>Mobile Money</h1>
          <div className='px-3 flex flex-col gap-2 w-full'>
              <div className='rounded-lg bg-[radial-gradient(70.71%_70.71%_at_50%_50%,#3E515E_0%,#202C34_100%)] flex justify-center items-center h-[120px]'>
                <Image src={'/images/mobilemoney.webp'} width={40} height={40} alt='mobile money'/>
              </div>
              <div>
                <ProgressBar value={3} max={5} className={'h-2 bg-base-3'} IndicatorclassName={'bg-white'}/>
              </div>
              <div className='text-xs text-blue-200 opacity-80 w-full flex justify-between'>
                <span>$2.00/$3.00</span>
                <span className='flex gap-1 justify-center items-center'>
                  <UserSvg className="text-blue-200 text-opacity-80 w-3 h-3 font-bold"/>
                  <span>3/5</span>
                </span>
              </div>
          </div>
        </button>
  )
}

export default PaymentCard