"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Close from '@/public/images/close.svg'

const ProviderCard = ({ provider }) => {

	const [blur, setBlur] = useState(false);
	const [hidden, setHidden] = useState(true);
	const [isOpen, setIsOpen] = useState(false);


  return (
    <div>
			<Link href="#"
							onClick={(e) => {
								e.preventDefault();
								setIsOpen(!isOpen);
							}} className='w-full py-7'>
							<div className='w-32 h-56 flex flex-col bg-gradient-to-b from-base-3 to-[#1f1f6e] rounded-lg' 
							onMouseEnter={()=>{setBlur(true); setHidden(false);}} onMouseLeave={()=>{setBlur(false); setHidden(true);}}>
								<div className='relative w-full h-full justify-center items-center flex flex-col'>
									<div className='z-0'> 
										<Image src={'/images/Bitlabs Offers.svg'} width={100} height={100}/>
									</div>
									<div className='mt-14 z-20'>
										<span className='align-bottom z-20 text-base font-medium px-1'>{provider.name}</span>
									</div>
									<div className={cn('absolute flex top-0 h-[80%] justify-center items-center z-30 transition-all ease-in duration-300', {
										"hidden": hidden
									})}>
										<div className='w-full items-center justify-center flex flex-col'>
											<div className='flex rounded-full w-9 h-9 bg-base-2 bg-opacity-30 justify-center items-center'>
												<Image loading='eager' src={'/images/svg-image-58.svg'} width={10} height={10}/>
											</div>
											<span className='text-sm'>View Offers</span>
										</div>
									</div>
									<div className={cn('transition-all duration-300 absolute w-full h-full rounded-lg z-10', {
										"backdrop-blur-md": blur
									})}></div>
								</div>
							</div>
			</Link>
						{isOpen && (
							<div className="bg-transparent flex shadow-none border-none absolute justify-center items-center top-10 left-0 w-full h-[90vh] border bg-white rounded-lg z-50">
								<div className='flex flex-col h-full'>
									<div className='relative flex justify-between items-center px-5 bg-base-3 w-full py-2 rounded-t-lg'>
										<span className='text-2xl font-bold'>{provider.iframeName}</span>
										<button
											className="p-2 bg-transparent text-white rounded-full border border-blue-200 border-opacity-85"
											onClick={() => setIsOpen(false)}
										>
											<Close className="text-blue-200 text-opacity-85 w-3 h-3"/>
										</button>
									</div>
									<div className='w-full h-full rounded-b-lg bg-base-3'>
										<iframe
										src={provider.iframeSrc}
										className="w-[600px] h-[98%]"
									></iframe>
									</div>
								</div>
								 
							</div>
						)}
    </div>
  )
}

export default ProviderCard