import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
}

interface UserListFilterParams {
  role?: 'user' | 'admin';
  name?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const registerUser = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

export const listUsers = async (params?: UserListFilterParams): Promise<User[]> => {
  try {
    const response = await api.get<User[]>('/admin/users', { params });
    return response.data;
  } catch (error) {
    console.error('Erro na chamada listUsers:', error);
    throw error;
  }
};

export const updateUserRole = async (userId: string, newRole: 'user' | 'admin'): Promise<User> => {
  try {
    const response = await api.patch<User>(`/admin/users/${userId}/role`, { role: newRole });
    return response.data;
  } catch (error) {
    console.error('Erro na chamada updateUserRole:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await api.delete(`/admin/users/${userId}`);
  } catch (error) {
    console.error('Erro na chamada deleteUser:', error);
    throw error;
  }
};

export const updateProfile = async (userId: string, profileData: { name?: string; password?: string }): Promise<User> => {
    try {
        const response = await api.put<User>(`/users/me`, profileData);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        throw error;
    }
};

export default api;