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
            <div className='container mx-auto py-12'>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2">Upcoming Marathons</h2>
                <p className="max-w-2xl mx-auto mb-8 text-center">Upcoming marathons across Bangladesh - dates, locations, and distances, all in one place.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marathons.map(marathon => (
                        <div key={marathon.id} className="card mx-4 md:mx-0 bg-base-300 shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-xl border border-primary">
                            <figure>
                                <img
                                    src={marathon.image}
                                    alt={marathon.title}
                                    className="h-48 w-full object-cover border-b border-primary"
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
