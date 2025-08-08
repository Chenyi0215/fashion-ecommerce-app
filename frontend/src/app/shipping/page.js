'use client';

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useStore } from '@/contexts/StoreContext';
import CheckoutSteps from '@/components/CheckoutSteps';

const ShippingPage = () => {
  const { shippingAddress, saveShippingAddress } = useStore();
  const router = useRouter();

  // 從 context (localStorage) 讀取地址作為預設值，若無則為空
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    router.push('/payment'); // 前往下一步：付款方式
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <h1>運送資訊</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='my-2'>
          <Form.Label>地址</Form.Label>
          <Form.Control
            type='text'
            placeholder='請輸入地址'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city' className='my-2'>
          <Form.Label>城市</Form.Label>
          <Form.Control
            type='text'
            placeholder='請輸入城市'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode' className='my-2'>
          <Form.Label>郵遞區號</Form.Label>
          <Form.Control
            type='text'
            placeholder='請輸入郵遞區號'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country' className='my-2'>
          <Form.Label>國家</Form.Label>
          <Form.Control
            type='text'
            placeholder='請輸入國家'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-2'>
          繼續
        </Button>
      </Form>
    </>
  );
};

export default ShippingPage;