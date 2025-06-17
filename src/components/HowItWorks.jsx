import React from 'react';
import { FaChartLine, FaRunning, FaPlus, FaClipboardList } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: 'All Marathons',
            description:
                'Explore events across Bangladesh. Check dates, locations, distances, and registration timelines — all in one place.',
            icon: <FaRunning className="text-4xl text-primary" />,
        },

        {
            id: 2,
            title: 'Add Your Marathon',
            description:
               'Add your marathon effortlessly with all the details — distance, location, date, and more. Share it with thousands of runners today!',
            icon: <FaPlus className="text-4xl text-primary" />,
        },
        {
            id: 3,
            title: 'Register with a Click',
            description:
                'Pick your race, log in, and register instantly. Get confirmation and all the event info right away.',
            icon: <FaClipboardList className="text-4xl text-primary" />,
        },
        {
            id: 4,
            title: 'Track Your Participation',
            description:
                'From your dashboard, manage events, view schedules, and stay updated with notifications and reminders.',
            icon: <FaChartLine className="text-4xl text-primary" />,
        }
    ];

    return (
        <section className="bg-base-100">
            <div className='fontJakarta py-12 container mx-auto'>
                <h2 className="poppins text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">How It <span className="text-success">Works</span>
                </h2>
                <p className="max-w-2xl mx-auto mb-8 text-center">Easily discover, explore, and register for marathons in just a few clicks - your running journey starts here!</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 card mx-4 lg:mx-0 ">
                    {steps.map(step => (
                        <div
                            key={step.id}
                            className="text-center p-6 bg-base-300 rounded-xl shadow-md transition transform duration-300 hover:scale-105 hover:shadow-xl border border-secondery"
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
