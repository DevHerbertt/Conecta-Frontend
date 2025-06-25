
import React from 'react';
import { useAuth } from '../components/Auth/AuthContexts'
import { Link } from 'react-router-dom';

const BemVindo: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container-center" style={{ flexDirection: 'column' }}>
      <div className="card" style={{ maxWidth: '600px', padding: '40px' }}>
        <h1>Bem-vindo(a), {user?.name || 'Usuário'}!</h1>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>
          Você está logado(a) como: <strong style={{ textTransform: 'capitalize' }}>{user?.role}</strong>.
        </p>
        {user?.role === 'admin' ? (
          <p style={{ marginBottom: '20px' }}>
            Como administrador, você pode gerenciar usuários.
          </p>
        ) : (
          <p style={{ marginBottom: '20px' }}>
            Esta é a sua página principal.
          </p>
        )}
        <button onClick={logout} className="btn-primary" style={{ backgroundColor: '#dc3545' }}>
          Sair
        </button>
        {user?.role === 'admin' && (
          <p style={{ marginTop: '20px' }}>
            <Link to="/admin/dashboard" className="link">
              Ir para o Painel de Administração
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default BemVindo;