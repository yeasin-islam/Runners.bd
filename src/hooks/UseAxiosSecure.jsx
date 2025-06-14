import React from 'react';
import useAuth from './useAuth';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`
})

const UseAxiosSecure = () => {

    const { user, signOutUser } = useAuth();

    axiosInstance.interceptors.request.use(config => {
        config.headers.authorization = `Bearer ${user.accessToken}`
        return config;
    })
    axiosInstance.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.status === 401 || error.status === 401) {
            signOutUser()
                .then(() => {
                    console.log("signOutUser for 401 or 403 status code")
                })
                .catch(err => {
                    console.log(err)
                })
        }
        return Promise.reject(error)
    })

    return axiosInstance;
};

export default UseAxiosSecure;