import axios from 'axios';

// 1. Khai báo URL gốc của API (Backend đang chạy ở cổng 8081)
const API_BASE_URL = 'http://localhost:8081/api';

// --- PHẦN AUTH ---
export const login = async (username, password) => {
  return await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
};

export const register = async (username, email, password) => {
  return await axios.post(`${API_BASE_URL}/auth/register`, { username, email, password });
};

// --- PHẦN PRODUCT ---

// 2. Hàm lấy tất cả sản phẩm
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error);
    throw error;
  }
};

// 3. Hàm lấy chi tiết 1 sản phẩm
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy chi tiết sản phẩm:", error);
    throw error;
  }
};

// 4. Các hàm CRUD khác
export const createProduct = async (productData) => {
  return await axios.post(`${API_BASE_URL}/products`, productData);
};

export const deleteProduct = async (id) => {
  return await axios.delete(`${API_BASE_URL}/products/${id}`);
};

// --- PHẦN CART & ORDER (Mới thêm) ---

// Lấy danh sách giỏ hàng của user
export const getCart = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy giỏ hàng:", error);
    throw error;
  }
};

// Thêm sản phẩm vào giỏ
export const addToCartApi = async (cartData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cart`, cartData);
    return response.data;
  } catch (error) {
    console.error("Lỗi thêm vào giỏ hàng:", error);
    throw error;
  }
};

// Xóa sản phẩm khỏi giỏ
export const deleteCartItemApi = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/cart/${id}`);
  } catch (error) {
    console.error("Lỗi xóa sản phẩm khỏi giỏ:", error);
    throw error;
  }
};

// Tạo đơn hàng từ giỏ hàng
export const createOrderApi = async (userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/order`, { userId });
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo đơn hàng:", error);
    throw error;
  }
};