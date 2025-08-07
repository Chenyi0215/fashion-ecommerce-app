import React from 'react';
import ProductDetails from '@/components/ProductDetails'; // 現在這個引入會成功

// 這是伺服器元件，專門獲取資料
const ProductPage = async ({ params }) => {
  const { id } = params;

  try {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      cache: 'no-store',
    });

    // 檢查 res.ok 是否為 true
    if (!res.ok) {
       // 如果商品不存在 (例如 404)，回傳一個提示訊息
       return <ProductDetails product={null} />;
    }

    const product = await res.json();

    // 獲取資料後，傳遞給客戶端元件去渲染
    return <ProductDetails product={product} />;

  } catch (error) {
    console.error(error);
    return <div>讀取資料時發生錯誤。</div>;
  }
};

export default ProductPage;