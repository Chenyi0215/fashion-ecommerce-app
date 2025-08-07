import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 檢查請求的 Header 中是否帶有 'Authorization' 且以 'Bearer' 開頭
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 取得 token (去掉 'Bearer ' 字首)
      token = req.headers.authorization.split(' ')[1];

      // 驗證 token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 透過 token 中的 id 找到使用者，並將使用者資料附加到 req 物件上 (不包含密碼)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // 驗證通過，放行至下一個中間件或路由處理器
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  // protect 中間件會先執行，所以我們在這裡可以拿到 req.user
  if (req.user && req.user.role === 'admin') {
    next(); // 如果是 admin，放行
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin }; 