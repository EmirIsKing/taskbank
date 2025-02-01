import React from 'react'
import PaymentCard from '@/components/PaymentCard'

export const metadata = {
  title: "Cashout - Taskbank.com",
  description: "Make money playing games and doing tasks - Make Money Online",
};

const cashoutProviders = [
  {img: "/images/mobilemoney.webp", className: "bg-[radial-gradient(70.71%_70.71%_at_50%_50%,#3E515E_0%,#202C34_100%)]", name: "Mobile Money"},
  {img: "/images/litecoin.webp", className: "bg-gradient-to-b from-[rgba(161,164,201,0.7)] to-[rgba(126,128,154,0.7)]", name: "Litecoin"},
  {img: "/images/ethereum.webp", className: "bg-gradient-to-b from-[rgb(121,126,191)] to-[rgb(96,111,189)]", name: "Ethereum"},
  {img: "/images/dogecoin.webp", className: "bg-gradient-to-b from-[rgb(255,213,141)] to-[rgb(222,163,61)]", name: "Dogecoin"},

]

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
      <div className='flex flex-col'>
        <a href='#' className='text-base-2'>Withdrawals →</a>
        <div className='flex justify-start items-center gap-5 overflow-auto p-2'>
        {cashoutProviders.map((provider, index)=>(
          <PaymentCard key={index} img={provider.img} className={provider.className} name={provider.name}/>
        ))}
        </div>
      </div>
    </div>
  )
}

export default page