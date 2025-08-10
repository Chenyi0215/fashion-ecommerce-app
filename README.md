# 時尚電商平台 (StyleSphere - A Full-Stack E-Commerce Platform)

這是一個使用 MERN 技術棧 (MongoDB, Express, React, Node.js) 加上 Next.js 框架，從零開始打造的全功能、響應式的時尚電商網站。專案靈感來自 ZARA，旨在展示一個完整的、真實世界的全端應用開發流程。

**➡️ 強烈建議：** 在這裡放上您部署後的線上 DEMO 連結！

---
## 主要功能 (Features)

### 顧客功能
- ✅ **商品瀏覽**：響應式的商品列表與單一商品詳情頁。
- ✅ **完整購物流程**：功能齊全的購物車，使用 `localStorage` 持久化儲存，即使刷新頁面也不會遺失。
- ✅ **完整結帳流程**：從登入、填寫運送地址、選擇付款方式到最後確認下單的完整使用者體驗。
- ✅ **真實付款功能**：整合 **PayPal Developer Sandbox** 進行模擬付款，並在成功後即時更新訂單狀態。
- ✅ **使用者認證**：提供註冊、登入、登出功能，使用 **JWT (JSON Web Tokens)** 進行安全的狀態管理。
- ✅ **會員中心**：使用者可以更新個人資料（姓名、Email、密碼），並查看個人的歷史訂單列表與狀態。

### 管理員 (Admin) 功能
- ✅ **受保護的管理員路由**：只有管理員帳號才能進入 `/admin` 開頭的所有後台管理頁面。
- ✅ **商品管理 (CRUD)**：在後台介面上，對所有商品進行**新增**、**讀取**、**更新**、**刪除**操作。
- ✅ **訂單管理**：查看所有使用者的訂單列表，並可將訂單手動更新為**「已出貨」**狀態。
- ✅ **使用者管理 (CRUD)**：查看所有註冊使用者列表，並可**刪除**使用者或將其**提升為管理員**。

---

## 使用的技術棧 (Tech Stack)

* **前端 (Frontend)**:
    * [Next.js](https://nextjs.org/) 13+ (App Router)
    * [React](https://reactjs.org/) 18+
    * [React-Bootstrap](https://react-bootstrap.github.io/) & Bootstrap 5
    * [React Context API](https://reactjs.org/docs/context.html) (全域狀態管理)
    * [Axios](https://axios-http.com/)
    * [@paypal/react-paypal-js](https://www.npmjs.com/package/@paypal/react-paypal-js)
    * [react-toastify](https://fkhadra.github.io/react-toastify/introduction/) (提示訊息)

* **後端 (Backend)**:
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/)
    * [MongoDB](https://www.mongodb.com/) (with [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
    * [Mongoose](https://mongoosejs.com/)
    * [JSON Web Tokens (JWT)](https://jwt.io/)
    * [BcryptJS](https://github.com/dcodeIO/bcrypt.js)

---

## 如何在本機運行 (Getting Started)

### **事前準備**
* 安裝 [Node.js](https://nodejs.org/) (v18 或以上)
* 取得 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 連線字串 (MONGO_URI)
* 取得 [PayPal Developer](https://developer.paypal.com/dashboard/) 的 Sandbox Client ID

### **安裝步驟**

1.  **Clone 專案**
    ```bash
    git clone [https://github.com/您的Github帳號/您的專案名稱.git](https://github.com/您的Github帳號/您的專案名稱.git)
    cd 您的專案名稱
    ```

2.  **設定後端**
    ```bash
    cd backend
    npm install
    ```
    在 `backend` 資料夾中，建立一個 `.env` 檔案，並填入以下內容：
    ```
    NODE_ENV=development
    PORT=5000
    MONGO_URI=您的MongoDB連線字串
    JWT_SECRET=隨機的英數密鑰
    PAYPAL_CLIENT_ID=您的PayPal_Client_ID
    ```
    將範例資料匯入您的資料庫：
    ```bash
    npm run data:import
    ```
    啟動後端伺服器 (會運行在 `http://127.0.0.1:5000`):
    ```bash
    npm run server
    ```

3.  **設定前端**
    (打開一個新的終端機)
    ```bash
    cd frontend
    npm install
    ```
    啟動前端開發伺服器 (會運行在 `http://localhost:3000`):
    ```bash
    npm run dev
    ```


4.  **管理員帳號**
    * Email: `admin@example.com`
    * Password: `123456`

---

## 聯絡我 (Contact)

[陳宸宇 Tang Chen Yi] - [Chenyitang0435@gmail.com] 