'use client';

import React, { useState, useEffect } from 'react'; // 確保這一行沒有引號
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useStore } from '@/contexts/StoreContext';

const Header = () => {
  const { userInfo, logout } = useStore();

  const [isMounted, setIsMounted] = useState(false);

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

              {isMounted &&
                (userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item href='/profile'>
                      個人資料
                    </NavDropdown.Item>

                    {userInfo.role === 'admin' && (
                      <>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href='/admin/products'>
                          商品管理
                        </NavDropdown.Item>
                        <NavDropdown.Item href='/admin/orders'>
                          訂單管理
                        </NavDropdown.Item>
                        <NavDropdown.Item href='/admin/users'>
                          使用者管理
                        </NavDropdown.Item>
                      </>
                    )}

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      登出
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link href='/login'>
                    <FaUser /> 登入
                  </Nav.Link>
                ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;