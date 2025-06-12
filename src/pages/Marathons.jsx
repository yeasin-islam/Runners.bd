import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import MarathonCard from '../components/MarathonCard';
import Button from '../components/shared/Button';

const Marathons = () => {
    const marathons = useLoaderData();

    const [displayMarathons, setDisplayMarathons] = useState([])
    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        if (showAll) {
            setDisplayMarathons(marathons)
        } else {
            setDisplayMarathons(marathons.slice(0, 6))
        }
    }, [showAll, marathons])

    return (
        <section className='bg-base-200'>
            <div className='fontStyle py-12 px-4 md:px-0 sm:px-6 lg:px-8 text-center container mx-auto'>
                {/* Section Tag & Description */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        All Marathons
                    </h2>
                    <p className="max-w-2xl mx-auto">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, cumque.
                    </p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10'>
                    {displayMarathons.map(marathon => (
                        <MarathonCard key={marathon._id} marathon={marathon} />
                    ))}
                </div>
                <div className="flex justify-center">
                    <Button
                        onClick={() => {
                            setShowAll(prv => !prv)
                            if (showAll) window.scrollTo(0, 0)
                        }}
                        label={showAll ? 'Show Less' : 'Show All'}
                    />
                </div>
            </div>
        </section>
    )
};

export default Marathons;