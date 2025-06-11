import React from "react";
import CountUp from "react-countup";

const CounteUp = () => {
  return (
    <section className="bg-base-100">
      <div className="container mx-auto fontStyle text-center my-20">
        <h1 className="text-5xl font-bold">Empowering Every Stride</h1>
        <p className="text-xl font-normal p-6 max-w-3xl mx-auto">
          From registrations to finish lines — we’re tracking progress across the country’s most exciting marathon events.
        </p>

        {/* Counter Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 card mx-4 lg:mx-0 ">
          <div className="card border-none bg-base-300 rounded-md p-8 text-left space-y-6 shadow-md">
            <div className="w-20">
              <img src="/assets/marathons.png" alt="Total Marathons" className="w-20 h-20 rounded-full ring-offset-base-100 ring-offset-2 overflow-hidden"/>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold flex items-center">
                <CountUp start={0} end={120} duration={4} />
                <span className="ml-1">+</span>
              </div>
              <p className="text-xl text-gray-600">Total Marathons</p>
            </div>
          </div>

          <div className="card border-none bg-base-300 rounded-md p-8 text-left space-y-6 shadow-md">
            <div className="w-20">
              <img src="/assets/participants.png" alt="Participants" className="w-20 h-20 rounded-full ring-offset-base-100 ring-offset-2 overflow-hidden"/>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold flex items-center">
                <CountUp start={0} end={6500} duration={4} />
                <span className="ml-1">+</span>
              </div>
              <p className="text-xl text-gray-600">Active Participants</p>
            </div>
          </div>

          <div className="card border-none bg-base-300 rounded-md p-8 text-left space-y-6 shadow-md">
            <div className="w-20">
              <img src="/assets/registrations.png" alt="Registrations" className="w-20 h-20 rounded-full ring-offset-base-100 ring-offset-2 overflow-hidden"/>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold flex items-center">
                <CountUp start={0} end={8000} duration={4} />
                <span className="ml-1">+</span>
              </div>
              <p className="text-xl text-gray-600">Total Registrations</p>
            </div>
          </div>

          <div className="card border-none bg-base-300 rounded-md p-8 text-left space-y-6 shadow-md">
            <div className="w-20">
              <img src="/assets/cities.png" alt="Cities" className="w-20 h-20 rounded-full ring-offset-base-100 ring-offset-2 overflow-hidden"/>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold flex items-center">
                <CountUp start={0} end={30} duration={4} />
                <span className="ml-1">+</span>
              </div>
              <p className="text-xl text-gray-600">Cities Covered</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default CounteUp;
