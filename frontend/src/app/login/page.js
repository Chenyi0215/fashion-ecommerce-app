'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useStore } from '@/contexts/StoreContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { login } = useStore();


  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      login(data);
      
      router.push(redirect);

    } catch (err) {
      setError(err.response?.data?.message || '登入失敗');
    }
  };

  return (
    <div>
      <h1>登入</h1>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {/* ## 核心修正：在此處加入 suppressHydrationWarning ## */}
      <Form onSubmit={submitHandler} suppressHydrationWarning>
        <Form.Group controlId='email'>
          <Form.Label>Email 地址</Form.Label>
          <Form.Control
            type='email'
            placeholder='請輸入 email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' style={{ marginTop: '10px' }}>
          <Form.Label>密碼</Form.Label>
          <Form.Control
            type='password'
            placeholder='請輸入密碼'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' style={{ marginTop: '20px' }}>
          登入
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          新客戶?{' '}
          <Link href={redirect ? `/register?redirect=${redirect}` : '/register'}>
            註冊
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;