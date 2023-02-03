import React, { useState, useEffect } from 'react'
import { Container, Card, Wrapper } from './styled'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import user from '../../assets/user.jpg'
import { Button } from 'antd'
const { REACT_APP_BASE_URL: url } = process.env

const ViewPage = () => {
  const [data, setData] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    axios(`http://${url}/api/user/get/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    }).then(response => setData(response?.data))
  }, [])

  return (
    <Container>

      <Card >
        <img src={user} alt="" />
        <h1>{data?.name}</h1>
        <span className='border' />
        <h6>Uzbekistan</h6>
        <Button style={{ marginTop: '10px' }} onClick={() => navigate(`/edit/${id}`)}>Edit User</Button>
      </Card>
      <Wrapper >
        <h1>User Profile</h1>
        <span className='abaut'>
          <p>Phone: +{data?.phone}</p>
          <p>Branch: {data?.branch_id} inVoice</p>
          <p>Role: {data?.role_id} Admin</p>
        </span>
      </Wrapper>
    </Container>
  )
}

export default ViewPage