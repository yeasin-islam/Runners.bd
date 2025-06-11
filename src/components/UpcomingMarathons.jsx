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
                    {marathons.map(event => (
                        <div key={event.id} className="card mx-4 lg:mx-0 bg-base-300 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{event.title}</h2>
                                <p>📍 {event.location}</p>
                                <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                                <p>🏃 Distance: {event.distance}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpcomingMarathons;
