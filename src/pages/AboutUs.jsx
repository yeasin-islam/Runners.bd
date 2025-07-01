import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const coreTeam = [
  {
    name: "Ayesha Rahman",
    role: "Community Manager",
    img: "/assets/team1.jpg",
    bio: "Connects runners and organizers across the country. Believes in the power of storytelling and shared journeys.",
  },
  {
    name: "Tariq Hasan",
    role: "UX/UI Designer",
    img: "/assets/team2.jpg",
    bio: "Designs seamless experiences with a runner-first mindset. Every pixel has purpose.",
  },
  {
    name: "Nusrat Jahan",
    role: "Operations Lead",
    img: "/assets/team3.jpg",
    bio: "Handles event logistics and platform efficiency with absolute precision and passion.",
  },
];

const AboutUs = () => {
  return (
    <section className="pop bg-base-100 py-12 px-4 min-h-screen">
      <Helmet>
        <title>About Us | Runners.bd</title>
      </Helmet>

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold pb-4 border-b">
            About Us
          </h1>
          <p className="max-w-3xl mx-auto ">
            Runners.bd is more than just a platform - we’re a movement. Built by passionate runners and tech enthusiasts, our mission is to unite Bangladesh’s running community through technology, stories, and unforgettable events.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4" data-aos="fade-right">
            <h2 className="text-xl font-semibold text-primary">🏃 Our Mission</h2>
            <p className="">
              To make marathon discovery, registration, and participation simple, inspiring, and accessible for everyone - from first-timers to seasoned athletes.
            </p>
          </div>
          <div className="space-y-4" data-aos="fade-left">
            <h2 className="text-xl font-semibold text-primary">🌍 Our Vision</h2>
            <p className="">
              A Bangladesh where every city celebrates health, connection, and community through running. We aim to create the country’s largest and most active network of runners.
            </p>
          </div>
          <div className="space-y-4" data-aos="fade-right">
            <h2 className="text-xl font-semibold text-primary">🤝 Community First</h2>
            <p className="">
              Whether you’re running your first 5K or organizing your 10th event, Runners.bd is here to support you. Our tools, features, and events are designed with you in mind.
            </p>
          </div>
          <div className="space-y-4" data-aos="fade-left">
            <h2 className="text-xl font-semibold text-primary">💡 Built with Passion</h2>
            <p className="">
              This platform is handcrafted by a team of runners, designers, and developers who believe in the power of movement. Every feature is built to make your experience easier and more enjoyable.
            </p>
          </div>
        </div>

        {/* Founder Section */}
        <div
          className="bg-base-300 border border-primary rounded-xl p-8 shadow-md flex flex-col items-center gap-10 max-w-2xl mx-auto"
          data-aos="zoom-in"
        >
          <img
            src="/assets/founder.jpg"
            alt="Yeasin Islam"
            className="w-40 h-40 rounded-full ring ring-primary ring-offset-2 object-cover"
          />
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold text-primary">Yeasin Islam</h3>
            <p className="text-sm italic">Founder & Full Stack Developer</p>
            <p className="">
              I'm Yeasin, a developer who believes in solving real-world problems with practical solutions. With a love for clean code and creative ideas, I built Runners.bd to connect people through fitness and community events. My journey started from writing frontend apps to now building full-stack solutions that impact lives.
            </p>
            <div className="flex justify-center gap-4 pt-2 text-3xl text-primary">
              <a href="https://www.linkedin.com/in/yeasin-islam75" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://github.com/yeasin-islam" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://yeasinislam08.web.app" target="_blank" rel="noopener noreferrer"><FaGlobe /></a>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-6 pt-6">
          <h2 className="text-3xl font-bold text-center text-primary" data-aos="fade-up">Our Core Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {coreTeam.map((member, i) => (
              <div
                key={i}
                className="rounded-xl bg-base-300 shadow-md p-6 border border-secondary text-center"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover ring ring-primary ring-offset-2 mb-4"
                />
                <h4 className="text-xl text-secondary font-semibold">{member.name}</h4>
                <p className="text-sm  mb-2">{member.role}</p>
                <p className="text-sm ">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Line */}
        <div className="text-center pt-10 border-t border-gray-300 text-sm text-gray-500">
          Runners.bd - Run Together, Rise Together.
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
