

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useStore } from '@/contexts/StoreContext';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const { userInfo, login } = useStore();

  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }
  }, [userInfo, redirect, router]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('密碼不匹配');
      return;
    }

    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const { data } = await axios.post('/api/users', { name, email, password }, config);
      login(data);
      router.push(redirect);
    } catch (err) {
      toast.error(err.response?.data?.message || '註冊失敗');
    }
  };

  return (
    <div>
      <h1>註冊</h1>
      <Form onSubmit={submitHandler} suppressHydrationWarning>
        <Form.Group controlId='name' className='my-2'>
          <Form.Label>姓名</Form.Label>
          <Form.Control type='text' placeholder='請輸入姓名' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='email' className='my-2'>
          <Form.Label>Email 地址</Form.Label>
          <Form.Control type='email' placeholder='請輸入 email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-2'>
          <Form.Label>密碼</Form.Label>
          <Form.Control type='password' placeholder='請輸入密碼' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword' className='my-2'>
          <Form.Label>確認密碼</Form.Label>
          <Form.Control type='password' placeholder='請再次輸入密碼' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='my-2'>註冊</Button>
      </Form>
      <Row className='py-3'>
        <Col>
          已經有帳號了?{' '}
          <Link href={redirect ? `/login?redirect=${redirect}` : '/login'}>登入</Link>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterForm;