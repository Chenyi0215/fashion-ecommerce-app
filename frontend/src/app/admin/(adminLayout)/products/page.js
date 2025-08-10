'use client';
import { useState, useEffect } from 'react';
import { Table, Button, Row, Col, } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useStore } from '@/contexts/StoreContext';
import { toast } from 'react-toastify'; 

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { userInfo } = useStore();
  const router = useRouter(); 

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

  const createProductHandler = async () => {
    if (window.confirm('您確定要建立一個新商品嗎？')) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        // 呼叫後端 API 建立商品，第二個參數傳入空物件
        const { data: createdProduct } = await axios.post('/api/products', {}, config);
        toast.success('商品已建立');
        // 導向到新商品的編輯頁面
        router.push(`/admin/products/${createdProduct._id}/edit`);
      } catch (error) {
        toast.error(error.response?.data?.message || '建立商品失敗');
      }
    }
  };


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