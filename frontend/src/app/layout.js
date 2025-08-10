import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Container } from 'react-bootstrap';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { StoreProvider } from '@/contexts/StoreContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const metadata = {
  title: 'chooWear',
  description: '由 Next.js, Node.js, MongoDB 驅動',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {/* ## 核心修正：將所有內容都包在這個 div 裡面 ## */}
        <div className='d-flex flex-column min-vh-100'>
          <StoreProvider>
            <Header />
            <main className='py-3 flex-grow-1'>
              <Container>{children}</Container>
            </main>
            <Footer />
            <ToastContainer />
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}