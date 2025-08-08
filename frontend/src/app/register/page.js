'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useStore } from '@/contexts/StoreContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null); // 用來存放提示訊息，例如密碼不匹配
  const [error, setError] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const { userInfo, login } = useStore();

  // 如果使用者已登入，則直接導向目標頁面
  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }
  }, [userInfo, redirect, router]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('密碼不匹配');
      return;
    }
    setError(null);
    setMessage(null);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // 呼叫後端註冊 API
      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      );

      // 註冊成功後，自動幫使用者登入
      login(data);
      
      router.push(redirect);

    } catch (err) {
      setError(err.response?.data?.message || '註冊失敗');
    }
  };

  return (
    <div>
      <h1>註冊</h1>
      {message && <div style={{ color: 'red', marginBottom: '10px' }}>{message}</div>}
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
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
          <Form.Label>密碼</Form.Label>
          <Form.Control
            type='password'
            placeholder='請輸入密碼'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword' className='my-2'>
          <Form.Label>確認密碼</Form.Label>
          <Form.Control
            type='password'
            placeholder='請再次輸入密碼'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-2'>
          註冊
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          已經有帳號了?{' '}
          <Link href={redirect ? `/login?redirect=${redirect}` : '/login'}>
            登入
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;