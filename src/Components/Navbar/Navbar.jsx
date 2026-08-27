import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const [companyOpen, setCompanyOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <div className="nav-logo-mark">LINT</div>
        </Link>
      </div>

    <svg
  className="nav-dropdown"
  onClick={dropdown_toggle}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
>
  <path d="M6 9l6 6 6-6" />
</svg>

      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu('mens')}>
          <Link to="/mens">Men</Link>
        </li>
        <li onClick={() => setMenu('womens')}>
          <Link to="/womens">Women</Link>
        </li>
        <li onClick={() => setMenu('kids')}>
          <Link to="/kids">Kids</Link>
        </li>
      </ul>

      <div className="nav-search">
        <input type="text" placeholder="Search for product, category..." />
      </div>

      <div className="nav-icons">
        <Link to="/cart" className="nav-icon-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6h15l-1.5 9h-12L4 3H2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="20" r="1.4" fill="currentColor" />
            <circle cx="18" cy="20" r="1.4" fill="currentColor" />
          </svg>
          {getTotalCartItems() > 0 && (
            <span className="nav-cart-count">{getTotalCartItems()}</span>
          )}
        </Link>

        <Link to="/login" className="nav-icon-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
            <path
              d="M4.5 20c1.4-3.4 4.3-5.5 7.5-5.5s6.1 2.1 7.5 5.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;