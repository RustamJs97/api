import React, { lazy } from 'react'
import notfound from '../assets/not-found.svg'
import { Route, Routes, useParams, Navigate } from 'react-router-dom'
import axios from 'axios';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Container } from './style';
const Login = lazy(() => import('../components/login'));
const Home = lazy(() => import('../components/getUser'));
const ParamsUser = lazy(() => import('../components/userEdit'));
const ViewUser = lazy(() => import('../components/viewUser'));
const Root = () => {
  axios.interceptors.response.use(res => res)
  axios.interceptors.request.use((request) => {
    // request.interceptors.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    // request.interceptors.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    return request
  })
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  const { id } = useParams()
  return (
    <Container>
      <Routes>
        {!!localStorage.getItem('access_token') ?
          <Route>
            <Route path='/' element={<Navigate to={!!localStorage.getItem('access_token') ? '/home' : '/login'} />} />
            <Route path='/login' element={<React.Suspense fallback={<Spin size='large' indicator={antIcon} />}><Login /></React.Suspense>} />
            <Route path='/home' element={<React.Suspense fallback={<Spin size='large' indicator={antIcon} />}><Home /></React.Suspense>} />
            {id && <Route path='edit/' element={<React.Suspense fallback={<Spin size='large' indicator={antIcon} />}><ParamsUser /></React.Suspense>} />}
            {id && <Route path='view/' element={<React.Suspense fallback={<Spin size='large' indicator={antIcon} />}><ViewUser /></React.Suspense>} />}
            <Route path='edit/:id' element={<React.Suspense fallback={<Spin size='large' indicator={antIcon} />}><ParamsUser /></React.Suspense>} />
            <Route path='view/:id' element={<React.Suspense fallback={<Spin size='large' indicator={antIcon} />}><ViewUser /></React.Suspense>} />
            <Route path="*" element={<div className='not-found'><img className='not-img' src={notfound} alt="" /> 404 NOT FOUND</div>} />
          </Route>
          :
          <Route>
            <Route path='/login' element={<React.Suspense fallback={<Spin size='large' indicator={antIcon} />}><Login /></React.Suspense>} />
            <Route path="*" element={<div className='not-found'><img className='not-img' src={notfound} alt="" /> 404 NOT FOUND</div>} />
            <Route path='/' element={<Navigate to={!!localStorage.getItem('access_token') ? '/home' : '/login'} />} />
          </Route>
        }
      </Routes>
    </Container>
  )
}
export default Root