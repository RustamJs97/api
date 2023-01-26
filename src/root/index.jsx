import React, { lazy } from 'react'
import notfound from '../assets/not-found.svg'
import { Route, Routes, useParams } from 'react-router-dom'
const Login = lazy(() => import('../components/login'));
const Home = lazy(() => import('../components/testGet'));
const ParamsUser = lazy(() => import('../components/userEdit'));

const Root = () => {
  const { id } = useParams()
  // component: <React.Suspense fallback={<Spins tip="Loading..." size='large' />}><HomePage /></React.Suspense>,
  return (
    <Routes>
      <Route path='/login' element={<React.Suspense fallback={<h1> loading</h1>}><Login /></React.Suspense>} />
      <Route path='/' element={<React.Suspense fallback={<h1> loading</h1>}><Home /></React.Suspense>} />
      <Route path='edit/' element={id ? <React.Suspense fallback={<h1> loading</h1>}><ParamsUser /></React.Suspense> : <img src='https://vocasia.id/blog/wp-content/uploads/2022/01/error-404-not-found.png' />} />
      <Route path='edit/:id' element={<React.Suspense fallback={<h1> loading</h1>}><ParamsUser /></React.Suspense>} />
      <Route path="*" element={<div className='not-found'><img className='not-img' src={notfound} alt="" /> 404 NOT FOUND</div>} />
    </Routes>
  )
}

export default Root