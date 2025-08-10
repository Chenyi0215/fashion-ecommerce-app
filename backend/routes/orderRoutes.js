import express from 'express';
const router = express.Router();import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// 所有對 /api/orders 的 POST 請求，都會由 addOrderItems 這個控制器處理
// protect 中間件會確保只有登入的使用者才能下訂單
router.route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders); 
router.route('/myorders').get(protect, getMyOrders); 

router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered); 

export default router;