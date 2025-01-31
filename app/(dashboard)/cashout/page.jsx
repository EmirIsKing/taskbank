import React from 'react'
import PaymentCard from '@/components/PaymentCard'

const page = () => {
  return (
    <div className='w-full pl-3 h-auto text-white mt-24 flex flex-col gap-3'>
      <div>
        <h1 className='text-2xl font-extrabold text-left'>Cashout</h1>
        <p className='text-blue-200 opacity-75 text-lg font-medium'>Redeem your Taskbank earnings directly to Mobile Money,
          <br/>Litecoin and more! Withdraw to your crypto wallet
          <br/>starting at just $2.50 and 3 referrals, and to Mobile Money starting at
          <br/>$2.00 and 3 referrals!
        </p>
      </div>
      <div className='flex flex-col '>
        <a href='#' className='text-base-2'>Withdrawals →</a>
        <PaymentCard/>
      </div>
    </div>
  )
}

export default page