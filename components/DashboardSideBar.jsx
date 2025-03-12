"use client"
import React, { useState } from 'react'
import EarnSvg from '../public/images/earn.svg'
import MyOffersSvg from '../public/images/myoffers.svg'
import CashoutSvg from '../public/images/cashout.svg'
import AffiliatesSvg from '../public/images/affiliates.svg'
import SideBarItem from './SideBarItem'
import Image from 'next/image'
import MobileSideBarItem from './MobileSideBarItem'

const DashboardSideBar = () => {

  const sidebarLinks = [
    { label: "Earn", route: "/earn", imgTag: EarnSvg },
    { label: "My Offers", route: "/my-offers", imgTag: MyOffersSvg },
    { label: "Cashout", route: "/cashout", imgTag: CashoutSvg },
    { label: "Affiliates", route: "/affiliates", imgTag: AffiliatesSvg }
]


  return (
    <>
      <div className='h-full bg-base-3 flex flex-col pt-20 px-2 text-blue-200 text-opacity-85 max-md:hidden'>
      {sidebarLinks.map((link, index)=>(
        <SideBarItem key={index} link={link} index={index}/>
        
      ))}
      <p>Telegram @taskbank009</p>
      </div>
      


      {/* Mobile side bar */}

      
      <div className='hidden max-md:flex fixed w-full bottom-0 left-0 justify-evenly bg-base-4 z-50'>
      {sidebarLinks.map((link, index)=>(
        <MobileSideBarItem key={index} link={link}/>
      ))}
      </div>
    </>
  )
}

export default DashboardSideBar