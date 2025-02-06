import React from 'react'
import ProviderCard from '@/components/ProviderCard'
import BitlabsSvg from '@/public/images/bitlabs.svg'

const page = () => {


const providers = [
  {
    name: "Bitlabs Offers",
    image: BitlabsSvg,
    iframeName: "Bitlabs",
    iframeSrc: `https://web.bitlabs.ai/?uid=12345&token=2b557582-2d62-4083-975c-efa2cd7c3af1`

  }
]

  return (
    <div className='w-full h-[80vh] text-white mt-24 justify-center items-center text-center'>
      <span>
        <h1 className='font-medium text-xl text-blue-200 opacity-85'>Choose any of our providers to start a task</h1>
      </span>
      <div className="grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full py-2 max-md:mt-3 max-md:pl-3">
        {providers.map((provider, index) => (
          <ProviderCard key={index} img={provider.image} iframeName={provider.iframeName} iframeSrc={provider.iframeSrc} name={provider.name}/>
        ))}
      </div>

    </div>
  )
}

export default page;