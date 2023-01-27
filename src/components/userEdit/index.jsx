import React, { useState, useEffect } from 'react'
import { Container, Card } from './styled'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { Input } from 'antd'
import avatar from '../../assets/avatar.png'
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
      name: data?.name,
      phone: data?.phone?.slice(3, 12),
      branch: data?.branch_id,
      role: data?.role_id,
    },
    enableReinitialize: true,
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
          name: formik.values.name,
          phone: `998${formik.values.phone}`,
          role_id: formik.values.role,
          branch_id: formik.values.branch
        }),

      }).then(response => response.status == 200 && response.json())
        .then(res => !!res && !!localStorage.getItem('refresh_token') && navigate('/'))
    },
    validationSchema: Yup.object({
      name: Yup.string().min(4, '4 dan kam').required('name'),
      phone: Yup.string().min(4, '4 dan kam').required('phone'),
      role: Yup.string().min(0, 'malumot yo`q').max(1, '1 dan ko`p').required('role'),
      branch: Yup.string().min(0, 'malumot yo`q').max(1, '1 dan ko`p').required('branch'),
    })
  })
  return (
    <Container>
      <Card onSubmit={formik.handleSubmit}>
        <img src={avatar} alt="" />
        <p>{formik.errors.name ? formik.errors.name : <b>name: {data?.name}</b>}</p>
        <Input size='large' id='name' type='text' value={formik.values.name} onChange={formik.handleChange} />

        <p>{formik.errors.phone ? formik.errors.phone : <b>phone: {data?.phone}</b>}</p>
        <Input size='large' id='phone' addonBefore="+998" type='text' value={formik.values.phone} onChange={formik.handleChange} />

        <p>{formik.errors.role ? formik.errors.role : <b>role_id: {data?.role_id}</b>}</p>
        <Input size='large' type='number' id='role' value={formik.values.role} onChange={formik.handleChange} />

        <p>{formik.errors.branch ? formik.errors.branch : <b>branch_id: {data?.branch_id}</b>}</p>
        <Input size='large' type='number' id='branch' value={formik.values.branch} onChange={formik.handleChange} />

        <button type='submit'>Ok</button>
      </Card>
    </Container>
  )
}

export default UpdatePage