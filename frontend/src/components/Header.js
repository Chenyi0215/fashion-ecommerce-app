'use client';

import React, { useState, useEffect } from 'react'; // 1. 引入 useState 和 useEffect
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useStore } from '@/contexts/StoreContext'; 

const Header = () => {
  const { userInfo, logout } = useStore();

  // 2. 建立一個狀態來追蹤元件是否已在客戶端掛載
  const [isMounted, setIsMounted] = useState(false);

  // 3. 使用 useEffect，它只會在客戶端執行一次
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const logoutHandler = () => {
    logout();
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>chooWear</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/cart'>
                <FaShoppingCart /> 購物車
              </Nav.Link>

              {/* 4. 在 isMounted 為 true 之後，才渲染依賴 userInfo 的部分 */}
              {isMounted && (
                userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item href='/profile'>個人資料</NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      登出
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link href='/login'>
                    <FaUser /> 登入
                  </Nav.Link>
                )
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;