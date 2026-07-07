import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/user/register', data),
  login: (data) => api.post('/user/login', data),
};

export const productAPI = {
  getAll: (page = 1, limit = 20) => api.get(`/product?page=${page}&limit=${limit}`),
  getSingle: (id) => api.get(`/product/${id}`),
  createProduct: (data) => api.post('/product', data),
  updateProduct: (id, data) => api.put(`/product/${id}`, data),
  deleteProduct: (id) => api.delete(`/product/${id}`),
};

export const categoryAPI = {
  getAll: () => api.get('/category'),
};

export const cartAPI = {          // ← Ye sahi se export ho raha hai
  addToCart: (productId, quantity = 1) =>
    api.post('/cart/add', { productId, quantity }),
  getCart: () => api.get('/cart'),
  removeFromCart: (productId) =>
    api.post('/cart/remove', { productId }),
};

export const orderAPI = {
  createOrder: (orderData) => api.post('/order/create', orderData),
  getMyOrders: () => api.get('/order'),
  getAllOrders: () => api.get('/order/all'),        // Admin ke liye
  updateOrderStatus: (id, status) => 
    api.put(`/order/status/${id}`, { status }),
};

export default api;