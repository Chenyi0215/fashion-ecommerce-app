import Product from '@/components/Product';
import { Row, Col } from 'react-bootstrap';

const HomePage = async () => {
  // 這段程式碼在伺服器端執行，直接向後端 API 抓取資料
  // 因此不需要擔心瀏覽器的 CORS 跨域問題
const res = await fetch(`${process.env.API_URL}/api/products`, { cache: 'no-store' });  const products = await res.json();

  return (
    <>
      <h1>最新商品</h1>
      <Row>
        {/* 將抓取到的商品陣列，用 map 函式一個個渲染成 Product 元件 */}
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}className="d-flex align-items-stretch">
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;