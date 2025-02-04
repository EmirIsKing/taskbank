'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import ProgressBar from '@/components/ProgressBar'
import UserSvg from "../public/images/users.svg"
import CloseSvg from '@/public/images/close.svg'

const PaymentCard = ({ img, className, name, nameAdd}) => {

const [openForm, setOpenForm] = useState(false);
const [value, setValue] = useState(0);
const handleScroll = (e) => {
	e.preventDefault(); // Prevents the page from scrolling
	setValue((prev) => Math.max(0, prev + (e.deltaY < 0 ? 1 : -1))); // Increase on scroll up, decrease on scroll down
};

const handleChange = (e) => {
	setValue(Number(e.target.value));
};

const handleSubmit = (e) => {
    e.preventDefault();
	const formData = new FormData(e.target);
	const data = [Object.fromEntries(formData.entries()), name];
	
	console.log("Submitted Data:", data);
	setOpenForm(false);
	setValue(0);
  };

const placeholder = name === "Mobile Money" 
? 'Mobile Money number'
: `${name} address`;

const text = name === "Mobile Money" 
  ? <>Mobile Money number <br /> </> 
  : `${name} address`;

  return (
    <>
		<button onClick={() => setOpenForm(true)} className='bg-base-1 w-[220px] h-[200px] max-md:w-[300px] rounded-lg flex flex-col gap-3 hover:ring-1 hover:ring-base-2 pt-1'>
          <h1 className='text-center font-bold w-full'>{name}</h1>
          <div className='px-3 flex flex-col gap-2 w-full'>
              <div className={`rounded-lg ${className} flex justify-center items-center h-[120px]`}>
                <Image src={img} width={40} height={40} alt={name}/>
              </div>
              <div>
                <ProgressBar value={2+3} max={3+5} className={'h-2 bg-base-3'} indicatorclassName={'bg-white'}/>
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
				<div onClick={()=>{setOpenForm(false); setValue(0)}} className='absolute z-50 top-0 w-full left-0 h-[100vh] flex justify-center items-center bg-black bg-opacity-20'>
					<form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} className='bg-base-1 max-md:rounded-md py-4 px-3 justify-start flex flex-col' name={name}>
						<div className='flex px-3 py-4 items-center gap-2 justify-between'>
							<div className='flex gap-2 items-center justify-center'>
								<div className={`rounded-lg ${className} flex justify-center items-center w-[50px] h-[50px] my-[5px]`}>
									<Image src={img} width={30} height={30} alt='mobile money' className='w-[60%] h-[60%] object-contain'/>
								</div>
								<span className='font-bold'>{name}</span>
							</div>
							<button onClick={() => {setOpenForm(false); setValue(0)}} type='reset' className='rounded-full p-2 border border-blue-200 border-opacity-85'>
								<CloseSvg className="text-blue-200 opacity-85 w-4 h-4"/>
							</button>
						</div>
						<div className='flex flex-col gap-6'>
							<div className='flex flex-col gap-1'>
								<span className='font-semibold'>{name} {nameAdd}</span>
								<input 
									type="text" 
									name="Address" 
									id="Address" 
									className='w-[629px] max-md:w-[300px] p-3 bg-base-3 rounded-lg placeholder-opacity-85' 
									placeholder={`Enter ${placeholder}...`}
									{...(name === "Mobile Money" ? { maxLength: 10 } : {})}
									required
								/>
								<p className='text-blue-200 text-opacity-85 text-xs break-words'>The {text} for your {name} Wallet.</p>
							</div>
							<div className='flex flex-col gap-1'>
								<span className='font-semibold'>Amount in USD</span>
								<input type="number" 
									onWheel={handleScroll} 
									onChange={handleChange} 
									name="Amount" 
									id="Amount" 
									className='w-[629px] p-3 max-md:w-[300px] bg-base-3 rounded-lg placeholder-opacity-85 appearance-none focus:outline-none' 
									min={0} 
									value={value}
									required
								/>
								<p className='text-blue-200 text-opacity-85 text-xs'>Minimum $3.00</p>
							</div>
							<button type='submit' className='w-[629px] rounded-lg p-2 max-md:w-[300px] bg-base-2'>
								Withdraw
							</button>
						</div>

					</form>
				</div>
			)}
    </>
  )
}

export default PaymentCard