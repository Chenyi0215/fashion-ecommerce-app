'use client';
import { useState, useEffect } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import { useStore } from '@/contexts/StoreContext';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useStore();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get('/api/orders', config);
        setOrders(data);
      } catch (err) {
        setError('讀取訂單失敗');
      }
      setLoading(false);
    };

    if (userInfo && userInfo.role === 'admin') {
      fetchOrders();
    }
  }, [userInfo]);

    if (loading) {
    return (
      <div className='d-flex justify-content-center'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      <h1>訂單管理</h1>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>使用者</th>
            <th>日期</th>
            <th>總金額</th>
            <th>已付款</th>
            <th>已出貨</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>${order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </td>
              <td>
                <Link href={`/order/${order._id}`}>
                  <Button variant='light' className='btn-sm'>
                    詳情
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminOrdersPage;