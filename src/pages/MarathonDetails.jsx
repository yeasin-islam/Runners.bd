import { Link, useLoaderData } from 'react-router'
import CountdownTimer from '../components/CountdownTimer';

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
        totalRegistration
    } = useLoaderData();

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

                <p className=""><span className="text-lg font-bold">Distance:</span> {distance}</p>
                <p className=""><span className="text-lg font-bold">Registration Start:</span> {startReg}</p>
                <p className=""><span className="text-lg font-bold">Registration End:</span> {endReg}</p>
                <p className=""><span className="text-lg font-bold">Marathon Date:</span> {marathonDate}</p>
                <p className=""><span className="text-lg font-bold">Location:</span> {location}</p>
                <p className=""><span className="text-lg font-bold">Created At:</span> {createdAt}</p>
                <p className=" "><span className="text-lg font-bold">Creat By:</span> {creatBy}</p>
                <p className=" "><span className="text-lg font-bold">Total Registration:</span> {totalRegistration}</p>

            </div>

            <div className="card-actions justify-end">
                {isRegistrationOpen ? (
                    <Link to={`/marathon-registration/${_id}`}>
                        <button className="btn btn-primary">Registration Now</button>
                    </Link>
                ) : (
                    <button className="btn btn-disabled" disabled>
                        Registration Closed
                    </button>
                )}
            </div>
        </div>
    )
}

export default MarathonDetails