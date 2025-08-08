'use client';
import React from 'react';
import { Nav } from 'react-bootstrap';
import Link from 'next/link';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          // ## 修正後的寫法 ##
          <Nav.Link as={Link} href='/login'>
            登入
          </Nav.Link>
        ) : (
          <Nav.Link disabled>登入</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <Nav.Link as={Link} href='/shipping'>
            運送資訊
          </Nav.Link>
        ) : (
          <Nav.Link disabled>運送資訊</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <Nav.Link as={Link} href='/payment'>
            付款方式
          </Nav.Link>
        ) : (
          <Nav.Link disabled>付款方式</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <Nav.Link as={Link} href='/placeorder'>
            確認下單
          </Nav.Link>
        ) : (
          <Nav.Link disabled>確認下單</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;