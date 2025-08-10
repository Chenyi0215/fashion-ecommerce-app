'use client';
import { useState, useEffect } from 'react'; // 1. 引入 useState 和 useEffect
import { useRouter } from 'next/navigation';
import { useStore } from '@/contexts/StoreContext';

export default function AdminLayout({ children }) {
  const { userInfo } = useStore();
  const router = useRouter();

  // 2. 建立一個狀態來追蹤元件是否已在客戶端掛載
  const [isMounted, setIsMounted] = useState(false);

  // 3. 使用 useEffect，它只會在客戶端執行一次
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // 確保在 isMounted 和 userInfo 都準備好之後再做判斷
    if (isMounted && (!userInfo || userInfo.role !== 'admin')) {
      router.push('/');
    }
  }, [userInfo, router, isMounted]);

  // 4. 在 isMounted 為 false 或身份不符時，顯示一個一致的載入中訊息
  // 這樣可以確保伺服器和客戶端的首次渲染結果相同
  if (!isMounted || !userInfo || userInfo.role !== 'admin') {
    return <p>正在驗證管理員身份...</p>;
  }

  // 5. 驗證通過，顯示對應的管理員頁面
  return <>{children}</>;
}