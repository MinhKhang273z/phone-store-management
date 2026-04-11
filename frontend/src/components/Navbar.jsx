import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // File CSS riêng biệt cho Navbar

const Navbar = ({ searchTerm, setSearchTerm }) => {
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
          <Link to="/login" className="navbar-link">
            Đăng nhập
          </Link>
          <span className="navbar-divider">|</span>
          <Link to="/register" className="navbar-link">
            Đăng ký
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
