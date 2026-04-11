import axios from 'axios';

// Khởi tạo instance của axios
const API_URL = 'http://localhost:8081/api/auth';

// Hàm đăng nhập
export const login = async (username, password) => {
  return await axios.post(`${API_URL}/login`, {
    username,
    password
  });
};

// Hàm đăng ký
export const register = async (username, email, password) => {
  return await axios.post(`${API_URL}/register`, {
    username,
    email,
    password
  });
};
