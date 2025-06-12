import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import LoadingFallback from '../../components/shared/LoadingFallback';
import Swal from 'sweetalert2';

const MyMarathonList = () => {
    const { user } = useContext(AuthContext);
    const [myMarathons, setMyMarathons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`${import.meta.env.VITE_API_URL}/my-marathons?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setMyMarathons(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) {
        return (
            <LoadingFallback></LoadingFallback>
        );
    }

    const handleDelete = (_id) => {
        // console.log(_id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            // console.log(result.isConfirmed)
            if (result.isConfirmed) {

                fetch(`${import.meta.env.VITE_API_URL}/marathons/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log('after delete', data)
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Marathon has been deleted.",
                                icon: "success"
                            });
                            setMyMarathons(myMarathons.filter(marathon => marathon._id !== _id));
                        }
                    })
            }
        });
    }

    return (
        <div className="container mx-auto px-4 py-10">
            {/* <Helmet>
                <title>
                    Your Marathons | RunFlow
                </title>
            </Helmet> */}
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-bold mb-2">Your Marathons</h2>
                <p className="text-sm md:text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, culpa!
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full bg-base-200 shadow rounded-md text-sm md:text-base">
                    <thead className="bg-base-300">
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Distance</th>
                            <th>Marathon Date</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myMarathons.map(marathon => (
                            <tr key={marathon._id}>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={marathon.photo}
                                                alt="Marathon photo" />
                                        </div>
                                    </div>
                                </td>
                                <td>{marathon.title}</td>
                                <td>{marathon.location}</td>
                                <td>{marathon.distance}</td>
                                <td>{marathon.marathonDate}</td>
                                <td>
                                    <button onClick={() => handleDelete(marathon._id)} className="btn btn-xs md:btn-sm btn-outline btn-error">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyMarathonList;
