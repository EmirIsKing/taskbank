import React from 'react'
import PaymentCard from '@/components/PaymentCard'

export const metadata = {
  title: "Cashout - Taskbank.com",
  description: "Make money playing games and doing tasks - Make Money Online",
};

const cashoutProviders = [
  {img: "/images/mobilemoney.webp", className: "bg-[radial-gradient(70.71%_70.71%_at_50%_50%,#3E515E_0%,#202C34_100%)]", name: "Mobile Money", nameAdd: " Number"},
  {img: "/images/litecoin.webp", className: "bg-gradient-to-b from-[rgba(161,164,201,0.7)] to-[rgba(126,128,154,0.7)]", name: "Litecoin", nameAdd: " Address"},
  {img: "/images/ethereum.webp", className: "bg-gradient-to-b from-[rgb(121,126,191)] to-[rgb(96,111,189)]", name: "Ethereum", nameAdd: " Address"},
  {img: "/images/dogecoin.webp", className: "bg-gradient-to-b from-[rgb(255,213,141)] to-[rgb(222,163,61)]", name: "Dogecoin", nameAdd: " Address"},

]

const page = () => {
  return (
    <div className='w-full pl-3 max-md:pl-0 h-auto text-white mt-24 flex flex-col gap-3 max-md:mt-20'>
      <div className=''>
        <div className='max-md:pl-3'>
          <h1 className='text-2xl font-extrabold text-left'>Cashout</h1>
          <p className='text-blue-200 opacity-75 text-lg font-medium max-md:text-sm'>Redeem your Taskbank earnings directly to Mobile Money,
            <br/>Litecoin and more! Withdraw to your crypto wallet
            <br/>starting at just $2.50 and 3 referrals, and to Mobile Money starting at
            <br/>$2.00 and 3 referrals!
          </p>
        </div>
        <div className='flex flex-col'>
        <a href='/myprofile#withdrawals' className='text-base-2 max-md:hidden'>Withdrawals →</a>
        <a href='/withdrawals' className='text-base-2 pl-3 hidden max-md:flex'>My Withdrawals →</a>
          <div className='grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full justify-center items-center max-md:py-0 py-2 max-md:mt-3 max-md:pb-20 bg-base-3 bg-opacity-15 max-md:pt-4'>
          {cashoutProviders.map((provider, index)=>(
            <PaymentCard key={index} img={provider.img} className={provider.className} name={provider.name} nameAdd={provider.nameAdd}/>
          ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default page