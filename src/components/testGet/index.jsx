import React, { useEffect, useState } from 'react'
import { Container, Wrapper, Navbar, InputAnt, ButtonAnt, BranchStyle } from './style'
import { Table, Drawer, Modal, Select } from 'antd';
import edits from '../../assets/edit.svg'
import deleted from '../../assets/delete.svg'
import logouts from '../../assets/logout.svg'
import vert from '../../assets/vert.svg'
import phone from '../../assets/phone.svg'
import avatar from '../../assets/avatar.png'
import AddUser from '../add'
import { useLocation, useNavigate } from 'react-router-dom';
import UseReplace from '../useReplace';
import useSearch from './useSearch';
import axios from 'axios';
const { REACT_APP_BASE_URL: url } = process.env

const HomeTablePageTest = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const search = useSearch()

  const columns = [
    // {
    //   title: 'Id', dataIndex: 'id', key: 'id'
    // },
    {
      title: 'User', dataIndex: 'name',
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
      render: (name) => <span className='span-table'><img className='img' src={avatar} alt="" />{name}</span>
    },
    { title: 'Phone', dataIndex: 'phone', },
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

  // console.log(dataFilter);
  // console.log(dataPage);
  // console.log(data);

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [totalPage, setTotalPage] = useState(1)
  const [pagination, setpagination] = useState({})
  const getData = () => {
    setLoading(true)
    axios.get(`http://${url}/api/user/list`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    }).then(response => {
      setData(response?.data?.data)
      setTotalPage(response?.data?.pagination?.total_pages)
      setLoading(false)
      console.log(response?.data);
      setpagination({
        pageSize: pagination.per_page,
        total: totalPage,
        onChange: (queary, value) => {
          navigate(`${location?.pathname}${UseReplace(queary, value)}`)
          return getData()
        }
      })
      // console.log(response);
    })
  }
  useEffect(() => getData(), [])

  // ______ Drawer add user ______
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
  const onChanges = ({ target: { name, value } }) => {
    navigate(`${location?.pathname}${UseReplace(name, value)}`)
    return getData()
  }
  const selectChange = (query, value) => {
    navigate(`${location?.pathname}${UseReplace(query, value)}`)
    return getData()
  }

  return <Container>
    <Modal title="Sahifadan chiqish" open={isOutOpen} onOk={logOutOk} onCancel={handleCancel}> <p>Siz rostan ham sahifani tark etmoqchimsiz. </p></Modal>
    <Drawer title="Add User" placement="right" onClose={onClose} open={open}><AddUser data={data} setData={setData} open={open} setOpen={setOpen} /></Drawer>
    <Wrapper>
      <Navbar>
        <Select size='large' onChange={(arg) => selectChange('branch_id', arg)} defaultValue="Branch_Id" style={{ width: '100%' }} options={[{ value: '', label: 'branch_id' }, { value: '1', label: '1' }, { value: '2', label: '2' }]} />
        <Select size='large' onChange={(arg) => selectChange('role_id', arg)} defaultValue="role_id" style={{ width: '100%' }} options={[{ value: '', label: 'role_id' }, { value: '1', label: '1' }, { value: '2', label: '2' }]} />
        <Select size='large' onChange={(arg) => selectChange('status', arg)} defaultValue="Status" style={{ width: '100%' }} options={[{ value: '', label: 'status' }, { value: '0', label: '1' }, { value: '2', label: '2' }]} />
      </Navbar >
      <Navbar>
        <InputAnt size='large' name='name' onChange={onChanges} placeholder='search' type="text" />
        <ButtonAnt size='large' onClick={showDrawer} type="primary">+ Add New USer</ButtonAnt>
        <img className='logout' onClick={showLogOut} src={logouts} alt="" />
      </Navbar>

      <Table
        indentSize='large'
        // bordered={true}
        rowKey={(record) => record.id}
        pagination={pagination}
        loading={loading} indentSize={2} columns={columns} dataSource={data} />
    </Wrapper > </Container >
}
export default HomeTablePageTest;