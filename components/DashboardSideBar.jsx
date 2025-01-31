"use client"
import React, { useState } from 'react'
import EarnSvg from '../public/images/earn.svg'
import MyOffersSvg from '../public/images/myoffers.svg'
import CashoutSvg from '../public/images/cashout.svg'
import AffiliatesSvg from '../public/images/affiliates.svg'
import SideBarItem from './SideBarItem'

const DashboardSideBar = () => {

  const sidebarLinks = [
    { label: "Earn", route: "/earn", imgTag: EarnSvg },
    { label: "My Offers", route: "/my-offers", imgTag: MyOffersSvg },
    { label: "Cashout", route: "/cashout", imgTag: CashoutSvg },
    { label: "Affiliates", route: "/affiliates", imgTag: AffiliatesSvg }
]


  return (
    <div className='h-full bg-base-3 flex flex-col pt-20 px-2 text-blue-200 text-opacity-85'>
      {sidebarLinks.map((link, index)=>(
        <SideBarItem key={index} link={link} index={index}/>
      ))}
    </div>
  )
}

export default DashboardSideBar