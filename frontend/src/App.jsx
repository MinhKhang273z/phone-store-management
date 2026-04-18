import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail'; 
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AdminDashboard from './pages/admin/AdminDashboard'; 
import ProtectedRoute from './components/ProtectedRoute'; 
import './App.css';

/**
 * AppContent - Component bao bọc để sử dụng useLocation()
 */
function AppContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  
  // Kiểm tra nếu đang ở trang Admin thì không hiện Navbar chung
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {/* Ẩn Navbar nếu là trang Admin */}
      {!isAdminPath && <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          
          {/* Route dành riêng cho Admin (Có bảo vệ) */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;