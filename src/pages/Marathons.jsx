import React, { useEffect, useState, Suspense } from "react";
import { useNavigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import MarathonCard from "../components/MarathonCard";
import LoadingFallback from "../components/shared/LoadingFallback";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import { Helmet } from "react-helmet-async";

const Marathons = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [marathons, setMarathons] = useState([]);
    const [displayMarathons, setDisplayMarathons] = useState([]);
    const [sort, setSort] = useState(new URLSearchParams(location.search).get("sort") || "newest");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            const fetchMarathons = async () => {
                try {
                    const res = await axiosSecure.get(`/marathons?sort=${sort}`);
                    setMarathons(res.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Failed to fetch marathons", error);
                    setLoading(false);
                }
            };
            fetchMarathons();
        }
    }, [sort, user?.email, axiosSecure]);

    useEffect(() => {
        let sortedMarathons = [...marathons];

        if (sort === "newest") {
            sortedMarathons.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else {
            sortedMarathons.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        const filtered = sortedMarathons.filter((marathon) =>
            marathon.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            marathon.distance?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            marathon.location?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Pagination logic
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayMarathons(filtered.slice(startIndex, endIndex));
    }, [marathons, sort, searchTerm, currentPage]);

    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        setSort(selectedSort);
        setCurrentPage(1);
        navigate(`?sort=${selectedSort}`);
    };

    const totalPages = Math.ceil(
        marathons.filter((m) =>
            m.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.distance?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.location?.toLowerCase().includes(searchTerm.toLowerCase())
        ).length / itemsPerPage
    );

    return (
        <section className="fontJakarta bg-base-200">
            <Helmet>
                <title>Marathons | Runners.bd</title>
            </Helmet>
            <div className="container px-4 py-12 mx-auto text-center md:px-0">
                <div className="mb-8">
                    <h2 className="mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">
                        All Marathons
                    </h2>
                    <p className="max-w-2xl mx-auto mb-8">Browse marathons by date - newest or oldest first.</p>

                    <div className="flex flex-col justify-center gap-4 sm:flex-row sm:justify-end">
                        <input
                            type="text"
                            placeholder="🔍 Search by title, distance or location..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full max-w-sm input input-bordered"
                        />
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

                {loading ? (
                    <LoadingFallback />
                ) : displayMarathons.length > 0 ? (
                    <Suspense fallback={<LoadingFallback />}>
                        <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-3">
                            {displayMarathons.map((marathon, index) => (
                                <div key={marathon._id} data-aos="zoom-in" data-aos-delay={index * 100}>
                                    <MarathonCard marathon={marathon} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2">
                                <button
                                    className="btn btn-sm"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                >
                                    Prev
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        className={`btn btn-sm ${currentPage === i + 1 ? "btn-active" : ""}`}
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    className="btn btn-sm"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </Suspense>
                ) : (
                    <div className="py-10 text-lg font-semibold text-center text-error" data-aos="fade-up">
                        No marathons found.
                    </div>
                )}
            </div>
        </section>
    );
};

export default Marathons;