import { Link, useLoaderData } from 'react-router'
import CountdownTimer from '../components/CountdownTimer';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';

const MarathonDetails = () => {
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
        createdAt,
    } = useLoaderData();

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

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/applications/marathon/${_id}`)
            .then(res => res.json())
            .then(data => setRegistrationCount(data.length))
            .catch(err => console.error("Failed to fetch registration count:", err));
    }, [_id]);

    const today = new Date();
    const isRegistrationOpen =
        new Date(startReg) <= today && today <= new Date(endReg);

    return (
        <div className="popins w-full container mx-auto px-4 sm:px-6 lg:px-8 my-12">
            {/* <Helmet>
                <title>Marathon Details | RunFlow</title>
            </Helmet> */}
            <h2 className="text-3xl font-bold text-center mb-2">Marathon Details</h2>
            <div className="flex flex-col-reverse lg:flex-row justify-center items-center my-8 ">
                {/* Marathon Image */}
                <img
                    src={photo}
                    className="w-full sm:w-3/4 md:w-1/2 lg:w-[50%] mx-auto rounded-lg shadow-lg"
                    alt={title}
                />

                {/* Countdown Timer */}
                <div className="w-full sm:w-3/4 md:w-1/2 lg:w-[40%] mx-auto mb-8 lg:mb-0 text-center">
                    <CountdownTimer marathonStart={marathonDate} />
                    <p className="mt-4 text-lg text-gray-600 font-medium">
                        Time left until the marathon starts
                    </p>
                </div>
            </div>

            <div className="flex flex-col justify-between items-center mb-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{title}</h1>
                <p className="text-lg  mt-4 font-bold"> {description}</p>
            </div>

            <div className="space-y-4 mb-8">

                <p className=""><span className="text-lg font-bold">🏃 Distance:</span> {distance}</p>
                
                <p className=""><span className="text-lg font-bold">📍 Location:</span> {location}</p>
                <p className="">
                    <span className="text-lg font-bold">🟢 Registration Start:</span>
                    <span className="text-blue-600 font-semibold"> {startReg}</span>
                </p>

                <p className="">
                    <span className="text-lg font-bold">🔴 Registration End:</span>
                    <span className="text-red-600 font-semibold"> {endReg}</span>
                </p>

                <p className="">
                    <span className="text-lg font-bold">🏁 Marathon Date:</span>
                    <span className="text-emerald-600 font-semibold"> {marathonDate}</span>
                </p>
                <p className="">
                    <span className="text-lg font-bold">🗓️ Created At:</span>
                    <span className="text-gray-600 font-semibold"> {createdAt}</span>
                </p>
                <p className=""><span className="text-lg font-bold">👤 Created By:</span> {creatBy}</p>
                <p className=""><span className="text-lg font-bold">🧑‍🤝‍🧑 Total Registration:</span> {registrationCount}</p>
            </div>

            <div className="card-actions justify-end">
                {!isRegistrationOpen ? (
                    <button className="btn btn-disabled" disabled>
                        Registration Closed
                    </button>
                ) : creatBy === currentUserEmail ? (
                    <button className="btn btn-disabled" disabled>
                        You Created This Marathon
                    </button>
                ) : (
                    <Link to={`/marathon-registration/${_id}`}>
                        <button className="btn btn-primary">Register Now</button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default MarathonDetails