import React from 'react'
import { Link } from 'react-router'

const MarathonCard = ({ marathon }) => {
  const {
    _id,
    photo,
    title,
    description,
    location,
    distance,
    endReg,
    startReg,
    createdAt,
    marathonDate,
  } = marathon || {}

  return (
    <div className="card mx-4 lg:mx-0 bg-base-300 shadow-xl">
      <figure>
        <img
          src={photo}
          alt={title}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body text-left">
        <h2 className="text-xl font-bold text-center"> {title}</h2>
        <p className="text-gray-500 text-center">{description}</p>
        <p className='font-medium'>🏃 Distance: {distance}</p>
        <p className='font-medium'>📍 Location: {location}</p>
        <h4>🟢 Registration Start:
          <span className="text-blue-600 font-semibold"> {startReg}</span></h4>
        <h4>🔴 Registration End:
          <span className="text-red-600 font-semibold"> {endReg}</span></h4>
        <h4>🏁 Marathon Date:
          <span className="text-emerald-600 font-semibold"> {marathonDate}</span></h4>
        <p>🕒 Created: <span className="text-gray-600"> {createdAt}</span></p>
        <div className="card-actions justify-end mt-4">
          <Link to={`/marathon-details/${_id}`}>
            <button className="btn btn-primary">Details</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MarathonCard