import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '/src/firebase.config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const AddMarathon = () => {
    const [user, setUser] = useState({ email: '', displayName: '' });
    const [startReg, setStartReg] = useState(null);
    const [endReg, setEndReg] = useState(null);
    const [marathonDate, setMarathonDate] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    email: currentUser.email || '',
                    displayName: currentUser.displayName || '',
                });
            }
        });

        return () => unsubscribe();
    }, []);

    const navigate = useNavigate();

    const handleAddMarathon = async (e) => {
        e.preventDefault();

        const form = e.target;
        // const formData = new FormData(form)
        // const data = Object.fromEntries(formData.entries())

        const addMarathonPost = {
            title: form.title.value,
            location: form.location.value,
            distance: form.distance.value,
            startReg: form.startReg.value,
            endReg: form.endReg.value,
            marathonDate: form.marathonDate.value,
            description: form.description.value,
            photo: form.photo.value,
            creatorName: user.displayName,
            creatBy: user.email,
            createdAt: new Date().toISOString().split('T')[0],
        };
        // console.log('Form Submission:', addMarathonPost);

        axios.post(`${import.meta.env.VITE_API_URL}/marathons`, addMarathonPost)
            .then(res => {
                if (res.data.insertedId) {
                    // console.log(data)
                    Swal.fire({
                        title: 'Marathon Added!',
                        text: 'Your Marathon Post has been submitted successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        // form.reset();
                        navigate('/dashboard/my-marathons');
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    };


    return (
        <section className='container px-4 mx-auto my-8'>
            <Helmet>
                <title>
                    Add Marathon | RunFlow
                </title>
            </Helmet>
            <div className="flex flex-col items-center justify-center pb-10 shadow-lg rounded-xl bg-base-300 border border-primary ">
                <div className='w-full max-w-2xl px-4 mt-6 text-center'>
                    <h2 className="my-4 text-3xl font-bold md:text-4xl">Add Your Marathon</h2>
                    <p className="mb-6 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, eum.</p>
                </div>

                <form onSubmit={handleAddMarathon} className="grid w-full max-w-5xl grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-10 ">

                    <div>
                        <legend className="mb-1 fieldset-legend">Matarhon Title</legend>
                        <input type="text" name="title" className="w-full input input-bordered" placeholder="Add Your Marathon Title" required />
                    </div>

                    <div>
                        <legend className="mb-1 fieldset-legend">Location</legend>
                        <input type="text" name="location" className="w-full input input-bordered" placeholder="Add Location" required />
                    </div>

                    <div>
                        <legend className="mb-1 fieldset-legend">Distance</legend>
                        <select name="distance" defaultValue="Select a Distance" className="select w-full">
                            <option disabled>Select a Distance</option>
                            <option>3K</option>
                            <option>5K</option>
                            <option>8K</option>
                            <option>10K</option>
                            <option>15K</option>
                            <option>20K</option>
                            <option>25K</option>
                        </select>
                    </div>

                    <div>
                        <legend className="mb-1 fieldset-legend">Image</legend>
                        <input type="url" name="photo" className="w-full input input-bordered" placeholder="Add a photo URL" required />
                    </div>

                    <div className="md:col-span-2">
                        <legend className="mb-1 fieldset-legend">Description</legend>
                        <textarea name="description" className="w-full h-24 textarea" placeholder="Type a short Description" required></textarea>
                    </div>

                    <div className='md:col-span-2 md:flex justify-between'>
                        <div>
                            <legend className="mb-1 fieldset-legend">Start Registration</legend>
                            <DatePicker name="startReg" selected={startReg} onChange={(date) => setStartReg(date)} className="w-full input input-bordered" required />
                        </div>
                        <div>
                            <legend className="mb-1 fieldset-legend">End Registration</legend>
                            <DatePicker name="endReg" selected={endReg} onChange={(date) => setEndReg(date)} className="w-full input input-bordered" required />
                        </div>
                        <div>
                            <legend className="mb-1 fieldset-legend">Marathon Date</legend>
                            <DatePicker name="marathonDate" selected={marathonDate} onChange={(date) => setMarathonDate(date)} className="w-full input input-bordered" required />
                        </div>
                    </div>
                    <button type="submit" className="px-6 mt-6 btn md:col-span-2 btn-neutral">
                        Add Your Marathon
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddMarathon;
