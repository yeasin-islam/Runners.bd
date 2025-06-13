import React, { useEffect, useState } from 'react';

const WhatPeopleSay = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('/WhatPeopleSay.json')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    return (
        <section className="bg-base-100">
            <div className='container mx-auto py-12'>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2">What People Say</h2>
                <p className="max-w-2xl mx-auto mb-8 text-center">Hear from real runners who’ve joined our marathons - their stories, experiences, and inspiration await!</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 card mx-4 lg:mx-0 ">
                    {reviews.map(({ id, name, location, comment, photo }) => (
                        <div key={id} className="bg-base-300 shadow-md rounded-xl p-6 border border-base-200 transform transition duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="flex items-center mb-4 gap-4">
                                <img src={photo} alt={name} className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden" />
                                <div>
                                    <h4 className="font-semibold text-lg">{name}</h4>
                                    <p className="text-sm text-gray-500">{location}</p>
                                </div>
                            </div>
                            <p className="italic">“{comment}”</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatPeopleSay;