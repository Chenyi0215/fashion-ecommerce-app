'use client';

import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useStore } from '@/contexts/StoreContext';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const AdminUserEditPage = () => {
  const params = useParams();
  const { id: userId } = params;
  const router = useRouter();
  const { userInfo } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`/api/users/${userId}`, config);
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.role === 'admin');
      } catch (err) {
        setError('讀取使用者資料失敗');
        toast.error('讀取使用者資料失敗');
      }
      setLoading(false);
    };
    fetchUser();
  }, [userId, userInfo.token]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(
        `/api/users/${userId}`,
        { name, email, role: isAdmin ? 'admin' : 'user' },
        config
      );
      toast.success('使用者資料更新成功');
      router.push('/admin/users');
    } catch (err) {
      toast.error(err.response?.data?.message || '更新失敗');
    }
  };

  if (loading) return <Spinner animation='border' />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      <Link href='/admin/users' className='btn btn-light my-3'>
        返回使用者列表
      </Link>
      <h1>編輯使用者</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-2'>
          <Form.Label>姓名</Form.Label>
          <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='email' className='my-2'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        
        <Form.Group controlId='isadmin' className='my-2'>
          <Form.Check
            type='checkbox'
            label='設為管理員'
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          ></Form.Check>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-2'>
          更新
        </Button>
      </Form>
    </>
  );
};

export default AdminUserEditPage;