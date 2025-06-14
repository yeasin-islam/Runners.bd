import React, { Suspense, useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useLocation } from 'react-router';
import MarathonCard from '../components/MarathonCard';
import Button from '../components/shared/Button';
import LoadingFallback from '../components/shared/LoadingFallback';

const Marathons = () => {
    const marathons = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();

    const [displayMarathons, setDisplayMarathons] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [sort, setSort] = useState(new URLSearchParams(location.search).get("sort") || "newest");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        let sortedMarathons = [...marathons];

        if (sort === "newest") {
            sortedMarathons.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sort === "oldest") {
            sortedMarathons.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        // 🔍 Apply search filter
        const filtered = sortedMarathons.filter((marathon) =>
            marathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            marathon.location.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (showAll) {
            setDisplayMarathons(filtered);
        } else {
            setDisplayMarathons(filtered.slice(0, 6));
        }
    }, [showAll, sort, marathons, searchTerm]);


    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        setSort(selectedSort);
        navigate(`?sort=${selectedSort}`);
    };

    const loading = <>
        <LoadingFallback></LoadingFallback>
    </>

    return (
        <section className='bg-base-200'>
            <div className='container px-4 py-12 mx-auto text-center fontStyle md:px-0'>
                {/* Section Tag & Description */}
                <div className="mb-8">
                    <h2 className="mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">
                        All Marathons
                    </h2>
                    <p className="max-w-2xl mx-auto mb-8">
                        Browse marathons by date – newest or oldest first.
                    </p>

                    {/* Sorting Dropdown */}
                    <div className='flex justify-end gap-4'>
                        <div className="">
                            <input
                                type="text"
                                placeholder="🔍Search by title & location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full max-w-sm input input-bordered"
                            />
                        </div>
                        <div className="">
                            <select
                                className="select select-bordered"
                                value={sort}
                                onChange={handleSortChange}
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                            </select>
                        </div>
                    </div>
                </div>


                {displayMarathons.length > 0 ? (
                    <Suspense fallback={loading}>
                        <div className='grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-3'>
                            {displayMarathons.map(marathon => (
                                <MarathonCard key={marathon._id} marathon={marathon} />
                            ))}
                        </div>
                    </Suspense>
                ) : (
                    <div className="py-10 text-lg font-semibold text-center text-error">
                        No marathons found.
                    </div>
                )}


                <div className="flex justify-center">
                    <Button
                        onClick={() => {
                            setShowAll(prev => !prev);
                            if (showAll) window.scrollTo(0, 0);
                        }}
                        label={showAll ? 'Show Less' : 'Show All'}
                    />
                </div>
            </div>
        </section>
    );
};

export default Marathons;
