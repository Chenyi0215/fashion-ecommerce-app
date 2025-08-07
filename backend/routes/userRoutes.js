import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile, // 引入新的控制器
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'; // 引入我們的「警衛」


router.route('/').post(registerUser); // POST 到 /api/users 代表註冊
router.post('/login', authUser); // POST 到 /api/users/login 代表登入

// 將 protect 中間件放在 getUserProfile 前面
// 代表要存取這個路由前，必須先通過 protect 的檢查
router.route('/profile').get(protect, getUserProfile);

export default router;