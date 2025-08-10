import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// 取得所有使用者(Admin) 和 註冊使用者(Public)
router.route('/').post(registerUser).get(protect, admin, getUsers);

// 登入
router.post('/login', authUser);

// 個人資料 (讀取與更新)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// 特定使用者 (Admin) (讀取、刪除、更新)
// 這條必須放在最後，因為 ':id' 會匹配很多路徑
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;