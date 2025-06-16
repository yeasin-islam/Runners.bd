import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import DatePicker from 'react-datepicker';
import LoadingFallback from '../components/shared/LoadingFallback';
import { Helmet } from 'react-helmet-async';
import UseAxiosSecure from '../hooks/UseAxiosSecure';

const MarathonRegistration = () => {
    const { id: marathonId } = useParams();
    const { user } = useAuth();
    const [marathon, setMarathon] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();


    useEffect(() => {
        if (marathonId) {
            axiosSecure.get(`/marathons/${marathonId}`)
                .then(res => {
                    setMarathon(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch marathon details:", err);
                    setLoading(false);
                });
        }
    }, [marathonId, axiosSecure]);

    const handleApplyForm = e => {
        e.preventDefault();
        const form = e.target;

        const registration = {
            marathonId,
            marathonTitle: form.title.value,
            marathonDate: form.marathonDate.value,
            applicantEmail: user.email,
            applicantFirstName: form.firstName.value,
            applicantLastName: form.lastName.value,
            applicantContactNumber: form.contactnumber.value,
            applicantLocation: form.yourLocation.value,
            applicantResponse: form.response.value,
        };

        axios.post(`${import.meta.env.VITE_API_URL}/registrations`, registration)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration submitted successfully!',
                        timer: 1500,
                        showConfirmButton: false
                    }).then(() => {
                        // form.reset();
                        navigate('/dashboard/my-applications');
                    })
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    if (loading) {
        return <LoadingFallback />;
    }

    return (
        <section className='container px-4 mx-auto my-8'>
            <Helmet>
                <title>
                    Apply Marathon | RunFlow
                </title>
            </Helmet>
            <div className="flex flex-col items-center justify-center pb-10 shadow-lg rounded-xl bg-base-300 border border-primary">
                <p className="m-12 text-center ">
                    <h3 className='mb-2 text-3xl font-bold md:text-4xl lg:text-5xl underline'>Registration for:</h3>
                    <p className='text-primary pt-2 text-3xl font-bold md:text-4xl '>{marathon.title}</p>
                    <p className=''>
                        <Link to={`/marathon-details/${marathonId}`} className="text-lg text-red-500 underline">View Details</Link>
                    </p>
                </p>

                <form onSubmit={handleApplyForm} className="grid w-full max-w-5xl grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-10">
                    <div>
                        <label className="mb-1 fieldset-legend">Name</label>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <input type="text" name='firstName' className="w-full input" placeholder="Type Your First Name" required />
                            <input type="text" name='lastName' className="w-full input" placeholder="Type Your Last Name" required />
                        </div>

                    </div>

                    <div>
                        <label className="mb-1 fieldset-legend">Your Location</label>
                        <input type="text" name='yourLocation' className="w-full input" placeholder="Type Your Location" required />
                    </div>
                    <div>
                        <legend className="mb-1 fieldset-legend">Contact Number</legend>
                        <input type="text" name="contactnumber" className="w-full input input-bordered" placeholder="Add Your Contact Number" required />
                    </div>
                    <div>
                        <label className="mb-1 fieldset-legend">Your Email</label>
                        <input type="email" name='email' className="w-full input" value={user.email} readOnly placeholder="Enter Your Email" required />
                    </div>
                    <div>
                        <label className="mb-1 fieldset-legend">Marathon Title</label>
                        <input type="text" name="title" value={marathon.title} readOnly className="w-full input" />
                    </div>


                    <div className="w-full">
                        <label className="mb-1 fieldset-legend">Marathon Date</label>
                        <DatePicker
                            name="marathonDate"
                            selected={new Date(marathon.marathonDate)}
                            readOnly
                            className="w-full input input-bordered"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <legend className="mb-1 fieldset-legend">We would like to hear if you want to mention anything else.</legend>
                        <textarea name="response" className="w-full h-24 textarea" placeholder="Type here..."></textarea>
                    </div>

                    <button type="submit" className="mt-4 btn btn-neutral md:col-span-2">Submit</button>
                </form>
            </div>
        </section>
    );
};

export default MarathonRegistration;
