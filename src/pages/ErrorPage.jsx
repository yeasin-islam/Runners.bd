import React from 'react'
import { Link, useRouteError } from 'react-router'
import Button from '../components/shared/Button'
// import { Helmet } from 'react-helmet-async'

const ErrorPage = () => {
  const error = useRouteError()

  return (
    <>
      <div className='popins py-24 text-center bg-base-200</>'>
        {/* <Helmet>
          <title>
            Error | RunFlow
          </title>
        </Helmet> */}
        <h1 className='my-5 text-7xl font-thin flex justify-center'>
          <img className='w-2/5' src="/assets/404Page.png" alt="" />
        </h1>
        <p className='mb-3 text-2xl font-bold md:text-5xl'>
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
