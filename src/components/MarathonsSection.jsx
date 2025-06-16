import React, { useEffect, useState } from 'react';
import MarathonsSectionCard from './MarathonsSectionCard';

const MarathonsSection = ({marathonPosts}) => {
    const [marathonSectionPosts, setMarathonSectionPosts] = useState([])
    useEffect(() => {
        setMarathonSectionPosts(marathonPosts)
    }, [ marathonPosts])
    return (
        <section className=''>
            <div className='fontJakarta popins py-12 px-4 md:px-0 text-center container mx-auto'>
                {/* Section Tag & Description */}
                <div className="mb-12 mt-4">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  mb-2">
                       Top Marathons
                    </h2>
                    <p className="max-w-2xl mx-auto mb-8 text-center">Browse top marathons across Bangladesh with full details on dates, distances, and locations.</p>

                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {marathonSectionPosts.map(marathonPost => (
                        <MarathonsSectionCard key={marathonPost._id} marathonPost={marathonPost} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarathonsSection;