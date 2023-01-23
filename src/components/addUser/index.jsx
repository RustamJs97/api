import React, { useRef } from 'react'
import { Container } from './styled'
import { Input, Button } from 'antd'

const AddUser = ({ onClose }) => {

  const nameRef = useRef('dsd')
  const phoneRef = useRef()
  const passwordRef = useRef('')
  const roleIdRef = useRef()
  const branchIdRef = useRef()

  let data = {
    "name": nameRef.current,
    "phone": phoneRef.current,
    "password": passwordRef.current,
    "role_id": roleIdRef.current,
    "branch_id": branchIdRef.current
  }
  const addUsers = () => {
    return fetch("http://apiservice.gx.uz/api/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(data),
    })
  }

  return (
    <Container>
      <Input placeholder='name' ref={nameRef} />
      <Input placeholder='phone' ref={phoneRef} />
      <Input placeholder='password' ref={passwordRef} />
      <Input type='number' placeholder='role_id' ref={roleIdRef} />
      <Input type='number' placeholder='branch_id' ref={branchIdRef} />
      <span>
        <button className='button' style={{ width: '100%' }} onClick={addUsers}>submit</button>
        <Button style={{ width: '100%', }} type='default ' onClick={onClose}>cancel</Button>
      </span>
    </Container>
  )
}

export default AddUser