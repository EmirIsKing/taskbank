import React from 'react'

const MobileWithdrawal = ({ method, amount, txnId, status }) => {
  return (
    <div className='border border-blue-200 rounded-lg flex flex-col shadow-md bg-transparent text-blue-200 text-opacity-85 p-4'>
        <p><span className='text-white font-bold'>Method:</span> {method}</p>
        <p><span className='text-white font-bold'>Method:</span> {amount}</p>
        <p><span className='text-white font-bold'>Method:</span> {txnId}</p>
        <p><span className='text-white font-bold'>Method:</span> {status}</p>
    </div>
  )
}

export default MobileWithdrawal