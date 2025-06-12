import React, { Suspense } from 'react';
import ApplicationList from '../../components/ApplicationList';
import useAuth from '../../hooks/useAuth';
import LoadingFallback from '../../components/shared/LoadingFallback';
// import { myApplicationPromise } from '../api/applicationsApi';

const myApplicationPromise = email => {
    return fetch(`${import.meta.env.VITE_API_URL}/registrations?email=${email}`).then(res => res.json())
}

const MyApplyList = () => {

    const { user } = useAuth();
    const loading =
        <>
            <LoadingFallback />
        </>

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold">My Applications</h2>
            </div>
            <Suspense fallback={loading}>
                <ApplicationList myApplicationPromise={myApplicationPromise(user?.email)}></ApplicationList>
            </Suspense>
        </div>
    );
};

export default MyApplyList;