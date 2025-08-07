import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'; // 引入 user 路由
import productRoutes from './routes/productRoutes.js';

dotenv.config(); // 讓 .env 檔案中的變數可以被讀取

connectDB(); // 連接到 MongoDB 資料庫

const app = express(); // 建立 Express 應用程式

app.use(express.json()); // 關鍵！讓 Express 可以解析請求中的 JSON 格式

// 建立一個測試用的 API 路由
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes); // 將所有 /api/users 的請求導向到 userRoutes

app.use('/api/products', productRoutes);

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // 設定伺服器運行的埠號

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});