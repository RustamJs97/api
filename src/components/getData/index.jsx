import React, { useEffect, useState } from 'react'
import { Container } from './styled'

const GetData = () => {

  const [data, setData] = useState({})
  useEffect(() => {
    fetch("http://apiservice.gx.uz/api/auth/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    }).then(response => response.json())
      .then(res => console.log(res))
  }, [])


  return (
    <span>
      {data?.id}
      {data?.name}
      {data?.phone}
    </span>
  )
}

export default GetData