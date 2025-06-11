import React from 'react';
import { FaMapMarkedAlt, FaClipboardList, FaChartLine, FaRunning } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: 'Browse Upcoming Marathons',
            description:
                'Explore events across Bangladesh. Check dates, locations, distances, and registration timelines — all in one place.',
            icon: <FaMapMarkedAlt className="text-4xl text-primary" />,
        },
        {
            id: 2,
            title: 'Register with a Click',
            description:
                'Pick your race, log in, and register instantly. Get confirmation and all the event info right away.',
            icon: <FaClipboardList className="text-4xl text-primary" />,
        },
        {
            id: 3,
            title: 'Track Your Participation',
            description:
                'From your dashboard, manage events, view schedules, and stay updated with notifications and reminders.',
            icon: <FaChartLine className="text-4xl text-primary" />,
        },
        {
            id: 4,
            title: 'Run & Achieve',
            description:
                'Join your selected marathon, enjoy the community, and achieve your personal best on race day.',
            icon: <FaRunning className="text-4xl text-primary" />,
        },
    ];

    return (
        <section className="bg-base-100">
            <div className='py-12 container mx-auto'>
                <h2 className="text-4xl font-bold text-center mb-12">
                    How It Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 card mx-4 lg:mx-0 ">
                    {steps.map(step => (
                        <div
                            key={step.id}
                            className="text-center p-6 border border-base-200 bg-base-300 rounded-xl shadow-md hover:shadow-lg transition"
                        >
                            <div className="mb-4 flex justify-center">{step.icon}</div>
                            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                            <hr />
                            <p className="text-sm mt-3">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
