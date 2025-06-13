import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import DatePicker from 'react-datepicker';
import LoadingFallback from '../components/shared/LoadingFallback';

const MarathonRegistration = () => {
    const { id: marathonId } = useParams();
    const { user } = useAuth();
    const [marathon, setMarathon] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (marathonId) {
            axios.get(`${import.meta.env.VITE_API_URL}/marathons/${marathonId}`)
                .then(res => {
                    setMarathon(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [marathonId]);

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
        <section className='container mx-auto px-4 my-8'>
            <div className="flex flex-col rounded-xl shadow-lg justify-center bg-base-300 items-center pb-10">
                <p className="text-3xl md:text-4xl font-bold text-center m-8">
                    Registration for: {marathon.title} <br />
                    <Link to={`/marathon-details/${marathonId}`} className="underline text-red-500 text-lg">View Details</Link>
                </p>

                <form onSubmit={handleApplyForm} className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-10 w-full max-w-5xl">
                    <div>
                        <label className="fieldset-legend mb-1">Name</label>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <input type="text" name='firstName' className="input w-full" placeholder="Type Your First Name" required />
                            <input type="text" name='lastName' className="input w-full" placeholder="Type Your Last Name" required />
                        </div>

                    </div>

                    <div>
                        <label className="fieldset-legend mb-1">Your Location</label>
                        <input type="text" name='yourLocation' className="input w-full" placeholder="Type Your Location" required />
                    </div>
                    <div>
                        <legend className="fieldset-legend mb-1">Contact Number</legend>
                        <input type="text" name="contactnumber" className="input input-bordered w-full" placeholder="Add Your Contact Number" required />
                    </div>
                    <div>
                        <label className="fieldset-legend mb-1">Your Email</label>
                        <input type="email" name='email' className="input w-full" value={user.email} readOnly placeholder="Enter Your Email" required />
                    </div>
                    <div>
                        <label className="fieldset-legend mb-1">Marathon Title</label>
                        <input type="text" name="title" value={marathon.title} readOnly className="input w-full" />
                    </div>


                    <div className="w-full">
                        <label className="fieldset-legend mb-1">Marathon Date</label>
                        <DatePicker
                            name="marathonDate"
                            selected={new Date(marathon.marathonDate)}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>

                    <button type="submit" className="btn btn-neutral md:col-span-2 mt-4">Submit</button>
                </form>
            </div>
        </section>
    );
};

export default MarathonRegistration;
