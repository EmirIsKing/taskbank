"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const SideBarItem = ({ index, link }) => {

  const [rotate, setRotate] = useState(false);
	const [color, setColor] = useState(false);
	const [background, setBackground] = useState(false);

	const handleHover = () => {
		setRotate(true);
		setColor(true);
	}

	const handleHoverLeave = () => {
		setRotate(false);
		setColor(false);
	}

	const path = usePathname();

	useEffect(() => {
	
		if (path === link.route) {
			setBackground(true);
			setColor(true);
		} else {
			setBackground(false);
			setColor(false);
		}

	}, [path, link.route])
	

  return (
    <div className={cn("pb-5 font-medium transition-all rounded-md", {
							"text-base-2": color,
							"text-base-2": background,
							
						})}>
          <Link href={link.route} onClick={()=>setBackground(true)} onMouseOver={()=>handleHover()} onMouseLeave={()=>handleHoverLeave()} 
					className={cn('p-2 flex justify-center text-center items-center gap-3 rounded-md', {
						"bg-base-2": background,
						"bg-opacity-20": background,
						"text-base-2": rotate
					})}>
            <div>
            {React.createElement(link.imgTag, { className: cn("w-5 h-5 transition-transform duration-300", {
              "rotate-[360deg]": rotate,

            }) })}
            </div>
            <span className='w-[121px] text-left'>{link.label}</span>
          </Link>
    </div>
  )
}

export default SideBarItem;