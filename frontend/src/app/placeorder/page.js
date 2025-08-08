'use client';

import { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useStore } from '@/contexts/StoreContext';
import CheckoutSteps from '@/components/CheckoutSteps';

const PlaceOrderPage = () => {
  const router = useRouter();
  const { cartItems, shippingAddress, paymentMethod, userInfo } = useStore();

  // ----- 價格計算 -----
  // 將價格格式化為兩位小數
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  
  // 商品總價
  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // 運費 (簡單邏輯：總價超過 $1000 免運)
  const shippingPrice = addDecimals(itemsPrice > 1000 ? 0 : 100);
  // 稅金 (簡單設定為 5%)
  const taxPrice = addDecimals(Number((0.05 * itemsPrice).toFixed(2)));
  // 訂單總金額
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  // ----- 檢查流程完整性 -----
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    } else if (!paymentMethod) {
      router.push('/payment');
    }
  }, [shippingAddress, paymentMethod, router]);

  // ----- 下訂單處理函式 -----
  const placeOrderHandler = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`, // 帶上使用者的 Token
        },
      };

      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        config
      );

      // 成功下單後，我們之後會清除購物車並導向到訂單詳情頁
      // clearCartItems();
      router.push(`/order/${data._id}`);
      
    } catch (error) {
      console.error(error);
      // 之後會加入更美觀的錯誤提示
      alert(error.response?.data?.message || '下單失敗');
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>運送資訊</h2>
              <p>
                <strong>地址: </strong>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>付款方式</h2>
              <strong>方式: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>訂單商品</h2>
              {cartItems.length === 0 ? (
                <p>您的購物車是空的</p>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                        <Col><Link href={`/products/${item._id}`}>{item.name}</Link></Col>
                        <Col md={4}>{item.qty} x ${item.price} = ${item.qty * item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item><h2>訂單總覽</h2></ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>商品總價</Col><Col>${itemsPrice}</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>運費</Col><Col>${shippingPrice}</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>稅金</Col><Col>${taxPrice}</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>訂單總額</Col><Col>${totalPrice}</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  確認下單
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;