import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config(); // 讓 .env 檔案中的變數可以被讀取
connectDB(); // 連接到 MongoDB 資料庫

const app = express(); // 建立 Express 應用程式

const PORT = process.env.PORT || 5000; // 設定伺服器運行的埠號

// 建立一個測試用的 API 路由
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});