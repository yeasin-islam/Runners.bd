import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import axios from 'axios';

const AddReview = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [photo, setPhoto] = useState('');
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(0);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Detect login
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire({
                title: 'Login Required',
                text: 'You need to be logged in to submit a review.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Login Now',
                cancelButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }

        const email = user.email;
        const newReview = { name, location, photo, message, rating, email };
        // console.log("Review Submitted:", newReview);

        axios.post(`${import.meta.env.VITE_API_URL}/reviews`, newReview)
            .then(res => {
                if (res.data.insertedId) {
                    // console.log(data)
                    Swal.fire({
                        icon: "success",
                        title: "Thank you!",
                        text: 'Your review has been submitted.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(error => {
                // console.log(error);
            })

        // Reset form
        setName('');
        setLocation('');
        setPhoto('');
        setMessage('');
        setRating(0);
    };

    return (
        <section className="py-12 bg-base-100 popins" data-aos="fade-up">
            <div className="fontJakarta container mx-auto px-4 max-w-xl text-center ">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-aos="fade-up" data-aos-delay="100">Share Your Experience</h2>
                <p className="mb-8" data-aos="fade-up" data-aos-delay="200">We'd love to hear your feedback!</p>

                <form onSubmit={handleSubmit} className="bg-base-300 p-6 rounded-xl shadow-md space-y-4 border border-primary" data-aos="zoom-in"
                    data-aos-delay="300">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        required
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Your Location"
                        required
                        className="input input-bordered w-full"
                    />

                    <input
                        type="url"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        placeholder="Profile Photo URL"
                        required
                        className="input input-bordered w-full"

                    />

                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your Review"
                        required
                        rows={4}
                        className="textarea textarea-bordered w-full"
                    ></textarea>

                    <div className="flex items-center justify-center gap-2">
                        <span className="text-sm font-medium">Your Rating:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                onClick={() => setRating(star)}
                                className={`cursor-pointer text-xl ${rating >= star ? 'text-yellow-500' : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddReview;
