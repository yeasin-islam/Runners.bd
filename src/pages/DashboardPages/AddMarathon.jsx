import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '/src/firebase.config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
// import { Helmet } from 'react-helmet-async';

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
            creatBy: user.email,
            createdAt : new Date().toISOString().split('T')[0],
            totalRegistration: 0
        };
        // console.log('Form Submission:', addMarathonPost);

        axios.post(`${import.meta.env.VITE_API_URL}/marathons`,addMarathonPost)
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
        <section className='container mx-auto px-4 my-8'>
            {/* <Helmet>
                <title>
                    Add Marathon | RunFlow
                </title>
            </Helmet> */}
            <div className="flex flex-col rounded-xl shadow-lg justify-center bg-base-300 items-center pb-10">
                <div className='text-center w-full max-w-2xl mt-6 px-4'>
                    <h2 className="text-3xl md:text-4xl font-bold my-4">Add Your Marathon</h2>
                    <p className=" mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, eum.</p>
                </div>

                <form onSubmit={handleAddMarathon} className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-10 w-full max-w-5xl">

                    <div>
                        <legend className="fieldset-legend mb-1">Matarhon Title</legend>
                        <input type="text" name="title" className="input input-bordered w-full" required />
                    </div>

                    <div>
                        <legend className="fieldset-legend mb-1">Location</legend>
                        <input type="text" name="location" className="input input-bordered w-full" placeholder="Add Location" required />
                    </div>

                    <div>
                        <legend className="fieldset-legend mb-1">Distance</legend>
                        <select name="distance" defaultValue="Select a Distance" className="select w-full">
                            <option disabled>Select Distance</option>
                            <option>3K</option>
                            <option>10K</option>
                            <option>25K</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <legend className="fieldset-legend mb-1">Description</legend>
                        <textarea name="description" className="textarea h-24 w-full" placeholder="Type a short Description" required></textarea>
                    </div>

                    <div>
                        <legend className="fieldset-legend mb-1">Image</legend>
                        <input type="text" name="photo" className="input input-bordered w-full" placeholder="Add a photo URL" required />
                    </div>

                    <div>
                        <legend className="fieldset-legend mb-1">Start Registration Date</legend>
                        <DatePicker name="startReg" selected={startReg} onChange={(date) => setStartReg(date)} className="input input-bordered w-full" required />
                    </div>
                    <div>
                        <legend className="fieldset-legend mb-1">Start Registration Date</legend>
                        <DatePicker name="endReg" selected={endReg} onChange={(date) => setEndReg(date)} className="input input-bordered w-full" required />
                    </div>
                    <div>
                        <legend className="fieldset-legend mb-1">Start Registration Date</legend>
                        <DatePicker name="marathonDate" selected={marathonDate} onChange={(date) => setMarathonDate(date)} className="input input-bordered w-full" required />
                    </div>
                    <button type="submit" className="btn md:col-span-2 btn-neutral mt-6 px-6">
                        Add Your Marathon
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddMarathon;
