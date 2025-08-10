import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import LoadingFallback from '../../components/shared/LoadingFallback';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { Link } from 'react-router';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import { Helmet } from 'react-helmet-async';
import { FaInfoCircle, FaEdit, FaTrash } from "react-icons/fa";

const MyMarathonList = () => {
    const { user } = useContext(AuthContext);
    const [myMarathons, setMyMarathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMarathon, setSelectedMarathon] = useState(null);

    const [startReg, setStartReg] = useState(null);
    const [endReg, setEndReg] = useState(null);
    const [marathonDate, setMarathonDate] = useState(null);

    // New states for search, sort, pagination
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("newest"); // newest or oldest
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const axiosSecure = UseAxiosSecure();

    useEffect(() => {
        if (user.email && user.accessToken) {
            axiosSecure.get(`/my-marathons?email=${user.email}`)
                .then((res) => {
                    setMyMarathons(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);

    // Filter, sort and paginate marathons
    const filteredMarathons = myMarathons
        .filter(marathon =>
            marathon.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            marathon.location?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            if (sortOrder === "newest") {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });

    const totalPages = Math.ceil(filteredMarathons.length / itemsPerPage);

    const paginatedMarathons = filteredMarathons.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset page when searchTerm or sortOrder changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sortOrder]);

    const handleDelete = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_API_URL}/marathons/${_id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount) {
                            Swal.fire('Deleted!', 'Your Marathon has been deleted.', 'success');
                            setMyMarathons(myMarathons.filter((marathon) => marathon._id !== _id));
                        }
                    });
            }
        });
    };

    const openUpdateModal = async (id) => {
        try {
            const res = await axiosSecure.get(`/marathons/${id}`);
            const data = res.data;

            setSelectedMarathon(data);
            setStartReg(new Date(data.startReg));
            setEndReg(new Date(data.endReg));
            setMarathonDate(new Date(data.marathonDate));
        } catch (err) {
            console.error("Failed to fetch marathon for update:", err);
        }
    };

    const handleUpdateMarathon = async (e, id) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const updatedData = Object.fromEntries(formData.entries());

        axios.put(`${import.meta.env.VITE_API_URL}/marathons/${id}`, updatedData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Marathon updated!');
                    setSelectedMarathon(null);
                    const updatedList = myMarathons.map((marathon) =>
                        marathon._id === id ? { ...marathon, ...updatedData } : marathon
                    );
                    setMyMarathons(updatedList);
                } else {
                    toast.error('No changes made.');
                }
            })
            .catch(error => {
                toast.error('Update failed.');
            })
    };

    if (loading) {
        return <LoadingFallback />;
    }

    return (
        <section className='fontJakarta'>
            <Helmet>
                <title>
                    My Marathon List | Runners.bd
                </title>
            </Helmet>
            <div className="container px-4 py-10 mx-auto">
                <div className="mb-8 text-center">
                    <h2 className="mb-2 text-3xl font-bold md:text-5xl">Your Marathons</h2>
                    <p className="text-sm md:text-base">
                        Here are all the marathons you created.
                    </p>

                    {/* Search and Sort */}
                    <div className="flex flex-col items-center justify-center gap-4 my-6 sm:flex-row sm:justify-end">
                        <input
                            type="text"
                            placeholder="Search by title or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-sm input input-bordered"
                        />
                        <select
                            className="select select-bordered max-w-xs"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="newest">Sort by Newest</option>
                            <option value="oldest">Sort by Oldest</option>
                        </select>
                    </div>
                </div>

                {paginatedMarathons.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table w-full text-sm rounded-md shadow bg-base-200 md:text-base">
                            <thead className="bg-base-300">
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Location</th>
                                    <th>Distance</th>
                                    <th>Marathon Date</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedMarathons.map((marathon, indx) => (
                                    <tr
                                        className='transition duration-300 transform hover:scale-100 hover:shadow-2xl'
                                        key={marathon._id}
                                    >
                                        <td><span className="font-semibold">{(currentPage - 1) * itemsPerPage + indx + 1}</span></td>
                                        <td>
                                            <Link to={`/marathon-details/${marathon._id}`}>
                                                <div className="avatar">
                                                    <div className="w-12 h-12 mask mask-squircle">
                                                        <img src={marathon.photo} alt="Marathon photo" />
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td>{marathon.title}</td>
                                        <td>{marathon.location}</td>
                                        <td>{marathon.distance}</td>
                                        <td>{marathon.marathonDate}</td>
                                        <td className="flex flex-col gap-2 md:flex-row justify-center">
                                            <Link to={`/marathon-details/${marathon._id}`}>
                                                <button className="btn btn-outline btn-sm">
                                                    <FaInfoCircle />
                                                </button>
                                            </Link>

                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() => openUpdateModal(marathon._id)}
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(marathon._id)}
                                                className="btn btn-outline btn-error btn-sm"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-10 text-lg font-semibold text-center text-error">
                        No marathons match your search.
                    </div>
                )}

                {/* Pagination controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                        <button
                            className="btn btn-sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`btn btn-sm ${currentPage === i + 1 ? 'btn-active' : ''}`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className="btn btn-sm"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}

                {/* Update Modal */}
                {selectedMarathon && (
                    <div className={`modal ${selectedMarathon ? 'modal-open' : ''}`}>
                        <div className="w-full max-w-2xl modal-box">
                            <h3 className="mb-4 text-2xl font-bold text-center">Update Marathon</h3>
                            <form
                                onSubmit={(e) => handleUpdateMarathon(e, selectedMarathon._id)}
                                className="space-y-4"
                            >
                                <div>
                                    <legend className="mb-1 fieldset-legend">Marathon Title</legend>
                                    <input
                                        type="text"
                                        name="title"
                                        defaultValue={selectedMarathon.title}
                                        className="w-full input input-bordered"
                                        required
                                    />
                                </div>
                                <div>
                                    <legend className="mb-1 fieldset-legend">Location</legend>
                                    <input
                                        type="text"
                                        name="location"
                                        defaultValue={selectedMarathon.location}
                                        className="w-full input input-bordered"
                                        placeholder="Add Location"
                                        required
                                    />
                                </div>

                                <div>
                                    <legend className="mb-1 fieldset-legend">Distance</legend>
                                    <select
                                        name="distance"
                                        defaultValue={selectedMarathon.distance}
                                        className="w-full select"
                                    >
                                        <option disabled>Select Distance</option>
                                        <option>3K</option>
                                        <option>10K</option>
                                        <option>25K</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <legend className="mb-1 fieldset-legend">Description</legend>
                                    <textarea
                                        name="description"
                                        className="w-full h-24 textarea"
                                        defaultValue={selectedMarathon.description}
                                        placeholder="Type a short Description"
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <legend className="mb-1 fieldset-legend">Image</legend>
                                    <input
                                        type="url"
                                        name="photo"
                                        defaultValue={selectedMarathon.photo}
                                        className="w-full input input-bordered"
                                        placeholder="Add a photo URL"
                                        required
                                    />
                                </div>

                                <div className='justify-between gap-4 lg:flex'>
                                    <div className="w-full">
                                        <legend className="mb-1 fieldset-legend">Start Registration Date</legend>
                                        <DatePicker
                                            name="startReg"
                                            selected={startReg}
                                            onChange={(date) => setStartReg(date)}
                                            className="w-full input input-bordered"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <legend className="mb-1 fieldset-legend">End Registration Date</legend>
                                        <DatePicker
                                            name="endReg"
                                            selected={endReg}
                                            onChange={(date) => setEndReg(date)}
                                            className="w-full input input-bordered"
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <legend className="mb-1 fieldset-legend">Marathon Date</legend>
                                        <DatePicker
                                            name="marathonDate"
                                            selected={marathonDate}
                                            onChange={(date) => setMarathonDate(date)}
                                            className="w-full input input-bordered"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary">
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => setSelectedMarathon(null)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyMarathonList;
