import React, { useRef, useState } from 'react'
import { Container, Card, InputAnt } from './styled'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
const { REACT_APP_BASE_URL: url } = process.env

const LoginPage = () => {

  const [worning, setWorning] = useState('')
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: () => {
      axios.post(`http://${url}/api/auth/login`, {
        phone: `998${formik.values.email}`,
        password: formik.values.password,
      })
        .then(res => {
          !!res && localStorage.setItem('access_token', res?.data?.access_token)
          !!res && localStorage.setItem('refresh_token', res?.data?.refresh_token)
          !!res && !!localStorage.getItem('access_token') && navigate('/')
          res && setWorning('login yoki parol xato')
        }
        )
    },
    validationSchema: Yup.object({
      email: Yup.string().required('email?'),
      password: Yup.string().min(4, '4 dan kam')
    })
  })

  return (
    <Container>
      <Card onSubmit={formik.handleSubmit}>
        <h2>{worning}</h2>
        <p>{formik.errors.email ? formik.errors.email : <b>email: +998 33 025 24 25</b>}</p>
        <InputAnt addonBefore="+998" maxLength={9} type='text' id='email' value={formik.values.email} onChange={formik.handleChange} />
        <p>{formik.errors.password ? formik.errors.password : <b>password: 123456</b>}</p>
        <InputAnt.Password id='password' type='password' tvalue={formik.values.password} onChange={formik.handleChange} />
        <button type='submit'>Login</button>
      </Card>
    </Container>
  )
}

export default LoginPage