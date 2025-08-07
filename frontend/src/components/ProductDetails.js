'use client'; // 標記為客戶端元件

import React from 'react';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Link from 'next/link';

// 這個元件只接收 product 作為 prop，並負責渲染
const ProductDetails = ({ product }) => {
  // 處理 product 不存在的情況
  if (!product || !product.name) {
    return <div>商品不存在或正在載入...</div>;
  }

  return (
    <>
      <Link href='/' className='btn btn-light my-3'>
        返回首頁
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              評分: {product.rating} / {product.numReviews} 則評論
            </ListGroup.Item>
            <ListGroup.Item>價格: ${product.price}</ListGroup.Item>
            <ListGroup.Item>商品描述: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>價格:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>庫存狀態:</Col>
                  <Col>
                    {product.stock > 0 ? '有庫存' : '已售完'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.stock === 0}
                >
                  加入購物車
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;