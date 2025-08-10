# 時尚電商平台 (StyleSphere - A Full-Stack E-Commerce Platform)

這是一個使用 MERN 技術棧 (MongoDB, Express, React, Node.js) 加上 Next.js 框架，從零開始打造的全功能、響應式的時尚電商網站。專案靈感來自 ZARA，旨在展示一個完整的、真實世界的全端應用開發流程。

**➡️ 強烈建議：** 在這裡放上您部署後的線上 DEMO 連結！

---

## 專案畫面截圖 (Screenshots)

**強烈建議您**將自己的專案畫面截圖後，取代下方的圖片連結。一份有圖片的 README 會讓您的專案看起來專業十倍！

| 首頁 | 商品詳情 |
| :---: | :---: |
| ![首頁截圖](https://i.imgur.com/your-homepage-image.png) | ![商品詳情頁截圖](https://i.imgur.com/your-productpage-image.png) |

| 購物車 | 管理員後台 - 商品管理 |
| :---: | :---: |
| ![購物車截圖](https://i.imgur.com/your-cart-image.png) | ![管理員後台截圖](https://i.imgur.com/your-admin-image.png) |

---

## 主要功能 (Features)

### 一般使用者
- ✅ **商品瀏覽**：首頁商品列表與單一商品詳情頁。
- ✅ **完整購物流程**：功能齊全的購物車，使用 `localStorage` 持久化儲存。
- ✅ **完整結帳流程**：從登入、填寫運送地址、選擇付款方式到最後確認下單。
- ✅ **真實付款功能**：整合 PayPal 沙盒 (Sandbox) 進行模擬付款。
- ✅ **使用者認證**：註冊、登入、登出功能，使用 JWT (JSON Web Tokens) 進行狀態管理。
- ✅ **會員中心**：使用者可以更新個人資料並查看個人的歷史訂單列表。

### 管理員 (Admin)
- ✅ **受保護的管理員路由**：只有管理員帳號才能進入後台管理區。
- ✅ **商品管理 (CRUD)**：在後台介面上，對所有商品進行新增、讀取、更新、刪除操作。
- ✅ **訂單管理**：查看所有使用者的訂單列表，並可將訂單更新為「已出貨」狀態。
- ✅ **使用者管理**：查看所有註冊使用者列表，並可刪除使用者。

---

## 使用的技術棧 (Tech Stack)

* **前端 (Frontend)**:
    * [Next.js](https://nextjs.org/) (React 框架)
    * [React-Bootstrap](https://react-bootstrap.github.io/) (UI 元件庫)
    * [Axios](https://axios-http.com/) (HTTP 請求)
    * [React Icons](https://react-icons.github.io/react-icons/)
    * **React Context API** (全域狀態管理)

* **後端 (Backend)**:
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/) (Web 框架)
    * [MongoDB](https://www.mongodb.com/) (資料庫)
    * [Mongoose](https://mongoosejs.com/) (MongoDB 物件模型)
    * [JSON Web Tokens (JWT)](https://jwt.io/) (使用者認證)
    * [BcryptJS](https://github.com/dcodeIO/bcrypt.js) (密碼加密)

* **開發工具**:
    * VS Code
    * Git & GitHub (版本控制)
    * Nodemon (後端熱更新)
    * Thunder Client (API 測試)

---

## 如何在本機運行 (Getting Started)

請依照以下步驟來設定並運行此專案。

### **事前準備**
您需要先安裝好 [Node.js](https://nodejs.org/)。
您也需要從 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 取得您的 MongoDB 連線字串 (MONGO_URI) 和從 [PayPal Developer](https://developer.paypal.com/dashboard/) 取得您的 PayPal Client ID。

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
    JWT_SECRET=yoursecretkey123
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