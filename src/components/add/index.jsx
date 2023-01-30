import React, { useState } from 'react'
import { Card } from './styled'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input, Button, Spin, notification } from 'antd'
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons';
const { REACT_APP_BASE_URL: url } = process.env

const AddPage = ({ open, setOpen }) => {

  const [loading, setLoading] = useState(false)
  const onLoading = () => setLoading(false)
  const cancelOpen = () => setOpen(!open)

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      password: '',
      role_id: '',
      branch_id: '',
    },

    onSubmit: (values, { resetForm }) => {
      setLoading(true)
      axios.post(`http://${url}/api/user/add`,
        {
          name: formik.values.name,
          phone: `998${formik.values.phone}`,
          password: formik.values.password,
          role_id: formik.values.role_id,
          branch_id: formik.values.branch_id
        }, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        validateStatus: function (status) {
          status === 400 && openNotificationWithIcon()
        }
      })
        .then(res => {
          !!res && resetForm({ values: '' })
          onLoading()
          cancelOpen()
        }).catch(err => {
          setLoading(false)
        })
    },

    validationSchema: Yup.object({
      name: Yup.string().min(4, '4 dan kam').max(12, '12 dan ko`p').required('name?'),
      phone: Yup.string().min(4, '4 dan kam').max(12, '12 dan ko`p').required('phone?'),
      password: Yup.string().min(4, '4 dan kam').max(12, '12 dan ko`p').required('password?'),
      role_id: Yup.string().required('role_id?'),
      branch_id: Yup.string().required('branch_id?'),
    })
  })
  const openNotificationWithIcon = (type, mas, desc) => {
    notification[type || 'warning']({
      message: mas || 'xatolik yuz berdi',
      description: desc || 'bu raqam oldin ruyxatdan utgan yoki qaytadan kiritib koring',

    });
  };
  return (
    <Card onSubmit={formik.handleSubmit}>
      <p>{formik.errors.name}</p>
      <Input size='large' type='text' id='name' value={formik.values.name} onChange={formik.handleChange} placeholder='name' />

      <p>{formik.errors.phone}</p>
      <Input size='large' addonBefore="+998" maxLength={9} style={{ margin: '0' }} type='text' id='phone' value={formik.values.phone} onChange={formik.handleChange} placeholder='phone' />
      <p>{formik.errors.password}</p>
      <Input.Password size='large' style={{ margin: '0' }} type='text' id='password' value={formik.values.password} onChange={formik.handleChange} placeholder='password' />

      <span className="span">
        <div>
          <p>{formik.errors.role_id}</p>
          <Input size='large' type='text' id='role_id' value={formik.values.role_id} onChange={formik.handleChange} type='number' placeholder='role_id' />
        </div>
        <div>

          <p>{formik.errors.branch_id}</p>
          <Input size='large' type='text' id='branch_id' value={formik.values.branch_id} onChange={formik.handleChange} type='number' placeholder='branch_id' />
        </div>
      </span>

      <span className="span" style={{ marginTop: '20px' }}>
        <Button type='primary' disabled={loading && true} htmlType='submit'> {loading && <Spin size='large' indicator={<LoadingOutlined style={{ fontSize: 24, }} spin />} />}Add user</Button>
        <Button onClick={cancelOpen}>Cancel</Button>
      </span>
    </Card >
  )
}

export default AddPage