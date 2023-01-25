import React from 'react'
import notfound from '../assets/not-found.svg'
import { Route, Routes, useParams } from 'react-router-dom'
import Login from '../components/login'
import Home from '../components/testGet'
import ParamsUser from '../components/userEdit'
const Root = () => {
  const { id } = useParams()
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Home />} />
      <Route path='edit/' element={id ? < ParamsUser /> : <img src='https://vocasia.id/blog/wp-content/uploads/2022/01/error-404-not-found.png' />} />
      <Route path='edit/:id' element={< ParamsUser />} />
      <Route path="*" element={<div className='not-found'><img className='not-img' src={notfound} alt="" /> 404 NOT FOUND</div>} />
    </Routes>
  )
}

export default Root