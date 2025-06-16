import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const WhatPeopleSay = () => {
    const [reviews, setReviews] = useState([]);
    const [displayReviews, setDisplayReviews] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/reviews`)
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setDisplayReviews(data.slice(0, 3)); // Show only 6 initially
            })
            .catch(err => console.error("Failed to fetch reviews", err));
    }, []);

    useEffect(() => {
        if (showAll) {
            setDisplayReviews(reviews);
        } else {
            setDisplayReviews(reviews.slice(0, 3));
        }
    }, [showAll, reviews]);

    const handleToggle = () => {
        setShowAll(prev => !prev);
    };

    return (
        <section className="bg-base-100">
            <div className='container mx-auto py-12'>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2">What People Say</h2>
                <p className="max-w-2xl mx-auto mb-8 text-center">Hear from real runners who’ve joined our marathons - their stories, experiences, and inspiration await!</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 lg:mx-0">
                    {displayReviews.length === 0 ? (
                        <p className="text-center col-span-full text-gray-500">No reviews yet. Be the first to share your experience!</p>
                    ) : (
                        displayReviews.map(({ _id, name, location, message, photo, rating = 0 }) => (
                            <div key={_id} className="bg-base-300 shadow-md rounded-xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl border border-secondary">
                                <div className="flex items-center mb-4 gap-4">
                                    <img src={photo} alt={name} className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden" />
                                    <div>
                                        <h4 className="font-semibold text-lg">{name}</h4>
                                        <p className="text-sm text-gray-500">{location}</p>
                                    </div>
                                </div>
                                <p className="italic mb-2">“{message.slice(0, 80)}{message.length > 80 ? '...' : ''}”</p>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-400'} />
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {reviews.length > 3 && (
                    <div className="flex justify-center mt-8">
                        <button onClick={handleToggle} className='btn btn-primary'>
                            {showAll ? 'Show Less' : 'Show All'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default WhatPeopleSay;
