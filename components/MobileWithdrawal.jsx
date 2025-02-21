import React from 'react'

const MobileWithdrawal = ({ method, amount, txnId, status }) => {
  return (
    <div className='border border-blue-200 rounded-lg w-full flex flex-col shadow-md bg-transparent text-blue-200 text-opacity-85 p-4'>
        <p><span className='text-white font-bold'>Method:</span> {method}</p>
        <p><span className='text-white font-bold'>Amount:</span> {amount}</p>
        <p><span className='text-white font-bold'>Txn Id:</span> {txnId}</p>
        <p><span className='text-white font-bold'>Status:</span> {status}</p>
    </div>
  )
}

export default MobileWithdrawal