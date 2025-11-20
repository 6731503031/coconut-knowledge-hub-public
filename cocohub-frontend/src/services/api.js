import axios from 'axios';

const API_URL = 'https://coconut-knowledge-hub-public.onrender.com/api';

const apiClient = axios.create({
    baseURL: API_URL,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// (Auth Service - ถ้าคุณมี)
// export const login = (credentials) => apiClient.post('/auth/login', credentials);
// export const register = (userData) => apiClient.post('/auth/register', userData);

// (Product Services)
export const createProduct = (productData, lang) => { 
  // (Body คือ productData, Params คือ lang)
  return apiClient.post('/products', productData, { 
    params: {
      lang: lang 
    }
  });
};

export const uploadImage = (file) => {
  const fd = new FormData();
  fd.append('file', file);
  return apiClient.post('/uploads/image', fd, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getMyProducts = (lang) => {
  // (ใช้ apiClient และส่ง params)
  return apiClient.get('/products/my-products', { 
    params: {
      lang: lang
    }
  });
};

export const deleteProduct = (productId) => {
  return apiClient.delete(`/products/${productId}`);
};

export const postRating = (productId, ratingData) => {
  return apiClient.post(`/products/${productId}/ratings`, ratingData);
};

// (Admin Services)
export const getAllUsers = () => {
  return apiClient.get('/admin/users');
};

export const updateUserStatus = (userId, newStatus) => {
  return apiClient.put(`/admin/users/${userId}/status`, newStatus, {
      headers: { 'Content-Type': 'application/json' }
  });
};

export const deleteUser = (userId) => {
  return apiClient.delete(`/admin/users/${userId}`);
};

export default apiClient;