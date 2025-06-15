import React, { useState } from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhatPeopleSay from '../components/WhatPeopleSay';
import CounteUp from '../components/CounteUp';
import Sponsore from '../components/Sponsore';
import UpcomingMarathons from '../components/UpcomingMarathons';
import MarathonsSection from '../components/MarathonsSection';
import { useLoaderData } from 'react-router';
import { Helmet } from 'react-helmet-async';

const Home = () => {

    const marathonPostsData = useLoaderData();
    const [marathonPosts] = useState(marathonPostsData);

    return (
        <>
            <Helmet>
                <title>
                    Home | RunFlow
                </title>
            </Helmet>
            <div>
                <Hero></Hero>
                <MarathonsSection marathonPosts={marathonPosts}></MarathonsSection>
                <UpcomingMarathons></UpcomingMarathons>
                <HowItWorks></HowItWorks>
                <WhatPeopleSay></WhatPeopleSay>
                <CounteUp></CounteUp>
                <Sponsore></Sponsore>
            </div>
        </>

    );
};

export default Home;