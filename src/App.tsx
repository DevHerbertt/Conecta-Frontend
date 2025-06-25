import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider } from './components/Auth/AuthContexts';
import ProtectedRoute from './components/Protected/ProtectedRoute';

import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/BemVindo';
import AdminDashboardPage from './pages/AdminPage';

const NotFound = () => (
  <div className="container-center">
    <div className="card page-not-found">
      <h2>404 - Página Não Encontrada</h2>
      <p>A URL que você tentou acessar não existe.</p>
      <Link to="/" className="link">Voltar para o Início</Link>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;