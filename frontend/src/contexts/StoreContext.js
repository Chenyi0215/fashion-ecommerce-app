'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// 1. 建立 Context
const StoreContext = createContext();

// 2. 建立 Provider 元件
export const StoreProvider = ({ children }) => {
  // 檢查是否在瀏覽器環境中，避免伺服器端渲染時出錯
  const isBrowser = typeof window !== 'undefined';

  const [cartItems, setCartItems] = useState(() => {
    if (!isBrowser) return [];
    try {
      const items = localStorage.getItem('cartItems');
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error('Failed to parse cart items from localStorage', error);
      return [];
    }
  });
  
  // 儲存運送地址
    const [shippingAddress, setShippingAddress] = useState(() => {
    if (!isBrowser) return {}; // 預設為空物件
    try {
      const address = localStorage.getItem('shippingAddress');
      return address ? JSON.parse(address) : {};
    } catch (error) {
      console.error('Failed to parse shipping address from localStorage', error);
      return {};
    }
  });

  //處理付款方式的狀態
    const [paymentMethod, setPaymentMethod] = useState(() => {
    if (!isBrowser) return 'PayPal'; // 預設值
    try {
      const method = localStorage.getItem('paymentMethod');
      return method ? JSON.parse(method) : 'PayPal';
    } catch (error) { return 'PayPal'; }
  });

  // 使用者登入資訊的狀態
 const [userInfo, setUserInfo] = useState(() => {
    if (!isBrowser) return null; // 預設為 null (未登入)
    try {
      const info = localStorage.getItem('userInfo');
      return info ? JSON.parse(info) : null;
    } catch (error) { return null; }
  });


  // 當 cartItems 變動時，將其儲存到 localStorage
  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isBrowser]);

  // 當 shippingAddress 變動時，將其儲存到 localStorage
  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    }
  }, [shippingAddress, isBrowser]);

  // ## 新增部分：儲存付款方式到 localStorage ##
  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
    }
  }, [paymentMethod, isBrowser]);

// 新增商品到購物車（或更新數量）
const addToCart = (product, qty) => {
  const exist = cartItems.find((item) => item._id === product._id);

  if (exist) {
    // 如果商品已存在，直接用新的數量覆蓋舊的數量
    setCartItems(
      cartItems.map((item) =>
        item._id === product._id ? { ...product, qty: qty } : item
      )
    );
  } else {
    // 如果是新商品，則加入到陣列中
    setCartItems([...cartItems, { ...product, qty }]);
  }
};

  // 從購物車移除商品
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  //儲存運送地址的函式
  const saveShippingAddress = (data) => {
    setShippingAddress(data);
  };

  // 儲存付款方式的函式
  const savePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  //使用者登入/登出的函式 
  const login = (userData) => {
    setUserInfo(userData);
    if (isBrowser) {
      localStorage.setItem('userInfo', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUserInfo(null);
    if (isBrowser) {
      // 登出時，清空所有相關的 localStorage
      localStorage.removeItem('userInfo');
      localStorage.removeItem('cartItems');
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
      // 導向到登入頁，確保一個乾淨的開始
      window.location.href = '/login';
    }
  };

return (
    <StoreContext.Provider 
      value={{ 
        cartItems, 
        shippingAddress,
        paymentMethod,
        addToCart, 
        removeFromCart,
        saveShippingAddress,
        savePaymentMethod,
        userInfo,
        login,
        logout, 
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// 3. 建立一個自訂的 Hook，方便其他元件使用
export const useStore = () => {
  return useContext(StoreContext);
};