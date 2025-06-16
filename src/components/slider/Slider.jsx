import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router';
import { ChevronsDown } from '../shared/ChevronsDown';

export default function App() {
    return (
        <>
            <Swiper navigation={true} modules={[Navigation]} className="fontJakarta mySwiper rounded-lg">
                {/* 1st - Explore */}
                <SwiperSlide className="relative h-[80vh] bg-cover bg-center bg-[url('/assets/Image2.jpg')]">
                    <div className="absolute inset-0 bg-opacity-60"></div>
                    <div className="relative flex justify-center items-center text-center my-28 mx-8 px-8 rounded-3xl bg-base-300/60 transform transition duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="w-full text-center space-y-6 py-9 ">
                            <h5 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                Explore All Marathons in One Place
                            </h5>
                            <p className="text-sm sm:text-base md:text-lg max-w-xl mx-auto">
                                Our platform brings together all marathon events across the country. Get detailed info, browse locations, dates, organizers, and everything you need before joining the race.
                            </p>
                            <Link to="/marathons">
                                <button className="btn text-2xl font-bold px-4 py-6 btn-primary">Get Start</button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>

                {/* 2nd - Add Marathon */}
                <SwiperSlide className="relative h-[80vh] bg-cover bg-center bg-[url('/assets/Image1.jpg')]">
                    <div className="absolute inset-0 bg-opacity-60"></div>
                    <div className="relative flex justify-center items-center text-center my-28 mx-8 px-8 rounded-3xl bg-base-300/60 transform transition duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="w-full text-center space-y-6 py-9">
                            <h5 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                Add Your Own Marathon in Minutes
                            </h5>
                            <p className="text-sm sm:text-base md:text-lg max-w-xl mx-auto">
                                Are you an organizer? Easily list your marathon event through our dashboard. Set the title, date, location, and watch participants roll in.
                            </p>
                            <Link to="/dashboard/add-marathon">
                                <button className="btn text-2xl font-bold px-4 py-6 btn-primary">Add Now</button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>

                {/* 3rd - Apply */}
                <SwiperSlide className="relative h-[80vh] bg-cover bg-center bg-[url('/assets/Image3.jpg')]">
                    <div className="absolute inset-0 bg-opacity-60"></div>
                    <div className="relative flex justify-center items-center text-center my-28 mx-8 px-8 rounded-3xl bg-base-300/60 transform transition duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="w-full text-center space-y-6 py-9">
                            <h5 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                Apply to Join Any Marathon You Love
                            </h5>
                            <p className="text-sm sm:text-base md:text-lg max-w-xl mx-auto">
                                Found your perfect run? Apply with just one click. Track your application, get updates, and prepare for race day stress-free.
                            </p>
                            <Link to="/marathons">
                                <button className="btn text-2xl font-bold px-4 py-6 btn-primary">Apply Now</button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>

                {/* 4th - Dashboard */}
                <SwiperSlide className="relative h-[80vh] bg-cover bg-center bg-[url('/assets/Image7.jpg')]">
                    <div className="absolute inset-0 bg-opacity-60"></div>
                    <div className="relative flex justify-center items-center text-center my-28 mx-8 px-8 rounded-3xl bg-base-300/60 transform transition duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="w-full text-center space-y-6 py-9">
                            <h5 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                All-in-One Dashboard for Marathoners
                            </h5>
                            <p className="text-sm sm:text-base md:text-lg max-w-xl mx-auto">
                                Your personal space to manage everything — add events, track applications, and monitor performance. Smooth, simple, and secure.
                            </p>
                            <Link to="/dashboard/my-marathons">
                                <button className="btn text-2xl font-bold px-4 py-6 btn-primary">Visit Dashboard</button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>

                {/* 5th - Fun Element */}
                <SwiperSlide className="relative h-[80vh] bg-cover bg-center bg-[url('/assets/Image6.jpg')]">
                    <div className="absolute inset-0 bg-opacity-60"></div>
                    <div className="relative flex justify-center items-center text-center my-28 mx-8 px-8 rounded-3xl bg-base-300/60 transform transition duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="w-full text-center space-y-6 py-9">
                            <h5 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                Running is Serious, But Fun Too!
                            </h5>
                            <p className="text-sm sm:text-base md:text-lg max-w-xl mx-auto">
                                From setting records to making memories, marathons are more than races. Join challenges, unlock badges, and enjoy the runner’s life your way.
                            </p>
                            <Link>
                                <button className="btn text-2xl font-bold px-4 py-6 btn-primary">Explore More <ChevronsDown></ChevronsDown></button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
