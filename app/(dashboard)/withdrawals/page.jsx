import React from 'react'
import BackSvg from '@/public/images/back.svg'

const page = () => {
  return (
    <div className='w-full flex flex-col pt-24'>
      <div className='flex text-white gap-2 pl-3 items-center'>
        <a href='/myprofile' className='p-3 flex justify-center gap-2 items-center border border-white rounded-full'>
          <BackSvg className="w-4 h-4"/>
        </a>
        <span className='text-xl font-bold'>Withdrawals</span>
      </div>
      <div className='flex justify-center items-center pt-6 text-white'>
        <table className='w-full'>
            <thead className='px-2 border-b border-opacity-20'>
              <tr className=''>
                <th className='py-2'><p>Type</p></th>
                <th className='py-2'><p>Reward</p></th>
              </tr>
            </thead>
        </table>
      </div>
    </div>
  )
}

export default page