import { Link, useParams } from 'react-router';
import CountdownTimer from '../components/CountdownTimer';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';
import { Helmet } from 'react-helmet-async';
import UseAxiosSecure from '../hooks/UseAxiosSecure';
import { Tooltip } from 'react-tooltip';

const MarathonDetails = () => {
    const { id } = useParams();
    const axiosSecure = UseAxiosSecure();
    const PLACES = ['top-end']

    const [marathon, setMarathon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registrationCount, setRegistrationCount] = useState(0);
    const [currentUserEmail, setCurrentUserEmail] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUserEmail(user.email);
            }
        });

        return () => unsubscribe();
    }, []);

    // 🔒 Fetch marathon details securely with JWT
    useEffect(() => {
        if (id) {
            axiosSecure.get(`/marathons/${id}`)
                .then(res => {
                    setMarathon(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch marathon:", err);
                    setLoading(false);
                });
        }
    }, [id, axiosSecure]);

    // 🔒 Fetch total registrations securely
    useEffect(() => {
        if (id) {
            axiosSecure.get(`/applications/marathon/${id}`)
                .then(res => setRegistrationCount(res.data.length))
                .catch(err => console.error("Failed to fetch registration count:", err));
        }
    }, [id, axiosSecure]);

    if (loading || !marathon) {
        return <div className="py-20 text-center">Loading...</div>;
    }

    const {
        _id,
        photo,
        title,
        location,
        description,
        distance,
        startReg,
        endReg,
        marathonDate,
        creatBy,
        creatorName,
        createdAt,
    } = marathon;

    const today = new Date();
    const endRegPlusOneDay = new Date(endReg);
    endRegPlusOneDay.setDate(endRegPlusOneDay.getDate() + 1);

    const isStartRegistration = new Date(startReg) <= today;
    const isEndRegistration = today > new Date(endReg);

    return (
        <section className='fontJakarta container px-4 mx-auto my-8'>
            <Helmet>
                <title>Marathon Details | Runners.bd</title>
            </Helmet>
            <div className='container mx-auto'>
                <div className=" px-4 my-8 popins sm:px-6 lg:px-8 bg-base-300 p-10 rounded-md shadow-md border border-primary">
                    <h2 className="pb-2 text-3xl font-bold text-center md:text-4xl lg:text-5xl underline">Marathon Details</h2>
                    <div className="flex flex-col-reverse items-center justify-center my-8 lg:flex-row ">
                        {/* Marathon Image */}
                        <img
                            src={photo}
                            className="w-full sm:w-3/4 md:w-1/2 lg:w-[50%] mx-auto rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
                            alt={title}
                        />

                        {/* Countdown Timer */}
                        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-[40%] mx-auto mb-8 lg:mb-0 text-center">
                            <CountdownTimer marathonStart={marathonDate} />
                            <p className="mt-4 text-lg font-medium text-gray-600">
                                Time left until the marathon starts
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-center sm:text-4xl lg:text-5xl">{title}</h1>
                        <p className="mt-4 text-lg font-bold"> {description}</p>
                    </div>

                    <div className="mb-8 space-y-4 md:pl-10 ">

                        <p className=""><span className="text-lg font-bold">🏃 Distance:</span> {distance}</p>

                        <p className=""><span className="text-lg font-bold">📍 Location:</span> {location}</p>
                        <p className="">
                            <span className="text-lg font-bold">🟢 Registration Start:</span>
                            <span className="font-semibold text-blue-600"> {startReg}</span>
                        </p>

                        <p className="">
                            <span className="text-lg font-bold">🔴 Registration End:</span>
                            <span className="font-semibold text-red-600"> {endReg}</span>
                        </p>

                        <p className="">
                            <span className="text-lg font-bold">🏁 Marathon Date:</span>
                            <span className="font-semibold text-emerald-600"> {marathonDate}</span>
                        </p>
                        <p className="">
                            <span className="text-lg font-bold">🗓️ Created At:</span>
                            <span className="font-semibold text-gray-600"> {createdAt}</span>
                        </p>
                        <p className=""><span className="text-lg font-bold">👤 Created By:</span> <span className='font-bold text-md'>{creatorName}</span> ({creatBy})</p>
                        <p className=""><span className="text-lg font-bold">🧑‍🤝‍🧑 Total Registration:</span> {registrationCount}</p>
                    </div>

                    <div className="justify-end card-actions">
                        {!isStartRegistration ? (
                            <button className="btn btn-disabled" disabled>
                                Wait for Registration to Start
                            </button>
                        ) : isEndRegistration ? (
                            <button className="btn btn-disabled" disabled>
                                Registration Ended
                            </button>
                        ) : creatBy === currentUserEmail ? (
                            <button className="btn btn-disabled" disabled>
                                You Created This Marathon
                            </button>
                        ) : (
                            <Link to={`/marathon-registration/${_id}`}>
                                <button id="clickable" className="btn btn-primary">Register Now</button>
                                {PLACES.map(place => (
                                    <Tooltip key={place} anchorSelect="#clickable" place={place} clickable delayShow={500}
                                        delayHide={300} >
                                        <button>Click me to go to registration page</button>
                                    </Tooltip>
                                ))}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>


    )
}

export default MarathonDetails