'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import Link from 'next/link'; // 1. 引入 Link 元件

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      {/* 2. 將 <a> 換成 <Link> */}
      <Link href={`/products/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        {/* 3. 將 <a> 換成 <Link> */}
        <Link href={`/products/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <div className='my-3'>
            {product.rating} from {product.numReviews} reviews
          </div>
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;