import express from 'express';
const router = express.Router();import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// 所有對 /api/orders 的 POST 請求，都會由 addOrderItems 這個控制器處理
// protect 中間件會確保只有登入的使用者才能下訂單
router.route('/').post(protect, addOrderItems);

router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;