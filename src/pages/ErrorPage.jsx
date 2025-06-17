import React from 'react'
import { Link, useRouteError } from 'react-router'
import Button from '../components/shared/Button'
import { Helmet } from 'react-helmet-async'
import Lottie from 'lottie-react'
import LottieAnimation from "../assets/lotties/404LottieAnimation";

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <>
      <div className='fontJakarta py-6 text-center bg-base-200</>'>
        <Helmet>
          <title>
            Error | Runners.bd
          </title>
        </Helmet>
        <h1 className='my-5 text-7xl font-thin flex justify-center'>
          <Lottie style={{ width: '500px' }} animationData={LottieAnimation} loop={true} />
        </h1>
        <p className='mb-12 text-2xl font-bold md:text-4xl lg:text-5xl max-w-4xl text-center mx-auto'>
          {error?.error?.message || 'Something Went Wrong!'}
        </p>
        <Link to='/'>
          <Button label='Go To Homepage' />
        </Link>
      </div>
    </>
  )
}

export default ErrorPage
