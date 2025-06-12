import React from 'react'
import { Link } from 'react-router'
import { MdDeleteForever } from 'react-icons/md'
import Button from './shared/Button'

const MarathonCard = ({ marathon }) => {
  const {
    _id,
    photo,
    title,
    description,
    location,
    distance,
    endReg,
    startReg } = marathon || {}
  return (
    <div className='fontStyle card bg-base-300  shadow-sm pt-5'>
      <div className="overflow-hidden rounded-xl w-72 h-48 text-center items-center mx-5 group">
        <img
          src={photo}
          alt="Marathon Photo"
          className=" w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className='card-body text-left'>
        <h2 className='card-title'>{title}</h2>
        <p className='text-gray-500'>{description}</p>
        <p className='font-medium'>Distance: {distance}</p>
        <h4>Registration Start Date: <span className='text-[#09982F] font-semibold'> {startReg}</span></h4>
        <h4>Registration End Date: <span className='text-[#09982F] font-semibold'> {endReg}</span></h4>
        <p className='font-medium'>Location: {location}</p>
        <div className='card-actions justify-end'>
          <Link to={`/marathon-details/${_id}`}>
            <button className="btn btn-primary mt-2">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MarathonCard
