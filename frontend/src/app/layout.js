import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Container } from 'react-bootstrap';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { StoreProvider } from '@/contexts/StoreContext';


export const metadata = {
  title: 'chooWear',
  description: '由 Next.js, Node.js, MongoDB 驅動',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {/* 2. 用 CartProvider 將所有內容包起來 */}
        <StoreProvider>
          <Header />
          <main className='py-3'>
            <Container>{children}</Container>
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}