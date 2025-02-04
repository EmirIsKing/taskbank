"use client"
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const MobileSideBarItem = ({ link }) => {

	const [color, setColor] = useState(false);


	const path = usePathname();

	useEffect(() => {
	
		if (path === link.route) {
			setColor(true);
		} else {
			setColor(false);
		}

	}, [path, link.route])


  return (
    <div className={cn("pb-2 font-medium transition-all hidden max-md:flex text-blue-200 text-opacity-80", {
			"text-base-2": color,						
		})}>
	<Link href={link.route} onClick={()=>setColor(true)} 
	className={cn('p-2 flex justify-center text-center items-center gap-3 rounded-md', {
		"text-base-2": color
	})}>
		<div className='hidden max-md:flex max-md:flex-col justify-center items-center'>
			{React.createElement(link.imgTag, { className: "w-5 h-5" })}
			<span className='text-xs'>{link.label}</span>
		</div>
	</Link>
</div>
  )
}

export default MobileSideBarItem