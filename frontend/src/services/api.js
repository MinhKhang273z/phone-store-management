import axios from 'axios';

// 1. Khai báo URL gốc của API (Backend đang chạy ở cổng 8081)
const API_BASE_URL = 'http://localhost:8081/api';

// --- PHẦN AUTH (Bạn đã có) ---
export const login = async (username, password) => {
  return await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
};

export const register = async (username, email, password) => {
  return await axios.post(`${API_BASE_URL}/auth/register`, { username, email, password });
};

// --- PHẦN PRODUCT (Nhiệm vụ Thành viên 2) ---

// 2. Hàm lấy tất cả sản phẩm (Nhiệm vụ: GET /api/products)
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data; // Trả về danh sách sản phẩm
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error);
    throw error;
  }
};

// 3. Hàm lấy chi tiết 1 sản phẩm (Nhiệm vụ: GET /api/products/{id})
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy chi tiết sản phẩm:", error);
    throw error;
  }
};

// 4. Các hàm CRUD khác (Nếu bạn làm trang Quản trị)
export const createProduct = async (productData) => {
  return await axios.post(`${API_BASE_URL}/products`, productData);
};

export const deleteProduct = async (id) => {
  return await axios.delete(`${API_BASE_URL}/products/${id}`);
};