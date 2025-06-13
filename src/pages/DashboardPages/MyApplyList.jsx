import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import LoadingFallback from '../../components/shared/LoadingFallback';
import { FaLocationDot } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const MyApplyList = () => {
    const { user } = useAuth();
    const [myApplications, setMyApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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

    if (loading) {
        return <LoadingFallback />;
    }

    // Filter applications based on title
    const filteredApplications = myApplications.filter(app =>
        app.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.distance?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="text-center mb-6">
                <h2 className="text-3xl md:text-5xl font-bold mb-2">My Applications</h2>
                <p className='text-md font-bold'>You Applied Marathon So Far: {myApplications.length}</p>

                <div className="mt-4 max-w-sm mx-auto">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
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
                                    <button className="btn btn-warning btn-sm">Update</button>
                                    <button onClick={() => handleDelete(application._id)} className="btn btn-outline btn-error btn-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredApplications.length === 0 && (
                    <div className="text-center py-10 text-error font-semibold">No applications found.</div>
                )}
            </div>
        </div>
    );
};

export default MyApplyList;
