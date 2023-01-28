import React, { useState } from 'react'
import { Container, Card, InputAnt } from './styled'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { REACT_APP_BASE_URL: url } = process.env

const LoginPage = (values, { resetForm }) => {

  const [loading, setLoading] = useState(false)
  const [worning, setWorning] = useState('')
  const navigate = useNavigate()
  const refresh = () => {
    !!localStorage.getItem('access_token') ? navigate('/home') : setWorning(true)
    setLoading(false)
  }
  const onLoading = () => setLoading(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values, { resetForm }) => {
      setLoading(true)
      axios.post(`http://${url}/api/auth/login`,
        {
          phone: `998${formik.values.email}`,
          password: formik.values.password,
        })
        .then(res => {
          !!res && localStorage.setItem('access_token', res?.data?.access_token)
          !!res && localStorage.setItem('refresh_token', res?.data?.refresh_token)
          refresh()
        }
        )
        .catch(err => {
          onLoading()
          setWorning('logon yoki parol xato')
          // resetForm({ values: '' })
        })

    },
    validationSchema: Yup.object({
      email: Yup.string().required('email?'),
      password: Yup.string().min(4, '4 dan kam')
    })
  })
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  return (
    <Container>
      {
        loading ?
          <Spin size='large' indicator={antIcon} />
          :
          <Card onSubmit={formik.handleSubmit}>
            <h2>  {worning}</h2>
            <p>{formik.errors.email ? formik.errors.email : <b>email: +998 33 025 24 25</b>}</p>
            <InputAnt size='large' addonBefore="+998" maxLength={9} type='text' id='email' value={formik.values.email} onChange={formik.handleChange} />
            <p>{formik.errors.password ? formik.errors.password : <b>password: 123456</b>}</p>
            <InputAnt.Password size='large' id='password' type='password' tvalue={formik.values.password} onChange={formik.handleChange} />
            <button type='submit'>Login</button>
          </Card>
      }
    </Container>
  )
}

export default LoginPage