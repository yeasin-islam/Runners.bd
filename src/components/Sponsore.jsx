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
      <div className='container mx-auto py-12'>
        <h2 className="text-3xl font-bold text-center mb-8">Our Sponsors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 place-items-center">
          {sponsors.map(({ id, name, logo, link }) => (
            <a
              key={id}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-28 h-28  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden border hover:scale-105 transition-transform duration-300 flex items-center justify-center"
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
