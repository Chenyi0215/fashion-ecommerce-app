'use client';

import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useStore } from '@/contexts/StoreContext';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userInfo, login } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    } else {
      // 預填使用者資料
      setName(userInfo.name);
      setEmail(userInfo.email);

      // 獲取使用者訂單
      const fetchMyOrders = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          };
          const { data } = await axios.get('/api/orders/myorders', config);
          setOrders(data);
          setLoading(false);
        } catch (error) {
          setError(error.response?.data?.message || '讀取訂單失敗');
          setLoading(false);
        }
      };
      fetchMyOrders();
    }
  }, [userInfo, router]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('密碼不匹配');
    } else {
      setMessage(null);
      setError(null);
      setSuccess(false);
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.put(
          '/api/users/profile',
          { name, email, password },
          config
        );
        login(data); // 使用更新後的資料重新登入，以更新全域狀態和 Header
        setSuccess(true);
        setPassword('');
        setConfirmPassword('');
      } catch (err) {
        setError(err.response?.data?.message || '更新失敗');
      }
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>個人資料</h2>
        {message && <p style={{ color: 'red' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>個人資料已更新！</p>}
        <Form onSubmit={submitHandler} suppressHydrationWarning>
          <Form.Group controlId='name' className='my-2'>
            <Form.Label>姓名</Form.Label>
            <Form.Control
              type='text'
              placeholder='請輸入姓名'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email' className='my-2'>
            <Form.Label>Email 地址</Form.Label>
            <Form.Control
              type='email'
              placeholder='請輸入 email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password' className='my-2'>
            <Form.Label>新密碼</Form.Label>
            <Form.Control
              type='password'
              placeholder='請輸入新密碼'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword' className='my-2'>
            <Form.Label>確認新密碼</Form.Label>
            <Form.Control
              type='password'
              placeholder='請再次輸入新密碼'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary' className='my-2'>
            更新
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>我的訂單</h2>
        {loading ? (
          <p>載入中...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>日期</th>
                <th>總金額</th>
                <th>已付款</th>
                <th>已出貨</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <Link href={`/order/${order._id}`} passHref>
                      <Button className='btn-sm' variant='light'>
                        詳情
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;