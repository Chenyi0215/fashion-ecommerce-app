'use client';
import { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import { useStore } from '@/contexts/StoreContext';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { userInfo } = useStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('確定要刪除這個商品嗎？')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`/api/products/${id}`, config);
        setProducts(products.filter((p) => p._id !== id));
      } catch (error) {
        alert('刪除失敗');
      }
    }
  };

  const createProductHandler = async () => { /* 之後會實作 */ };

  return (
    <Row>
      <Col>
        <h1>商品管理</h1>
      </Col>
      <Col className='text-end'>
        <Button className='my-3' onClick={createProductHandler}>
          <FaEdit /> 新增商品
        </Button>
      </Col>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th><th>名稱</th><th>價格</th><th>分類</th><th>品牌</th><th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <Link href={`/admin/products/${product._id}/edit`}>
                  <Button variant='light' className='btn-sm mx-2'><FaEdit /></Button>
                </Link>
                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  );
};

export default AdminProductsPage;