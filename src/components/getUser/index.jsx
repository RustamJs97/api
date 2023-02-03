import React, { useEffect, useState } from 'react'
import { Container, Wrapper, Navbar, InputAnt, ButtonAnt, BranchStyle } from './style'
import { Table, Drawer, Modal, Select, Popover, notification } from 'antd';
import edits from '../../assets/edit.svg'
import deleteds from '../../assets/delete.svg'
import logouts from '../../assets/logout.svg'
import vert from '../../assets/vert.svg'
import phone from '../../assets/camera.svg'
import avatar from '../../assets/avatar.png'
import AddUser from '../addUser'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { debounce } from "lodash"
import { useCallback } from 'react';
import RefreshToken from './refresh';
const { REACT_APP_BASE_URL: url } = process.env

const HomeTablePageTest = () => {

  // ______ antd ______
  const columns = [
    {
      title: 'User', dataIndex: 'name',
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
      render: (name) => <span className='span-table'><img className='img' src={avatar} alt="" />{name}</span>
    },
    { title: 'Phone', dataIndex: 'phone', sorter: (a, b) => (a.role_id > b.role_id ? 1 : -1), },
    {
      title: 'Branch_id', dataIndex: 'branch_id',
      sorter: (a, b) => (a.branch_id > b.branch_id ? 1 : -1),
      render: (branch_id, record) => <BranchStyle color={branch_id} key={record.id}>{branch_id}</BranchStyle>

    },
    {
      title: 'Role_id', dataIndex: 'role_id',
      sorter: (a, b) => (a.role_id > b.role_id ? 1 : -1),
      render: (role_id) => <BranchStyle color={role_id}> {role_id}</BranchStyle>
    },
    {
      title: 'Status', dataIndex: 'status',
      sorter: (a, b) => (a.status > b.status ? 1 : -1),
      render: (status, record) => <span key={record.id} className='status'>
        <img style={{ border: 'none', width: '20px', height: '25px' }} className='img_status' src={phone} alt="" />{status}
      </span>

    },
    {
      title: 'Actions', dataIndex: 'id',
      render: (id, record) => {
        return <span key={record.id} className='action'>
          <img className='edit-img' onClick={() => navigate(`/edit/${id}`)} src={edits} />
          <img className='edit-img' onClick={() => showDeleted(id)} src={deleteds} />
          <Popover placement="bottomRight" content={<div>
            <h3 className='h3' onClick={() => navigate(`/edit/${id}`)}>edit user</h3>
            <h3 className='h3' onClick={() => navigate(`/view/${id}`)}>view user</h3>
          </div>} trigger="click"><img className='edit-img' src={vert} /></Popover>
        </span>
      }
    },
  ]

  // ______ all state ______
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [pagination, setpagination] = useState({})
  const [params] = useState({
    page: 1,
    per_page: 10,
    status: 1,
    name: "",
    role_id: 1,
    branch_id: 1
  })

  // ______ add user ______
  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  // ______ logout ______
  const [isOutOpen, setIsOutOpen] = useState(false);
  const showLogOut = () => setIsOutOpen(true)
  const handleCancel = () => setIsOutOpen(false)
  const logOutOk = () => {
    setIsOutOpen(false)
    navigate('/login')
    localStorage.clear()
  }

  // ______ deleted user ______
  const [deleted, setDeleted] = useState(false);
  const handleCancelId = () => setDeleted(false)
  const [deletedId, setDeletedId] = useState(null);
  const showDeleted = id => {
    setDeleted(true)
    setDeletedId(id)
  }

  let names = data?.filter((v) => v.id == deletedId)

  const okDeleted = () => {
    openNotificationWithIcon("success", "tabriklaymiz", `${names.map(value => value.name)} ismli user muvafaqiatli o'chirildi`)
    setData(data?.filter((v) => v.id !== deletedId))
    setDeleted(false)
  }
  // ______ get data ______
  const getData = () => {
    localStorage.getItem('access_token') && setLoading(true)
    axios.get(`http://${url}/api/user/list`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      params,
      // timeout: 10000 && setLoading(false)
    }).then(response => {
      // console.log(response);
      setData(response?.data?.data)
      setLoading(false)
      setpagination(response?.data?.pagination)
      response?.data?.pagination?.total == 0 && openNotificationWithIcon('info', 'xatolik')
    })
      .catch(err => setLoading(false))
  }
  useEffect(() => getData(), [])

  // ______ filter ______
  const makeRequestName = useCallback(
    debounce((e) => {
      params.name = e.target.value.toLowerCase()
      return getData()
    }, 500), []
  )
  const makeRequestPhone = useCallback(
    debounce((e) => {
      params.phone = e.target.value
      return getData()
    }, 500), []
  )

  const selectChangeBranch = (value) => {
    params.branch_id = value
    return getData()
  }
  const selectChangeRole = (value) => {
    params.role_id = value
    return getData()
  }
  const selectChangeStatus = (value) => {
    params.status = value
    return getData()
  }
  const selectChangePage = (value) => {
    params.page = value
    return getData()
  }
  // notification
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description: description || 'ushbu foydalanuvchi mavjud emas',

    });
  };

  return <div className='container'>
    <Container>
      <Modal title="Sahifadan chiqish" open={isOutOpen} onOk={logOutOk} onCancel={handleCancel}> <p>Siz rostan ham sahifani tark etmoqchimsiz. </p></Modal>
      <Modal title="o'chirish" open={deleted} onOk={okDeleted} onCancel={handleCancelId}> <p>Siz rostan ham sahifani tark etmoqchimsiz. </p></Modal>
      <Drawer title="Add User" placement="right" onClose={onClose} open={open}><AddUser data={data} setData={setData} open={open} setOpen={setOpen} /></Drawer>
      <Wrapper>
        <Navbar>
          <Select size='large' onChange={(arg) => selectChangeBranch(arg)} style={{ width: '100%' }} defaultValue='branch_id'
            options={[{ value: '', label: 'branch_id' }, { value: '1', label: '1' }, { value: '2', label: '2' }]} />
          <Select size='large' onChange={(arg) => selectChangeRole(arg)} style={{ width: '100%' }} defaultValue='role_id'
            options={[{ value: '', label: 'role_id' }, { value: '1', label: '1' }, { value: '2', label: '2' }]} />
          <Select size='large' onChange={(arg) => selectChangeStatus(arg)} style={{ width: '100%' }} defaultValue='status'
            options={[{ value: '', label: 'status' }, { value: '1', label: '1' }, { value: '2', label: '2' }]} />
        </Navbar >
        <Navbar>
          <img className='logout' style={{ cursor: 'pointer' }} onClick={showLogOut} src={logouts} alt="" />
          <RefreshToken />
          <InputAnt size='large' name='name' onChange={makeRequestName} placeholder='search name...' type="text" />
          <InputAnt size='large' name='name' onChange={makeRequestPhone} placeholder='search phone...' type="number" />
          <ButtonAnt size='large' onClick={showDrawer} type="primary">+ Add New USer</ButtonAnt>
        </Navbar>

        <Table
          loading={loading}
          columns={columns}
          dataSource={data}

          indentSize='large'
          rowKey={(record) => record.id}
          pagination={{
            pageSize: pagination?.pageSize,
            count: pagination?.count,
            current_page: pagination?.current_page,
            per_page: pagination?.per_page,
            total: pagination?.total,
            total_pages: pagination?.total_pages,
            onChange: (page) => selectChangePage(page)
          }
          }
        />
      </Wrapper >
    </Container >
  </div>
}

export default HomeTablePageTest;