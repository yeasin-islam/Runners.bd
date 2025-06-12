import React, { useEffect, useState } from 'react';
import MarathonsSectionCard from './MarathonsSectionCard';

const MarathonsSection = ({marathonPosts}) => {
    const [marathonSectionPosts, setMarathonSectionPosts] = useState([])
    useEffect(() => {
        setMarathonSectionPosts(marathonPosts)
    }, [ marathonPosts])
    return (
        <section className=''>
            <div className='popins pt-12 px-4 md:px-0 text-center container mx-auto'>
                {/* Section Tag & Description */}
                <div className="mb-12 mt-4">
                    <h2 className="text-3xl md:text-4xl font-bold  mb-4">
                        Marathons
                    </h2>

                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10'>
                    {marathonSectionPosts.map(marathonPost => (
                        <MarathonsSectionCard key={marathonPost._id} marathonPost={marathonPost} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarathonsSection;