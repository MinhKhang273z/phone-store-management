import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Xử lý khi nhấn nút Đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Gọi API đăng ký
      await register(username, email, password);
      
      alert("Đăng ký thành công! Hãy đăng nhập.");
      // Đăng ký thành công, chuyển hướng người dùng tới trang Đăng nhập
      navigate('/login');
    } catch (error) {
       if (error.response && error.response.data) {
         alert("Lỗi đăng ký: " + error.response.data);
       } else {
         alert("Đăng ký thất bại!");
       }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Đăng ký tài khoản</h2>
      
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Register;
