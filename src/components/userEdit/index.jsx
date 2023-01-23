import React, { useState, useEffect } from 'react'
import { Container, Card, Input } from './styled'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useParams } from 'react-router-dom'
const { REACT_APP_BASE_URL: url } = process.env

const UpdatePage = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState({})

  useEffect(() => {
    fetch(`http://${url}/api/user/get/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    }).then(res => res.json())
      .then(response => setData(response))
  }, [])

  const formik = useFormik({
    initialValues: {
      name: data.name || '',
      phone: data.phone || '',
      password: data.password || '',
      branch: data.branch_id || '',
      role: data.role_id || '',
    },

    onSubmit: () => {
      fetch(`http://${url}/api/user/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },

        body: JSON.stringify({
          id,
          name: formik.name,
          phone: formik.phone,
          password: formik.password,
          role_id: formik.role,
          branch_id: formik.branch
        }),

      }).then(response => response.status == 200 && response.json())
        .then(res => !!res && !!localStorage.getItem('refresh_token') && navigate('/')
        )
    },
    validationSchema: Yup.object({
      name: Yup.string().min(4, '4 dan kam').required('name'),
      phone: Yup.string().min(4, '4 dan kam').required('phone'),
      password: Yup.string().min(4, '4 dan kam').max(12, '11 dan ko`p').required('password'),
      role: Yup.string().min(0, 'malumot yo`q').max(1, '1 dan ko`p').required('role'),
      branch: Yup.string().min(0, 'malumot yo`q').max(1, '1 dan ko`p').required('branch'),
    })
  })
  console.log(data);
  return (
    <Container>
      <Card onSubmit={formik.handleSubmit}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeUftCQRgVcLNy-j4C7bqsTDftnYMAE7z-AA&usqp=CAU" alt="" />
        <p>{formik.errors.name ? formik.errors.name : <b>name: {data?.name}</b>}</p>
        <Input id='name' type='text' value={data?.name && formik.values.name} onChange={formik.handleChange} />

        <p>{formik.errors.phone ? formik.errors.phone : <b>phone: {data?.phone}</b>}</p>
        <Input id='phone' type='text' value={formik.values.phone} onChange={formik.handleChange} />

        <p>{formik.errors.password ? formik.errors.password : <b>password: {data?.password}</b>}</p>
        <Input id='password' type='text' value={formik.values.password} onChange={formik.handleChange} />

        <p>{formik.errors.role ? formik.errors.role : <b>role_id: {data?.role_id}</b>}</p>
        <Input type='number' id='role' value={formik.values.role} onChange={formik.handleChange} />

        <p>{formik.errors.branch ? formik.errors.branch : <b>branch_id: {data?.branch_id}</b>}</p>
        <Input type='number' id='branch' value={formik.values.branch} onChange={formik.handleChange} />

        <button type='submit'>Ok</button>
      </Card>
    </Container>
  )
}

export default UpdatePage