'use client';

import { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useStore } from '@/contexts/StoreContext';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useStore();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paypalClientId, setPaypalClientId] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get(`/api/orders/${orderId}`, config);
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || '讀取訂單失敗');
      }
    };

    const fetchPaypalClientId = async () => {
        const { data: { clientId } } = await axios.get('/api/config/paypal');
        setPaypalClientId(clientId);
    }

    if (userInfo && orderId) {
      fetchOrder();
      fetchPaypalClientId();
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [orderId, userInfo]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`/api/orders/${orderId}/pay`, details, config);
            // 重新獲取訂單資料來更新付款狀態
            const { data: updatedOrder } = await axios.get(`/api/orders/${orderId}`, config);
            setOrder(updatedOrder);
            alert('付款成功！');
        } catch (err) {
            alert(err.response?.data?.message || '更新訂單狀態失敗');
        }
    });
  };

  if (loading) return <p>載入中...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!order) return <p>找不到訂單</p>;

  return (
    <Row>
      <Col md={8}>
         <ListGroup variant='flush'>
            <ListGroup.Item>
                <h2>訂單 {order._id}</h2>
                <p><strong>姓名:</strong> {order.user.name}</p>
                <p><strong>Email:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                <p><strong>地址:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                {order.isDelivered ? <p style={{color: 'green'}}>已於 {order.deliveredAt} 出貨</p> : <p style={{color: 'red'}}>未出貨</p>}
            </ListGroup.Item>
            {/* ... (其他 ListGroup.Item ... */}
         </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item><h2>訂單總覽</h2></ListGroup.Item>
                {/* ... (價格總覽) ... */}
                {!order.isPaid && (
                    <ListGroup.Item>
                        {loading || !paypalClientId ? <p>載入付款按鈕...</p> : (
                            <PayPalScriptProvider options={{ 'client-id': paypalClientId }}>
                                <PayPalButtons
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [{ amount: { value: order.totalPrice } }]
                                        });
                                    }}
                                    onApprove={onApprove}
                                />
                            </PayPalScriptProvider>
                        )}
                    </ListGroup.Item>
                )}
                {order.isPaid && <ListGroup.Item><p style={{color: 'green'}}>已於 {order.paidAt} 付款</p></ListGroup.Item>}
            </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderPage;