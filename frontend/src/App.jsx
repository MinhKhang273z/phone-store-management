import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail'; 
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <div className="app-container">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        {/* ĐÃ SỬA: Thêm style trực tiếp vào thẻ footer để ghim nó xuống góc trái */}
        <footer style={{ 
          position: 'fixed', 
          bottom: '10px', 
          left: '10px', 
          fontSize: '14px', 
          color: '#555', 
          zIndex: 1000 
        }}>
          <p style={{ margin: 0 }}>© 2026 Phone Store Management </p>
        </footer>
        
      </div>
    </Router>
  );
}

export default App;