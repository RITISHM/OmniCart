import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH API ====================

export const authAPI = {
  // Register new user
  register: async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', response.data.name);
        localStorage.setItem('userEmail', response.data.email);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', response.data.name);
        localStorage.setItem('userEmail', response.data.email);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  }
};

// ==================== USER API ====================

export const userAPI = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      // Update localStorage with new data
      if (response.data.name) {
        localStorage.setItem('userName', response.data.name);
      }
      if (response.data.email) {
        localStorage.setItem('userEmail', response.data.email);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// ==================== PRODUCT API ====================

export const productAPI = {
  // Get all products
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get product by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get products by category
  getByCategory: async (category, sort = 'featured') => {
    try {
      const response = await api.get('/products', {
        params: { category, sort }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Search products
  search: async (searchTerm) => {
    try {
      const response = await api.get('/products', {
        params: { search: searchTerm }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// ==================== ORDER API ====================

export const orderAPI = {
  // Create new order
  create: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user's orders
  getMyOrders: async () => {
    try {
      const response = await api.get('/orders/myorders');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get order by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default api;
