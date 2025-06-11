import React from 'react'
import { Link } from 'react-router'
import Button from './Button'

const EmptyState = () => {
  return (
    <div className='popins py-24 text-center '>
      <h1 className='mb-4 text-4xl md:text-6xl lg:text-7xl font-bold text-orange-500'>
        No Events Found
      </h1>
      <p className='mb-8 text-lg md:text-xl lg:text-2xl text-gray-600 font-medium max-w-4xl mx-auto'>
        Looks like you haven’t booked any events yet. Explore the event listings and start adding your favorites!
      </p>
      <Link to='/'>
        <Button label='Back To Homepage' />
      </Link>
    </div>
  )
}

export default EmptyState
