import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhatPeopleSay from '../components/WhatPeopleSay';
import CountUp from '../components/CountUp';
import Sponsore from '../components/Sponsore';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <p>WevSection</p>
            <HowItWorks></HowItWorks>
            <WhatPeopleSay></WhatPeopleSay>
            <CountUp></CountUp>
            <Sponsore></Sponsore>
        </div>
    );
};

export default Home;