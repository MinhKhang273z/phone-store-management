import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Xử lý khi nhấn nút Đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Gọi API đăng nhập
      const response = await login(username, password);
      
      // Nếu thành công (status 200)
      if (response.data && response.data.token) {
        // Lưu token và username vào localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        
        alert("Đăng nhập thành công");
        
        // Chuyển hướng về trang chủ
        // Sử dụng window.location.href để load lại state thẻ Navbar
        window.location.href = '/';
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Tài khoản hoặc mật khẩu không chính xác!");
      } else {
        alert("Có lỗi xảy ra khi kết nối máy chủ");
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Đăng nhập</h2>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            required 
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            required 
          />
        </div>

        <button type="submit" className="btn-primary" style={{ padding: '10px', width: '100%', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
