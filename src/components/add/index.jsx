import React from 'react'
import { Card, Input } from './styled'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
const { REACT_APP_BASE_URL: url } = process.env

const LoginPage = ({ open, setOpen }) => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      password: '',
      role_id: '',
      branch_id: '',
    },
    onSubmit: () => {
      fetch(`http://${url}/api/user/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          "name": formik.values.name,
          "phone": formik.values.phone,
          "password": formik.values.password,
          "role_id": formik.values.role_id,
          "branch_id": formik.values.branch_id
        }),
      }).then(response => { response.status == 200 && setOpen(!open) });

    },
    validationSchema: Yup.object({
      name: Yup.string().min(4, '4 dan kam').max(12, '12 dan ko`p').required('name?'),
      phone: Yup.string().min(4, '4 dan kam').max(12, '12 dan ko`p').required('phone?'),
      password: Yup.string().min(4, '4 dan kam').max(12, '12 dan ko`p').required('password?'),
      role_id: Yup.string().required('role_id?'),
      branch_id: Yup.string().required('branch_id?'),
    })
  })

  return (
    <Card onSubmit={formik.handleSubmit}>
      <p>{formik.errors.name}</p>
      <Input type='text' id='name' value={formik.values.name} onChange={formik.handleChange} placeholder='name' />

      <p>{formik.errors.phone}</p>
      <Input style={{ margin: '0' }} type='text' id='phone' value={formik.values.phone} onChange={formik.handleChange} placeholder='phone' />
      <p>{formik.errors.password}</p>
      <Input style={{ margin: '0' }} type='text' id='password' value={formik.values.password} onChange={formik.handleChange} placeholder='password' />

      <span>
        <div>
          <p>{formik.errors.role_id}</p>
          <Input type='text' id='role_id' value={formik.values.role_id} onChange={formik.handleChange} type='number' placeholder='role_id' />
        </div>
        <div>

          <p>{formik.errors.branch_id}</p>
          <Input type='text' id='branch_id' value={formik.values.branch_id} onChange={formik.handleChange} type='number' placeholder='branch_id' />
        </div>
      </span>
      <span style={{ marginTop: '20px' }}>
        <button className='button' type='submit'>submit</button>
        <button onClick={() => setOpen(!open)} type='default ' >cancel</button>
      </span>
    </Card>
  )
}

export default LoginPage