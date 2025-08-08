'use client';

import { useState, useEffect } from 'react'; // 1. 引入 useState 和 useEffect
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useStore } from '@/contexts/StoreContext';

const CartPage = () => {
  const router = useRouter();
  const { cartItems, addToCart, removeFromCart, userInfo } = useStore();

  // 2. 建立一個狀態來追蹤元件是否已在客戶端掛載
  const [isMounted, setIsMounted] = useState(false);

  // 3. 使用 useEffect，它只會在客戶端執行
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const checkoutHandler = () => {
    if(userInfo){
      router.push('/shipping');
    }else{
      router.push('/login?redirect=/shipping');
    }
  };

  // 4. 在元件掛載完成前，先不渲染任何內容 (或顯示 loading)
  if (!isMounted) {
    return null; // 或者可以回傳一個 <p>Loading...</p>
  }

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>購物車</h1>
        {cartItems.length === 0 ? (
          <h3>
            您的購物車是空的 <Link href='/'>返回首頁</Link>
          </h3>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link href={`/products/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        addToCart(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCart(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                共 ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                件商品
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                前往結帳
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;