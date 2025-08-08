'use client';

import { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useStore } from '@/contexts/StoreContext';
import CheckoutSteps from '@/components/CheckoutSteps';

const PaymentPage = () => {
  const { shippingAddress, paymentMethod, savePaymentMethod } = useStore();
  const router = useRouter();

  // 如果使用者沒有填寫運送地址，就導向回運送頁面
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    }
  }, [shippingAddress, router]);

  // 預設的付款方式仍然是 'PayPal'
  const [method, setMethod] = useState(paymentMethod || 'PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(method);
    router.push('/placeorder'); // 前往下一步：確認下單
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <h1>付款方式</h1>
      <Form onSubmit={submitHandler} suppressHydrationWarning>
        <Form.Group>
          <Form.Label as='legend'>選擇付款方式</Form.Label>
          <Col>
            {/* ## 核心修正：將單一選項拆分為兩個 ## */}

            {/* 選項一：PayPal */}
            <Form.Check
              type='radio'
              className='my-2'
              label='PayPal'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked={method === 'PayPal'}
              onChange={(e) => setMethod(e.target.value)}
            ></Form.Check>

            {/* 選項二：信用卡 (我們預計未來使用 Stripe) */}
            <Form.Check
              type='radio'
              className='my-2'
              label='信用卡 (Stripe)'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              checked={method === 'Stripe'}
              onChange={(e) => setMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-2'>
          繼續
        </Button>
      </Form>
    </>
  );
};

export default PaymentPage;