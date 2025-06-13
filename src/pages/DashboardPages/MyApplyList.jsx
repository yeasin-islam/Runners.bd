import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import LoadingFallback from '../../components/shared/LoadingFallback';
import { FaLocationDot } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import axios from 'axios';
import DatePicker from 'react-datepicker';

const MyApplyList = () => {
    const { user } = useAuth();
    const [myApplications, setMyApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`${import.meta.env.VITE_API_URL}/my-applications?applicantEmail=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setMyApplications(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user]);

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
        <div className="container mx-auto px-4 py-10">
            <div className="text-center mb-6">
                <h2 className="text-3xl md:text-5xl font-bold mb-2">My Applications</h2>
                <p className='text-md font-bold'>You Applied Marathon So Far: {myApplications.length}</p>

                <div className="mt-4 max-w-sm mx-auto">
                    <input
                        type="text"
                        placeholder="🔍Search by title, location or distance..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
            </div>

            {myApplications.length === 0 ? (
                <div className="text-center py-10 text-error font-semibold">
                    You haven’t applied to any marathons yet.
                </div>
            ) : filteredApplications.length === 0 ? (
                <div className="text-center py-10 text-error font-semibold">
                    No applications matched your search.
                </div>
            ) : (
                        <table className="table w-full bg-base-200 shadow rounded-md text-sm md:text-base">
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
                                    <tr key={application._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
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
                                            <div className="flex items-center gap-1 text-sm opacity-50">
                                                <FaLocationDot className="w-5 h-5" />
                                                {application.applicantLocation}
                                            </div>
                                        </td>
                                        <td className="flex gap-2 flex-col md:flex-row">
                                            <button onClick={() => openUpdateModal(application._id)} className="btn btn-warning btn-sm">Update</button>
                                            <button onClick={() => handleDelete(application._id)} className="btn btn-outline btn-error btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
            )}

            {selectedApplication && (
                <div className={`modal ${selectedApplication ? 'modal-open' : ''}`}>
                    <div className="modal-box w-full max-w-2xl">
                        <h3 className="font-bold text-2xl mb-4 text-center">Update Application</h3>
                        <form
                            onSubmit={(e) => handleUpdateApplication(e, selectedApplication._id)}
                            className="space-y-4"
                        >

                            <div>
                                <label className="fieldset-legend mb-1">Name</label>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <input type="text" name='applicantFirstName' defaultValue={selectedApplication.applicantFirstName} className="input w-full" placeholder="Type Your First Name" required />
                                    <input type="text" name='applicantLastName' defaultValue={selectedApplication.applicantLastName} className="input w-full" placeholder="Type Your Last Name" required />
                                </div>

                            </div>

                            <div>
                                <label className="fieldset-legend mb-1">Your Location</label>
                                <input type="text" name='applicantLocation' defaultValue={selectedApplication.applicantLocation} className="input w-full" placeholder="Type Your Location" required />
                            </div>
                            <div>
                                <legend className="fieldset-legend mb-1">Contact Number</legend>
                                <input type="text" name="applicantContactNumber" defaultValue={selectedApplication.applicantContactNumber} className="input input-bordered w-full" placeholder="Add Your Contact Number" required />
                            </div>
                            <div>
                                <label className="fieldset-legend mb-1">Your Email</label>
                                <input type="email" name='applicantEmail' className="input w-full" value={user.email} readOnly placeholder="Enter Your Email" required />
                            </div>
                            <div>
                                <label className="fieldset-legend mb-1">Marathon Title</label>
                                <input type="text" name="marathonTitle" value={selectedApplication.marathonTitle} readOnly className="input w-full" />
                            </div>


                            <div className="w-full">
                                <label className="fieldset-legend mb-1">Marathon Date</label>
                                <DatePicker
                                    name="marathonDate"
                                    selected={new Date(selectedApplication.marathonDate)}
                                    readOnly className="input input-bordered w-full"
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
