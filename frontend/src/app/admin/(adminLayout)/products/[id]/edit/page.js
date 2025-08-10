'use client';

import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useStore } from '@/contexts/StoreContext';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const AdminProductEditPage = () => {
  const params = useParams();
  const { id: productId } = params;
  const router = useRouter();
  const { userInfo } = useStore();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setStock(data.stock);
        setDescription(data.description);
      } catch (err) {
        setError('讀取商品資料失敗');
        toast.error('讀取商品資料失敗');
      }
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(
        `/api/products/${productId}`,
        { name, price, image, brand, category, stock, description },
        config
      );
      toast.success('商品更新成功');
      router.push('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || '更新失敗');
    }
  };

  if (loading) return <Spinner animation='border' />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      <Link href='/admin/products' className='btn btn-light my-3'>
        返回商品列表
      </Link>
      <h1>編輯商品</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-2'>
          <Form.Label>名稱</Form.Label>
          <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='price' className='my-2'>
          <Form.Label>價格</Form.Label>
          <Form.Control type='number' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
        </Form.Group>
        
        {/* 註：一個更進階的功能是實作檔案上傳，但目前我們先以手動輸入圖片路徑的方式進行 */}
        <Form.Group controlId='image' className='my-2'>
          <Form.Label>圖片路徑</Form.Label>
          <Form.Control type='text' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='brand' className='my-2'>
          <Form.Label>品牌</Form.Label>
          <Form.Control type='text' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='stock' className='my-2'>
          <Form.Label>庫存</Form.Label>
          <Form.Control type='number' value={stock} onChange={(e) => setStock(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='category' className='my-2'>
          <Form.Label>分類</Form.Label>
          <Form.Control type='text' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='description' className='my-2'>
          <Form.Label>描述</Form.Label>
          <Form.Control as='textarea' rows={3} value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-2'>
          更新
        </Button>
      </Form>
    </>
  );
};

export default AdminProductEditPage;