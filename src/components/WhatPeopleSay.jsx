import React, { useEffect, useState } from 'react';
import { FaStar, FaQuoteLeft, FaQuoteRight, FaInfoCircle } from 'react-icons/fa';

const WhatPeopleSay = () => {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedReview, setSelectedReview] = useState(null);
    const itemsPerPage = 6;

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/reviews`)
            .then(res => res.json())
            .then(data => {
                setReviews(data);
            })
            .catch(err => console.error("Failed to fetch reviews", err));
    }, []);

    const totalPages = Math.ceil(reviews.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginatedReviews = reviews.slice(startIdx, startIdx + itemsPerPage);

    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <section className="bg-base-100">
            <div className="fontJakarta container mx-auto py-12">
                <h2 className="poppins text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4" data-aos="fade-up">
                    What Our Runners Say
                </h2>
                <p className="max-w-2xl mx-auto mb-8 text-center" data-aos="fade-up" data-aos-delay="100">
                    Hear from real runners who’ve joined our marathons - their stories, experiences, and inspiration await!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 lg:mx-0">
                    {paginatedReviews.length === 0 ? (
                        <p className="text-center col-span-full text-gray-500" data-aos="fade-up">
                            No reviews yet. Be the first to share your experience!
                        </p>
                    ) : (
                        paginatedReviews.map(({ _id, name, location, message, photo, rating = 0, email }, index) => (
                            <div
                                key={_id}
                                className="bg-base-300 shadow-md rounded-xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl border border-secondary"
                                data-aos="zoom-in"
                                data-aos-delay={index * 150}
                            >
                                <div className='flex justify-between items-center mb-4 gap-4'>
                                    <div className="flex items-center mb-4 gap-4">
                                        <img
                                            src={photo}
                                            alt={name}
                                            className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-lg">{name}</h4>
                                            <p className="text-sm text-gray-500">{location}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedReview({ name, location, message, photo, rating, email })}
                                        className="btn btn-outline btn-sm"
                                    >
                                        <FaInfoCircle />
                                    </button>
                                </div>
                                <p className="italic mb-2 flex items-start gap-2 ">
                                    <FaQuoteLeft className="text-primary" />
                                    {message.slice(0, 60)}{message.length > 60 ? '...' : ''}
                                    <FaQuoteRight className="text-primary self-end" />
                                </p>
                                <div className="flex justify-center  gap-1 mt-2 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-400'} />
                                    ))}
                                </div>

                            </div>
                        ))
                    )}
                </div>

                {reviews.length > itemsPerPage && (
                    <div className="flex justify-center gap-4 mt-8" data-aos="fade-up" data-aos-delay={itemsPerPage * 150}>
                        <button onClick={handlePrev} disabled={currentPage === 1} className="btn btn-outline btn-sm">
                            Prev
                        </button>
                        <span className="btn btn-disabled btn-sm cursor-default">
                            Page {currentPage} / {totalPages}
                        </span>
                        <button onClick={handleNext} disabled={currentPage === totalPages} className="btn btn-outline btn-sm">
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedReview && (
                <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-base-200 rounded-2xl shadow-xl max-w-lg w-full relative animate-fadeIn">
                        <button
                            className="absolute top-3 right-3 btn btn-sm btn-circle"
                            onClick={() => setSelectedReview(null)}
                        >
                            ✕
                        </button>
                        <div className="p-6 text-center">
                            <img
                                src={selectedReview.photo}
                                alt={selectedReview.name}
                                className="w-20 h-20 rounded-full mx-auto ring ring-primary ring-offset-base-100 ring-offset-2"
                            />
                            <h3 className="text-2xl font-bold mt-4">{selectedReview.name}</h3>
                            <p className="text-sm text-gray-500">{selectedReview.location}</p>

                            <div className="flex justify-center gap-1 mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < selectedReview.rating ? 'text-yellow-500' : 'text-gray-400'} />
                                ))}
                            </div>

                            <p className="mt-4 italic flex items-start gap-2">
                                <div className="flex items-start">
                                    <FaQuoteLeft className="text-primary" />
                                    <p className="mx-2 flex-1">
                                        {selectedReview.message}
                                    </p>
                                    <FaQuoteRight className="text-primary self-end" />
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
            `}</style>
        </section>
    );
};

export default WhatPeopleSay;
