import { useEffect, useState } from 'react';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetch('/sponsors.json')
      .then(res => res.json())
      .then(data => setSponsors(data));
  }, []);

  return (
    <section className=" bg-base-100">
      <div className='fontJakarta container mx-auto py-12 mb-4'>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2">Our Sponsors</h2>
        <p className="max-w-2xl mx-auto mb-8 text-center">We’re proudly supported by amazing sponsors who help us make every marathon unforgettable. Thanks to their contributions, we go the extra mile!</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 place-items-center">
          {sponsors.map(({ id, name, logo, link }) => (
            <a
              key={id}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-28 h-28  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden border hover:scale-105 hover:shadow-xl transition-transform duration-300 flex items-center justify-center"
            >
              <img
                src={logo}
                alt={name}
                className="object-cover w-full h-full"
              />
            </a>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Sponsors;
