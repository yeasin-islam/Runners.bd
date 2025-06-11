import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhatPeopleSay from '../components/WhatPeopleSay';
import CounteUp from '../components/CounteUp';
import Sponsore from '../components/Sponsore';
import UpcomingMarathons from '../components/UpcomingMarathons';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <p>WevSection</p>
            <UpcomingMarathons></UpcomingMarathons>
            <HowItWorks></HowItWorks>
            <WhatPeopleSay></WhatPeopleSay>
            <CounteUp></CounteUp>
            <Sponsore></Sponsore>
        </div>
    );
};

export default Home;