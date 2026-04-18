import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  // Kiểm tra user có trong localStorage hay không
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    // Refresh the page or navigate to login
    window.location.href = '/login';
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        {/* Tên website */}
        <Link to="/" className="navbar-logo">
          Phone Store
        </Link>

        {/* Ô tìm kiếm sản phẩm bo góc */}
        <div className="navbar-search-wrapper">
          <input 
            type="text" 
            placeholder="Tìm kiếm điện thoại, phụ kiện..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="navbar-search-input"
          />
        </div>

        {/* Các nút điều hướng */}
        <div className="navbar-actions">
          {/* Giỏ hàng */}
          <Link to="/cart" className="navbar-cart">
            <span className="cart-icon">🛒</span>
            <span className="cart-badge">{totalItems}</span>
          </Link>

          <span className="navbar-divider"></span>

          {username ? (
            <>
              {role === 'ADMIN' && (
                <>
                  <Link to="/admin" className="navbar-link" style={{ color: '#ff4d4d', fontWeight: 'bold' }}>
                    Admin
                  </Link>
                  <span className="navbar-divider">|</span>
                </>
              )}
              <span className="navbar-link" style={{ fontWeight: 'bold' }}>
                👤 {username}
              </span>
              <span className="navbar-divider">|</span>
              <button 
                 onClick={handleLogout} 
                 className="navbar-link" 
                 style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', outline: 'none', color: '#333' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Đăng nhập
              </Link>
              <span className="navbar-divider">|</span>
              <Link to="/register" className="navbar-link">
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
