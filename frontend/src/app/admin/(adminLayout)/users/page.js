'use client';
import { useState, useEffect } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import { useStore } from '@/contexts/StoreContext';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('/api/users', config);
        setUsers(data);
      } catch (err) {
        setError('讀取使用者失敗');
      }
      setLoading(false);
    };

    if (userInfo && userInfo.role === 'admin') {
      fetchUsers();
    }
  }, [userInfo]);

  const deleteHandler = async (id) => {
    if (window.confirm('確定要刪除這位使用者嗎？')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`/api/users/${id}`, config);
        setUsers(users.filter((u) => u._id !== id));
      } catch (error) {
        alert('刪除失敗');
      }
    }
  };

    if (loading) {
    return (
      <div className='d-flex justify-content-center'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      <h1>使用者管理</h1>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>EMAIL</th>
            <th>管理員</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
              <td>
                {user.role === 'admin' ? (
                  <FaCheck style={{ color: 'green' }} />
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </td>
              <td>
                <Link href={`/admin/users/${user._id}/edit`}>
                  <Button variant='light' className='btn-sm'><FaEdit /></Button>
                </Link>
                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminUsersPage;