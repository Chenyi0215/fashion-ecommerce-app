import React from 'react';
import ProductDetails from '@/components/ProductDetails';

const ProductPage = async ({ params }) => {
  try {
    // ## 核心修正：直接在 fetch 中使用 params.id ##
    // 我們不再預先解構 const { id } = params;
    const res = await fetch(`http://localhost:5000/api/products/${params.id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
       return <ProductDetails product={null} />;
    }

    const product = await res.json();

    return <ProductDetails product={product} />;

  } catch (error) {
    console.error(error);
    return <div>讀取資料時發生錯誤。</div>;
  }
};

export default ProductPage;