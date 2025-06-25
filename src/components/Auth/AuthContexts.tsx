import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, AuthResponse } from '../services/api';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: UserData | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserFromStorage = () => {
      setIsLoading(true);
      const storedToken = localStorage.getItem('token');
      const storedUserString = localStorage.getItem('user');

      if (storedToken && storedUserString) {
        setToken(storedToken);
        try {
          setUser(JSON.parse(storedUserString));
        } catch (e) {
          console.error("Erro ao parsear usuário do localStorage", e);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setToken(null);
        }
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
      }
      setIsLoading(false);
    };

    loadUserFromStorage();
  }, []);

  const clearError = () => setError(null);

  const handleAuthSuccess = (response: AuthResponse) => {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    setToken(response.token);
    setUser(response.user);

    if (response.user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/home');
    }
  };

  const handleError = (err: any, defaultMessage: string) => {
    console.error("Erro de autenticação:", err);
    setError(err.response?.data?.message || err.message || defaultMessage);
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    clearError();
    try {
      const response = await loginUser(email, password);
      handleAuthSuccess(response);
    } catch (err) {
      handleError(err, "Falha ao fazer login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    clearError();
    try {
      const response = await registerUser(name, email, password);

      if (response) {
        handleAuthSuccess(response);
        alert("Conta criada e login realizado com sucesso!");
      } else {
        setError("E-mail já cadastrado. Por favor, faça login ou use outro e-mail.");
      }
    } catch (err) {
      handleError(err, "Falha ao registrar a conta.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    clearError();
    try {
      console.log('Iniciando login com Google...');
      alert("Funcionalidade de Login com Google ainda não implementada.");
    } catch (err) {
      handleError(err, "Erro ao tentar login com Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const value = {
    user,
    token,
    isLoading,
    error,
    login,
    register,
    loginWithGoogle,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}