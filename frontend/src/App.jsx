import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  // Quản lý state tìm kiếm từ App để truyền xuống Navbar (nhập) và Home (lọc)
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <BrowserRouter>
      {/* 
        Navbar hiển thị trên mọi trang, truyền searchTerm và hàm đổi State
      */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <main style={{ minHeight: '80vh', padding: '20px' }}>
        <Routes>
          {/* Trang chủ: Truyền searchTerm xuống để Home lọc sản phẩm */}
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
