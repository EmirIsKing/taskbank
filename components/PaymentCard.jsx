'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import ProgressBar from '@/components/ProgressBar'
import UserSvg from "../public/images/users.svg"

const PaymentCard = ({ img, className, name, }) => {

const [openForm, setOpenForm] = useState(false);

  return (
    <>
			<button onClick={() => setOpenForm(true)} className='bg-base-1 w-[220px] h-[200px] rounded-lg flex flex-col gap-3 hover:ring-1 hover:ring-base-2 pt-1'>
          <h1 className='text-center font-bold w-full'>{name}</h1>
          <div className='px-3 flex flex-col gap-2 w-full'>
              <div className={`rounded-lg ${className} flex justify-center items-center h-[120px]`}>
                <Image src={img} width={40} height={40} alt='mobile money'/>
              </div>
              <div>
                <ProgressBar value={3} max={5} className={'h-2 bg-base-3'} indicatorclassName={'bg-white'}/>
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
			{openForm && (
				<div onClick={()=>setOpenForm(false)} className='absolute top-0 w-full left-0 h-[100vh] flex justify-center items-center bg-black bg-opacity-20'>
					<form action="submit" className='bg-base-1 py-4 px-3 justify-start flex flex-col'>
						<div className='flex px-3 py-4 justify-start items-center gap-2'>
							<div className={`rounded-lg ${className} flex justify-center items-center w-[50px] h-[50px] my-[5px]`}>
									<Image src={img} width={30} height={30} alt='mobile money' className='w-[60%] h-[60%] object-contain'/>
							</div>
							<span className='font-bold'>{name}</span>
						</div>
						<div className='flex flex-col gap-6'>
							<div className='flex flex-col gap-1'>
								<span className='font-semibold'>{name} Address</span>
								<input type="text" name={name} id={name} className='w-[629px] p-3 bg-base-3 rounded-lg placeholder-opacity-85' placeholder={`Enter ${name} address...`}/>
								<p className='text-blue-200 text-opacity-85 text-xs'>The Ethereum Address for your Ethereum Wallet.</p>
							</div>
							<div className='flex flex-col gap-1'>
								<span className='font-semibold'>Amount in USD</span>
								<input type="number" name={name} id={name} className='w-[629px] p-3 bg-base-3 rounded-lg placeholder-opacity-85' min={0} value={0}/>
								<p className='text-blue-200 text-opacity-85 text-xs'>Minimum $3.00</p>
							</div>
						</div>

					</form>
				</div>
			)}
    </>
  )
}

export default PaymentCard