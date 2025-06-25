import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../components/Auth/AuthContexts';
import { Link } from 'react-router-dom';
import { listUsers, updateUserRole, deleteUser, User } from '../components/services/api';

const AdminDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filterRole, setFilterRole] = useState<'user' | 'admin' | ''>('');
  const [filterName, setFilterName] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const [showFilterForm, setShowFilterForm] = useState(false);

  const isUserInactive = (lastLogin: string | undefined): boolean => {
    if (!lastLogin) return true;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const lastLoginDate = new Date(lastLogin);
    return lastLoginDate < thirtyDaysAgo;
  };

  const fetchUsers = useCallback(async (params?: { role?: 'user' | 'admin' | ''; name?: string; sortBy?: string; order?: 'asc' | 'desc' }) => {
    setLoading(true);
    setError(null);
    try {
      const currentParams: { [key: string]: any } = {};

      if (params?.role) {
        currentParams.role = params.role;
      }
      if (params?.name) {
        currentParams.name = params.name;
      }

      currentParams.sortBy = params?.sortBy || 'id';
      currentParams.order = params?.order || 'asc';

      Object.keys(currentParams).forEach(key => {
        if (currentParams[key] === undefined || currentParams[key] === '') {
          delete currentParams[key];
        }
      });

      const data = await listUsers(currentParams);
      setUsers(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar usuários.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers({ sortBy: 'id', order: 'asc' });
  }, [fetchUsers]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterRole(e.target.value as 'user' | 'admin' | '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(e.target.value);
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value as 'asc' | 'desc');
  };

  const handleApplyFilters = () => {
    fetchUsers({
      role: filterRole,
      name: filterName,
      sortBy: sortBy,
      order: order,
    });
    setShowFilterForm(false);
  };

  const handleResetFilters = () => {
    setFilterRole('');
    setFilterName('');
    setSortBy('id');
    setOrder('asc');
    fetchUsers({ role: undefined, name: undefined, sortBy: 'id', order: 'asc' });
    setShowFilterForm(false);
  };

  const handleChangeRole = async (userId: string, currentRole: 'user' | 'admin') => {
    if (user?.id === userId) {
      alert("Você não pode mudar a sua própria role.");
      return;
    }
    const confirmChange = window.confirm(`Deseja alterar a role deste usuário para ${currentRole === 'user' ? 'administrador' : 'usuário padrão'}?`);
    if (confirmChange) {
      const newRole = currentRole === 'user' ? 'admin' : 'user';
      try {
        await updateUserRole(userId, newRole);
        alert(`Role do usuário atualizada para ${newRole}.`);
        fetchUsers({ role: filterRole, name: filterName, sortBy: sortBy, order: order });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao atualizar a role.');
      }
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (user?.id === userId) {
      alert("Você não pode excluir sua própria conta por aqui.");
      return;
    }
    const confirmDelete = window.confirm(`Tem certeza que deseja EXCLUIR o usuário "${userName}"? Esta ação é irreversível.`);
    if (confirmDelete) {
      try {
        await deleteUser(userId);
        alert(`Usuário "${userName}" excluído com sucesso.`);
        fetchUsers({ role: filterRole, name: filterName, sortBy: sortBy, order: order });
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao excluir usuário.');
      }
    }
  };

  if (loading) {
    return <div className="container-center">Carregando usuários...</div>;
  }

  if (error) {
    return <div className="container-center" style={{ color: 'red' }}>Erro: {error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Painel de Administração</h1>
        <div className="dashboard-actions">
          <span>Olá, <strong>{user?.name}</strong> ({user?.role})</span>
          <Link to="/home" className="link">Ir para Home</Link>
          <button onClick={logout}>Sair</button>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 'none', textAlign: 'left', marginBottom: '30px' }}>
        <h2>Gerenciamento de Usuários</h2>
        <div className="filter-controls-row">
          <button onClick={() => setShowFilterForm(!showFilterForm)}>
            {showFilterForm ? 'Esconder Opções de Filtro' : 'Filtrar/Ordenar Usuários'}
          </button>
        </div>

        {showFilterForm && (
          <div className="filter-form-section">
            <h3>Opções de Filtro e Ordenação</h3>
            <div className="filter-group">
              <label htmlFor="roleFilter">Filtrar por Role:</label>
              <select id="roleFilter" value={filterRole} onChange={handleRoleChange}>
                <option value="">Todos</option>
                <option value="user">Usuário</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sortBy">Ordenar por:</label>
              <select id="sortBy" value={sortBy} onChange={handleSortByChange}>
                <option value="id">ID</option>
                <option value="name">Nome (Alfabético)</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="order">Ordem:</label>
              <select id="order" value={order} onChange={handleOrderChange}>
                <option value="asc">Ascendente (A-Z, Menor-Maior)</option>
                <option value="desc">Descendente (Z-A, Maior-Menor)</option>
              </select>
            </div>

            <div className="filter-actions">
              <button onClick={handleApplyFilters}>Aplicar Filtros</button>
              <button onClick={handleResetFilters}>Limpar Filtros</button>
            </div>
          </div>
        )}

        {users.length === 0 ? (
          <p>Nenhum usuário cadastrado com os filtros aplicados.</p>
        ) : (
          <div className="user-table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Criado Em</th>
                  <th>Último Login</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{String(u.id)}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`role-badge ${u.role}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                    <td>{u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <span className={`status-badge ${isUserInactive(u.lastLogin) ? 'inactive' : 'active'}`}>
                        {isUserInactive(u.lastLogin) ? 'Inativo' : 'Ativo'}
                      </span>
                    </td>
                    <td>
                      {user?.id !== String(u.id) && (
                        <>
                          <button onClick={() => handleChangeRole(String(u.id), u.role)}>
                            {u.role === 'user' ? 'Tornar Admin' : 'Tornar Usuário'}
                          </button>
                          <button onClick={() => handleDeleteUser(String(u.id), u.name)} className="delete">
                            Excluir
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;