import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// 處理 /api/products 的路由
router.route('/')
  .get(getProducts) // GET 請求由 getProducts 處理
  .post(protect, admin, createProduct); // POST 請求由 createProduct 處理

// 處理 /api/products/:id 的路由
router.route('/:id')
  .get(getProductById) // GET 請求由 getProductById 處理
  .put(protect, admin, updateProduct) // PUT 請求由 updateProduct 處理
  .delete(protect, admin, deleteProduct); // DELETE 請求由 deleteProduct 處理

export default router;