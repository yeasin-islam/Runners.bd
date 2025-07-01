import React, { useEffect, useState } from 'react';
import MarathonsSectionCard from './MarathonsSectionCard';

const MarathonsSection = ({ marathonPosts }) => {
    const [marathonSectionPosts, setMarathonSectionPosts] = useState([])
    useEffect(() => {
        setMarathonSectionPosts(marathonPosts)
    }, [marathonPosts])
    return (
        <section className=''>
            <div className='fontJakarta popins py-12 px-4 md:px-0 text-center container mx-auto'>
                {/* Section Tag & Description */}
                <div className="mb-12 mt-4">
                    <h2 className="poppins text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
                        Top Marathons
                    </h2>
                    <p className="max-w-2xl mx-auto mb-8 text-center">Browse top marathons across Bangladesh with full details on dates, distances, and locations.</p>

                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {marathonSectionPosts.map((marathonPost, index) => (
                        <div
                            key={marathonPost._id}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            data-aos-duration="800"
                        >
                            <MarathonsSectionCard marathonPost={marathonPost} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarathonsSection;