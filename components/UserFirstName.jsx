'use client'
import React from 'react'
import { useClerk } from '@clerk/nextjs'

const UserFirstName = () => {

    const { user } = useClerk();
    

  return (
    <span className='text-2xl font-semibold'>{user?.firstName || 'User'}</span>
  )
}

export default UserFirstName