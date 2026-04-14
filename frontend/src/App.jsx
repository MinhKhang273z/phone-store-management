import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail'; // Import trang chi tiết bạn vừa tạo
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <div className="app-container">
        {/* Navbar nhận searchTerm để xử lý tìm kiếm */}
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <main className="main-content">
          <Routes>
            {/* Trang chủ hiển thị danh sách sản phẩm */}
            <Route path="/" element={<Home searchTerm={searchTerm} />} />

            {/* ĐÂY LÀ DÒNG BẠN CẦN THÊM: Trang chi tiết sản phẩm */}
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* Các trang chức năng khác */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2026 Phone Store Management - Thành viên 2 Project</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;