import React, { useState } from 'react'
import axios from 'axios';
import { message } from 'antd';
import img from '../../assets/refresh.svg'
const { REACT_APP_BASE_URL: url } = process.env

const RefreshToken = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const refresh = () => {
    success()
    axios.put(`http://${url}/api/auth/refresh_token`,
      { refresh_token: localStorage.getItem('refresh_token') }
    )
      .then(res => {
        !!res && localStorage.setItem('access_token', res?.data?.access_token)
        !!res && localStorage.setItem('refresh_token', res?.data?.refresh_token)
      }
      )
  }

  const success = () => {
    messageApi.open({
      type: 'loading',
      content: 'Token yangilanmoqda..',
      duration: 0,
    });
    setTimeout(messageApi.destroy, 2500);
  };
  return <span style={{ marginRight: 'auto' }}>
    {contextHolder}
    <img style={{ marginRight: 'auto' }} className='img' onClick={refresh} src={img} />

  </span>


}

export default RefreshToken