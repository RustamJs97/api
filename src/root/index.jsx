import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/login'
import Home from '../components/home'
import ParamsUser from '../components/userEdit'

const Root = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Home />} />
      <Route path='/:id' element={< ParamsUser />} />
      {/* <Route path='*' element={<img src='https://ru.hostings.info/upload/images/2021/12/e11044b915dc39afc3004430606bd6d1.jpg' />} /> */}
    </Routes>
  )
}

export default Root