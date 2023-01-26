import React, { useEffect, useState } from 'react'
import { Container, Wrapper, Navbar, InputAnt, ButtonAnt, BranchStyle, SelectAnt } from './style'
import { Table, Drawer, Modal, Select } from 'antd';
import edits from '../../assets/edit.svg'
import deleted from '../../assets/delete.svg'
import logouts from '../../assets/logout.svg'
import vert from '../../assets/vert.svg'
import phone from '../../assets/phone.svg'
import avatar from '../../assets/avatar.png'
import AddUser from '../add'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
      title: 'Role_id', dataIndex: 'role_id',
      sorter: (a, b) => (a.role_id > b.role_id ? 1 : -1),
      render: (role_id) => <BranchStyle color={role_id}> {role_id}</BranchStyle>
    },
    {
      title: 'Branch_id', dataIndex: 'branch_id',
      sorter: (a, b) => (a.branch_id > b.branch_id ? 1 : -1),
      render: (branch_id, record) => <BranchStyle color={branch_id} key={record.id}>{branch_id}</BranchStyle>

    },
    {
      title: 'Status', dataIndex: 'status',
      sorter: (a, b) => (a.status > b.status ? 1 : -1),
      render: (status, record) => <span key={record.id} className='status'> <img style={{ border: 'none', width: '20px', height: '25px' }} className='img' src={phone} alt="" />{status}</span>

    },
    {
      title: 'Actions', dataIndex: 'id',
      render: (id, record) => {
        return <span key={record.id} className='action'>
          <img className='edit-img' onClick={() => navigate(`/edit/${id}`)} src={edits} />
          <img className='edit-img' onClick={() => setData(data?.filter((v) => v.id !== id))} src={deleted} />
          <img className='edit-img' src={vert} />
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

  // ______ get data ______
  const getData = () => {
    localStorage.getItem('access_token') && setLoading(true)
    axios.get(`http://${url}/api/user/list`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      params,
    }).then(response => {
      setData(response?.data?.data)
      setLoading(false)
      setpagination(response?.data?.pagination)

    })
  }
  useEffect(() => getData(), [])

  // ______ filter ______
  const onChanges = (e) => {
    params.name = e.target.value.toLowerCase()
    setTimeout(() => {
      return getData()
    }, 2000);
  }
  const onChangePhone = (e) => {
    params.phone = e.target.value.toLowerCase()
    setTimeout(() => {
      return getData()
    }, 2000);
  }
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

  return <div className='container'>
    <Container>
      <Modal title="Sahifadan chiqish" open={isOutOpen} onOk={logOutOk} onCancel={handleCancel}> <p>Siz rostan ham sahifani tark etmoqchimsiz. </p></Modal>
      <Drawer title="Add User" placement="right" onClose={onClose} open={open}><AddUser data={data} setData={setData} open={open} setOpen={setOpen} /></Drawer>
      <Wrapper>
        <Navbar>
          <Select size='large' onChange={(arg) => selectChangeBranch(arg)} defaultValue="1" style={{ width: '100%' }} options={[{ value: '', label: 'branch_id' }, { value: '1', label: '1' }, { value: '2', label: '2' }]} />
          <Select size='large' onChange={(arg) => selectChangeRole(arg)} defaultValue="1" style={{ width: '100%' }} options={[{ value: '', label: 'role_id' }, { value: '1', label: '1' }, { value: '2', label: '2' }]} />
          <Select size='large' onChange={(arg) => selectChangeStatus(arg)} defaultValue="1" style={{ width: '100%' }} options={[{ value: '', label: 'status' }, { value: '1', label: '1' }, { value: '2', label: '2' }]} />
        </Navbar >
        <Navbar>
          <InputAnt size='large' name='name' onChange={onChanges} placeholder='search name...' type="text" />
          <InputAnt size='large' name='name' onChange={onChangePhone} placeholder='search phone...' type="text" />
          <ButtonAnt size='large' onClick={showDrawer} type="primary">+ Add New USer</ButtonAnt>
          <img className='logout' onClick={showLogOut} src={logouts} alt="" />
        </Navbar>

        <Table
          loading={loading}
          columns={columns}
          dataSource={data}

          indentSize='large'
          rowKey={(record) => record.id}
          pagination={{
            pageSize: pagination?.pageSize,
            count: pagination.count,
            current_page: pagination.current_page,
            per_page: pagination.per_page,
            total: pagination.total,
            total_pages: pagination.total_pages,
            onChange: (page) => selectChangePage(page)
          }
          }
        />
      </Wrapper >
    </Container >
  </div>
}

export default HomeTablePageTest;