import React, { useEffect, useState } from 'react';

const UpcomingMarathons = () => {
    const [marathons, setMarathons] = useState([]);

    useEffect(() => {
        fetch('/marathons.json')
            .then(res => res.json())
            .then(data => setMarathons(data));
    }, []);

    return (
        <section className="bg-base-100 ">
            <div className='container mx-auto my-6'>
                <h2 className="text-3xl font-bold text-center mb-8">Upcoming Marathons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marathons.map(marathon => (
                        <div key={marathon.id} className="card mx-4 md:mx-0 bg-base-300 shadow-xl">
                            <figure>
                                <img
                                    src={marathon.image}
                                    alt={marathon.title}
                                    className="h-48 w-full object-cover"
                                />
                            </figure>
                            <div className="card-body">

                                <h2 className="text-xl font-bold text-center"> {marathon.title}</h2>
                                <p className="text-gray-500 text-center">{marathon.description}</p>
                                <p className='font-medium'>🏃 Distance: {marathon.distance}</p>
                                <p className='font-medium'>📍 Location: {marathon.location}</p>
                                <h4>📅 Marathon Date: <span className='text-[#09982F] font-semibold'>{new Date(marathon.date).toLocaleDateString()}</span></h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpcomingMarathons;
