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
      <div className='fontJakarta text-center bg-base-200</>'>
        <Helmet>
          <title>
            Error | RunFlow
          </title>
        </Helmet>
        <h1 className='flex justify-center mb-5 font-thin text-7xl'>
          <Lottie style={{ width: '400px' }} animationData={LottieAnimation} loop={true} />
        </h1>
        <p className='mb-3 text-2xl font-bold md:text-4xl lg:text-5xl max-w-4xl text-center mx-auto'>
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
