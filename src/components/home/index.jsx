import React, { useEffect, useState } from 'react'
import { } from 'antd';
import { Container, Wrapper, Navbar, InputAnt, ButtonAnt } from './style'
import { Table, Drawer, Modal, Select } from 'antd';
import edits from '../../assets/edit.svg'
import deleted from '../../assets/delete.svg'
import logouts from '../../assets/logout.svg'
import phone from '../../assets/phone.svg'
import avatar from '../../assets/avatar.jpg'
import AddUser from '../add'
import { useNavigate } from 'react-router-dom';
const { REACT_APP_BASE_URL: url } = process.env

const HomeTablePage = () => {

  const navigate = useNavigate()
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'User',
      dataIndex: 'name',
      sorter: (a, b) => a.age - b.age,
      render: (text, record) => {
        return <span className='span-table'>
          <img className='img' src={avatar} alt="" />{text}
        </span>
      }
    },
    { title: 'Phone', dataIndex: 'phone', },
    {
      title: 'Role_id',
      dataIndex: 'role_id',
      sorter: (a, b) => a.age - b.age,
      render: (text, record) => {
        return <span className='span-table'>
          <img style={{ border: 'none', width: '20px', height: '25px' }} className='img' src={phone} alt="" />{text}
        </span>
      }
    },
    {
      title: 'Branch_id', dataIndex: 'branch_id', sorter: (a, b) => a.age - b.age,
      render: (text, record) => {
        return <span className='branch'>{text}</span>
      }
    },
    {
      title: 'Status', dataIndex: 'status', sorter: (a, b) => a.age - b.age,
      render: (text, record) => {
        return <span className='status'>{text}</span>
      }
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: (value) => {
        return <span className='action'>
          <img className='edit-img' onClick={() => navigate(`/${value}`)} src={edits} />
          <img className='edit-img' onClick={() => showModal(value)} src={deleted} />
        </span>
      }
    },
  ]

  const [data, setData] = useState()
  useEffect(() => {
    fetch(`http://${url}/api/auth/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    }).then(response => response.json())
      .then(res => Array.isArray(res) ? setData(res) : setData([res]))
  }, [])


  // Drawer add user
  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  // delete
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (value) => setIsModalOpen(true) && handleOk(value)
  const handleOk = (value) => setIsModalOpen(false) && console.log('ids', value);
  const handleCancel = () => {
    setIsModalOpen(false)
    setIsOutOpen(false)
  }
  // logout
  const [isOutOpen, setIsOutOpen] = useState(false);
  const showLogOut = () => setIsOutOpen(true)
  const logOutOk = () => {
    setIsOutOpen(false)
    navigate('/login')
    localStorage.clear()
  }
  // selected
  const handleChange = (value) => {
    setData(data?.filter((v => v.name !== value.name)))
  };
  const handleData = (e) => {
    console.log(e)
    setData(data?.filter((v) => v.name.includes(e.target.value)))
  }
  return <Container>
    <Modal title="Userni yo`q qilish" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}> <p>Siz usgbu malumotni rostan ham o'chirmoqchimisiz</p> </Modal>
    <Modal title="Sahifadan chiqish" open={isOutOpen} onOk={logOutOk} onCancel={handleCancel}> <p>Siz rostan ham sahifani tark etmoqchimsiz. Unday bo'lsa ogohlantiramiz login va parolni qayta kiritishingiz kerak bo'ladi</p></Modal>
    <Drawer title="Add User" placement="right" onClose={onClose} open={open}><AddUser open={open} setOpen={setOpen} /></Drawer>
    <Wrapper>
      <Navbar>
        <Select
          labelInValue
          defaultValue={{
            value: 'lucy',
            label: 'Lucy (101)',
          }}
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: 'jack',
              label: 'Jack (100)',
            },
            {
              value: 'lucy',
              label: 'Lucy (101)',
            },
          ]}
        />
        <Select
          labelInValue
          defaultValue={{
            value: 'lucy',
            label: 'Lucy (101)',
          }}
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: 'jack',
              label: 'Jack (100)',
            },
            {
              value: 'lucy',
              label: 'Lucy (101)',
            },
          ]}
        />
        <Select
          labelInValue
          defaultValue={{
            value: ' data[0]?.name',
            label: ' data[0]?.name',
          }}
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={data?.map((v) => {
            return {
              value: `${v.name}`,
              label: `${v.name}`,
            }
          })}
        />
      </Navbar>
      <Navbar>
        <InputAnt onChange={handleData} placeholder='search' type="text" />
        <ButtonAnt onClick={showDrawer} type="primary">+ Add New USer</ButtonAnt>
        <img className='logout' onClick={showLogOut} src={logouts} alt="" />
      </Navbar>

      <Table columns={columns} dataSource={data} />
    </Wrapper> </Container>
}
export default HomeTablePage;