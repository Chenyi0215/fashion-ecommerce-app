'use client';

import React, { useState } from 'react'; // 1. 引入 useState 來管理數量
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'; // 2. 引入 Form 來建立下拉選單
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 3. 引入 useRouter 來實現頁面跳轉
import { useStore } from '@/contexts/StoreContext'; // 4. 引入我們自訂的 useCart Hook

const ProductDetails = ({ product }) => {
  const { addToCart } = useStore(); // 從 Context 中取得 addToCart 函式
  const router = useRouter(); // 初始化 router

  const [qty, setQty] = useState(1); // 建立一個 state 來存放使用者選擇的數量，預設為 1

  if (!product || !product.name) {
    return <div>商品不存在或正在載入...</div>;
  }

  // 加入購物車的處理函式
  const addToCartHandler = () => {
    addToCart(product, Number(qty)); // 呼叫 Context 中的函式，將商品和數量加入購物車
    router.push('/cart'); // 跳轉到購物車頁面
  };

  return (
    <>
      <Link href='/' className='btn btn-light my-3'>
        返回首頁
      </Link>
      <Row>
        {/* 左側商品圖片和中間的商品描述區塊維持不變 */}
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
            <ListGroup.Item>評分: {product.rating} / {product.numReviews} 則評論</ListGroup.Item>
            <ListGroup.Item>價格: ${product.price}</ListGroup.Item>
            <ListGroup.Item>商品描述: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        {/* ## 右側的購買資訊卡片是我們這次的修改重點 ## */}
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>價格:</Col>
                  <Col><strong>${product.price}</strong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>庫存狀態:</Col>
                  <Col>{product.stock > 0 ? '有庫存' : '已售完'}</Col>
                </Row>
              </ListGroup.Item>

              {/* 如果有庫存，才顯示數量選擇的下拉選單 */}
              {product.stock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>數量:</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {/* 根據庫存數量，動態產生選項 */}
                        {[...Array(product.stock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.stock === 0}
                  onClick={addToCartHandler} // 綁定點擊事件
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