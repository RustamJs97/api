import React, { useState, } from 'react'
import { Container, Card, InputAnt, InputMask } from './styled'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import { Spin, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { REACT_APP_BASE_URL: url } = process.env

const LoginPage = (values, { resetForm }) => {

  const [loading, setLoading] = useState(false)
  const [worning, setWorning] = useState('')
  const [phone, setPhone] = useState('99800')
  const navigate = useNavigate()
  const refresh = () => {
    !!localStorage.getItem('access_token') ? navigate('/home') : setWorning(true)
    setLoading(false)
  }
  const onLoading = () => setLoading(false)

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: ''
    },

    onSubmit: (values, { resetForm }) => {
      setLoading(true)
      axios.post(`http://${url}/api/auth/login`,
        {
          phone: `998${formik.values.phone.replace("(", "").replace(")", "").replace(" ", "").replace("-", "").replace("-", "")}`,
          password: formik.values.password,
        })
        .then(res => {
          !!res && localStorage.setItem('access_token', res?.data?.access_token)
          !!res && localStorage.setItem('refresh_token', res?.data?.refresh_token)
          refresh()
          onLoading()
        }
        )
        .catch(err => {
          setWorning('logon yoki parol xato')
          setLoading(false)
        })
    },
    validationSchema: Yup.object({
      // phone: Yup.string().min(9, '4 dan kam').max(9, '4 dan kam'),
      password: Yup.string().min(4, '4 dan kam')
    }),
  })

  return (
    <Container>

      <Card onSubmit={formik.handleSubmit}>
        <h2>  {worning}</h2>
        <p>{formik.errors.phone ? formik.errors.passwphoneord : <b>email: +998 33 025 24 25</b>}</p>

        <span className="row">
          <span className="input-code">
            +998
          </span>
          <InputMask
            className='inputs'
            mask={['(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
            placeholder="Enter a phone number"
            guide={true}
            id='phone'
            type="text"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />

        </span>
        <p>{formik.errors.password ? formik.errors.password : <b>password: 123456</b>}</p>
        <InputAnt.Password size='large' id='password' type='password' value={formik.values.password} onChange={formik.handleChange} />
        <Button disabled={loading && true} htmlType='submit'> {loading && <Spin size='large' indicator={<LoadingOutlined style={{ fontSize: 24, }} spin />} />}Login</Button>

      </Card>

    </Container>
  )
}

export default LoginPage