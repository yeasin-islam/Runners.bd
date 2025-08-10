import React from 'react';
import { Link } from 'react-router';
import { Tooltip } from 'react-tooltip';

const MarathonsSectionCard = ({ marathonPost }) => {
    const PLACES = ['top-end']
    const { _id,
        photo,
        title,
        description,
        location,
        distance,
        endReg,
        startReg,
        createdAt,
        marathonDate, } = marathonPost;
    return (
        <div className="fontJakarta h-full mx-4 transition duration-300 transform shadow-xl card lg:mx-0 bg-base-300 border border-primary hover:scale-105 hover:shadow-xl">
            <figure>
                <img
                    src={photo}
                    alt={title}
                    className="object-cover w-full h-48 border-b border-primary"
                />
            </figure>
            <div className="text-left card-body">
                <h2 className="text-xl font-bold text-center"> {title}</h2>
                <p className="text-center text-gray-500">{description}</p>
                <p className='font-medium'>🏃 Distance: {distance}</p>
                <p className='font-medium'>📍 Location: {location}</p>
                {/* <h4>🟢 Registration Start:
                    <span className="font-semibold text-blue-600"> {startReg}</span></h4> */}
                <h4>🔴 Registration End:
                    <span className="font-semibold text-red-600"> {endReg}</span></h4>
                <h4>🏁 Marathon Date:
                    <span className="font-semibold text-emerald-600"> {marathonDate}</span></h4>
                {/* <p>🕒 Created: <span className="text-gray-600"> {createdAt}</span></p> */}
                <div className="justify-end mt-4 card-actions">
                    <Link to={`/marathon-details/${_id}`}>
                        <button id="clickable" className="btn btn-primary">Details</button>
                        {PLACES.map(place => (
                            <Tooltip key={place} anchorSelect="#clickable" place={place} clickable delayShow={500}
                                        delayHide={300} >
                                <button>Click me to see details!</button>
                            </Tooltip>
                        ))}
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default MarathonsSectionCard;