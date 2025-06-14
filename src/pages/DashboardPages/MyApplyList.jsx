import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import LoadingFallback from '../../components/shared/LoadingFallback';
import { FaLocationDot } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const MyApplyList = () => {
    const { user } = useAuth();
    const [myApplications, setMyApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApplication, setSelectedApplication] = useState(null);
    const axiosSecure = UseAxiosSecure()

    // console.log("token in the context", user.accessToken)

    useEffect(() => {
        if (user?.email && user.accessToken) {
            axiosSecure
                .get(`/my-applications?applicantEmail=${user.email}`)
                .then((res) => {
                    setMyApplications(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);



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
                fetch(`${import.meta.env.VITE_API_URL}/applications/${_id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount) {
                            Swal.fire('Deleted!', 'Your Application has been deleted.', 'success');
                            setMyApplications(myApplications.filter((appliction) => appliction._id !== _id));
                        }
                    });
            }
        });
    };

    const openUpdateModal = async (id) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/applications/${id}`);
            const data = await res.json();
            setSelectedApplication(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateApplication = async (e, id) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const updatedData = Object.fromEntries(formData.entries());


        axios.put(`${import.meta.env.VITE_API_URL}/applications/${id}`, updatedData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Application updated!');
                    setSelectedApplication(null);
                    const updatedList = myApplications.map((application) =>
                        application._id === id ? { ...application, ...updatedData } : application
                    );
                    setMyApplications(updatedList);
                } else {
                    toast.error('No changes made.');
                }
            })
            .catch(error => {
                console.log(error);
                toast.error('Update failed.');
            })
    };

    if (loading) {
        return <LoadingFallback />;
    }

    // Filter applications based on title
    const filteredApplications = myApplications.filter(app =>
        app.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.distance?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container px-4 py-10 mx-auto">
            <div className="mb-6 text-center">
                <h2 className="mb-2 text-3xl font-bold md:text-5xl">My Applications</h2>
                <p className='font-bold text-md'>You Applied Marathon So Far: {myApplications.length}</p>

                <div className="max-w-sm mx-auto mt-4">
                    <input
                        type="text"
                        placeholder="🔍Search by title, location or distance..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full input input-bordered"
                    />
                </div>
            </div>

            {myApplications.length === 0 ? (
                <div className="py-10 font-semibold text-center text-error">
                    You haven’t applied to any marathons yet.
                </div>
            ) : filteredApplications.length === 0 ? (
                <div className="py-10 font-semibold text-center text-error">
                    No applications matched your search.
                </div>
            ) : (
                <div className='overflow-x-auto'>
                    <table className="table w-full text-sm rounded-md shadow bg-base-200 md:text-base">
                        <thead className="bg-base-300">
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Title & Details</th>
                                <th>Distance</th>
                                <th>Marathon Date</th>
                                <th>Applicant Details</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredApplications.map((application, index) => (
                                <tr className='transition duration-300 transform hover:scale-100 hover:shadow-2xl' key={application._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-12 h-12 mask mask-squircle">
                                                <img src={application.photo} alt={application.title} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{application.title}</div>
                                            <div className="flex items-center gap-1 text-sm opacity-50">
                                                <FaLocationDot className="w-5 h-5" />
                                                {application.location}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{application.distance}</td>
                                    <td>{application.marathonDate}</td>
                                    <td>
                                        <div className="font-bold">{application.applicantFirstName} {application.applicantLastName}</div>
                                        <div className="flex gap-1 text-sm opacity-50">
                                            <FaLocationDot className="w-5 h-5" />
                                            {application.applicantLocation}
                                        </div>
                                    </td>
                                    <td className="flex flex-col gap-2 md:flex-row">
                                        <button onClick={() => openUpdateModal(application._id)} className="btn btn-warning btn-sm">Update</button>
                                        <button onClick={() => handleDelete(application._id)} className="btn btn-outline btn-error btn-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            )}

            {selectedApplication && (
                <div className={`modal ${selectedApplication ? 'modal-open' : ''}`}>
                    <div className="w-full max-w-2xl modal-box">
                        <h3 className="mb-4 text-2xl font-bold text-center">Update Application</h3>
                        <form
                            onSubmit={(e) => handleUpdateApplication(e, selectedApplication._id)}
                            className="space-y-4"
                        >

                            <div>
                                <label className="mb-1 fieldset-legend">Name</label>
                                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                    <input type="text" name='applicantFirstName' defaultValue={selectedApplication.applicantFirstName} className="w-full input" placeholder="Type Your First Name" required />
                                    <input type="text" name='applicantLastName' defaultValue={selectedApplication.applicantLastName} className="w-full input" placeholder="Type Your Last Name" required />
                                </div>

                            </div>

                            <div>
                                <label className="mb-1 fieldset-legend">Your Location</label>
                                <input type="text" name='applicantLocation' defaultValue={selectedApplication.applicantLocation} className="w-full input" placeholder="Type Your Location" required />
                            </div>
                            <div>
                                <legend className="mb-1 fieldset-legend">Contact Number</legend>
                                <input type="text" name="applicantContactNumber" defaultValue={selectedApplication.applicantContactNumber} className="w-full input input-bordered" placeholder="Add Your Contact Number" required />
                            </div>
                            <div>
                                <label className="mb-1 fieldset-legend">Your Email</label>
                                <input type="email" name='applicantEmail' className="w-full input" value={user.email} readOnly placeholder="Enter Your Email" required />
                            </div>
                            <div>
                                <label className="mb-1 fieldset-legend">Marathon Title</label>
                                <input type="text" name="marathonTitle" value={selectedApplication.marathonTitle} readOnly className="w-full input" />
                            </div>


                            <div className="w-full">
                                <label className="mb-1 fieldset-legend">Marathon Date</label>
                                <DatePicker
                                    name="marathonDate"
                                    selected={new Date(selectedApplication.marathonDate)}
                                    readOnly className="w-full input input-bordered"
                                />
                            </div>


                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => setSelectedApplication(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyApplyList;
