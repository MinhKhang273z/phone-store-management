import axios from 'axios';

// 1. Khai báo URL gốc của API (Backend đang chạy ở cổng 8081)
const API_BASE_URL = 'http://localhost:8081/api';

// Helper để log
const logRequest = (name, data) => {
    console.log(`[API Request] Calling ${name}...`, data || "");
};
const logResponse = (name, data) => {
    console.log(`[API Response] Success from ${name}:`, data);
};

// --- PHẦN AUTH ---
export const login = async (username, password) => {
  logRequest("login", { username });
  const res = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
  logResponse("login", res.data);
  return res;
};

export const register = async (username, email, password) => {
  logRequest("register", { username, email });
  const res = await axios.post(`${API_BASE_URL}/auth/register`, { username, email, password });
  logResponse("register", res.data);
  return res;
};

// --- PHẦN USERS ---

export const getAllUsersApi = async () => {
    logRequest("getAllUsersApi");
    const res = await axios.get(`${API_BASE_URL}/users`);
    logResponse("getAllUsersApi", res.data);
    return res.data;
};

export const deleteUserApi = async (id) => {
    logRequest("deleteUserApi", id);
    const res = await axios.delete(`${API_BASE_URL}/users/${id}`);
    logResponse("deleteUserApi", "Deleted");
    return res;
};

// --- PHẦN PRODUCT ---

export const getAllProducts = async () => {
  try {
    logRequest("getAllProducts");
    const response = await axios.get(`${API_BASE_URL}/products`);
    logResponse("getAllProducts", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    logRequest("getProductById", id);
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    logResponse("getProductById", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy chi tiết sản phẩm:", error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  logRequest("createProduct", productData);
  const res = await axios.post(`${API_BASE_URL}/products`, productData);
  logResponse("createProduct", res.data);
  return res;
};

export const bulkCreateProducts = async (productsArray) => {
  logRequest("bulkCreateProducts", `Count: ${productsArray.length}`);
  const res = await axios.post(`${API_BASE_URL}/products/bulk`, productsArray);
  logResponse("bulkCreateProducts", res.data);
  return res;
};

export const updateProduct = async (id, productData) => {
  logRequest("updateProduct", { id, productData });
  const res = await axios.put(`${API_BASE_URL}/products/${id}`, productData);
  logResponse("updateProduct", res.data);
  return res;
};

export const deleteProduct = async (id) => {
  logRequest("deleteProduct", id);
  const res = await axios.delete(`${API_BASE_URL}/products/${id}`);
  logResponse("deleteProduct", "Deleted");
  return res;
};

// --- PHẦN CART & ORDER ---

export const getCart = async (userId) => {
  try {
    logRequest("getCart", userId);
    const response = await axios.get(`${API_BASE_URL}/cart/${userId}`);
    logResponse("getCart", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy giỏ hàng:", error);
    throw error;
  }
};

export const addToCartApi = async (cartData) => {
  try {
    logRequest("addToCartApi", cartData);
    const response = await axios.post(`${API_BASE_URL}/cart`, cartData);
    logResponse("addToCartApi", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi thêm vào giỏ hàng:", error);
    throw error;
  }
};

export const deleteCartItemApi = async (id) => {
  try {
    logRequest("deleteCartItemApi", id);
    await axios.delete(`${API_BASE_URL}/cart/${id}`);
    logResponse("deleteCartItemApi", "Deleted");
  } catch (error) {
    console.error("Lỗi xóa sản phẩm khỏi giỏ:", error);
    throw error;
  }
};

export const createOrderApi = async (userId) => {
  try {
    logRequest("createOrderApi", userId);
    const response = await axios.post(`${API_BASE_URL}/order`, { userId });
    logResponse("createOrderApi", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi tạo đơn hàng:", error);
    throw error;
  }
};

// --- PHẦN ADMIN ORDER & STATS ---

export const getAllOrdersApi = async () => {
    try {
        logRequest("getAllOrdersApi");
        const response = await axios.get(`${API_BASE_URL}/order`);
        logResponse("getAllOrdersApi", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy danh sách đơn hàng:", error);
        throw error;
    }
};

export const updateOrderStatusApi = async (id, status) => {
    try {
        logRequest("updateOrderStatusApi", { id, status });
        const response = await axios.put(`${API_BASE_URL}/order/${id}/status`, { status });
        logResponse("updateOrderStatusApi", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi cập nhật trạng thái đơn hàng:", error);
        throw error;
    }
};

export const getAdminStatsApi = async () => {
    logRequest("getAdminStatsApi");
    const res = await axios.get(`${API_BASE_URL}/admin/stats`);
    logResponse("getAdminStatsApi", res.data);
    return res.data;
};