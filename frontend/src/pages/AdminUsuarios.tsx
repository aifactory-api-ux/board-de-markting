import { useEffect, useState } from 'react';
import { tokens } from '../styles/tokens';
import { useUsers } from '../hooks/useUsers';
import { useAuth } from '../hooks/useAuth';
import TopNavBar from '../components/ui/TopNavBar';
import Button from '../components/ui/Button';
import TextField from '../components/ui/TextField';
import Select from '../components/ui/Select';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal';
import Loader from '../components/shared/Loader';
import { User } from '../../../shared/types';

export default function AdminUsuarios() {
  const { user, logout } = useAuth();
  const { users, loading, fetchUsers, createUser, updateUser, deleteUser } = useUsers();
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'editor' | 'viewer'>('viewer');

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) return;
    await createUser({ name: newName, email: newEmail, password: newPassword, role: newRole });
    setShowCreateModal(false);
    setNewName('');
    setNewEmail('');
    setNewPassword('');
    setNewRole('viewer');
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
    }
  };

  if (loading) return <Loader />;
  if (!user || user.role !== 'admin') return <div>Access denied</div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background }}>
      <TopNavBar user={user} onLogout={logout} onSearch={() => {}} notifications={[]} onNotificationClick={() => {}} />
      <div style={{ padding: tokens.spacing.lg, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.lg }}>
          <h1 style={{ margin: 0, fontSize: tokens.typography.headings.h1.size, fontWeight: 600, color: tokens.colors.text_primary }}>User Management</h1>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>+ Add User</Button>
        </div>
        <div style={{ backgroundColor: tokens.colors.surface, borderRadius: tokens.radii.lg, boxShadow: tokens.shadows.card, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: tokens.colors.background }}>
                <th style={{ padding: tokens.spacing.md, textAlign: 'left', fontSize: tokens.typography.small.size, fontWeight: 600, color: tokens.colors.text_secondary }}>Name</th>
                <th style={{ padding: tokens.spacing.md, textAlign: 'left', fontSize: tokens.typography.small.size, fontWeight: 600, color: tokens.colors.text_secondary }}>Email</th>
                <th style={{ padding: tokens.spacing.md, textAlign: 'left', fontSize: tokens.typography.small.size, fontWeight: 600, color: tokens.colors.text_secondary }}>Role</th>
                <th style={{ padding: tokens.spacing.md, textAlign: 'left', fontSize: tokens.typography.small.size, fontWeight: 600, color: tokens.colors.text_secondary }}>Status</th>
                <th style={{ padding: tokens.spacing.md, textAlign: 'right', fontSize: tokens.typography.small.size, fontWeight: 600, color: tokens.colors.text_secondary }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: User) => (
                <tr key={u.id} style={{ borderTop: `1px solid ${tokens.colors.border}` }}>
                  <td style={{ padding: tokens.spacing.md, fontSize: tokens.typography.body.size, color: tokens.colors.text_primary }}>{u.name}</td>
                  <td style={{ padding: tokens.spacing.md, fontSize: tokens.typography.body.size, color: tokens.colors.text_secondary }}>{u.email}</td>
                  <td style={{ padding: tokens.spacing.md, fontSize: tokens.typography.body.size, color: tokens.colors.text_secondary }}>{u.role}</td>
                  <td style={{ padding: tokens.spacing.md, fontSize: tokens.typography.body.size, color: u.isActive ? tokens.colors.success : tokens.colors.danger }}>{u.isActive ? 'Active' : 'Inactive'}</td>
                  <td style={{ padding: tokens.spacing.md, textAlign: 'right' }}>
                    <Button variant="ghost" onClick={() => {}}>Edit</Button>
                    <Button variant="ghost" onClick={() => handleDeleteUser(u.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: tokens.spacing.lg }}>
          <Pagination page={page} pageSize={10} total={users.length} onPageChange={setPage} />
        </div>
      </div>
      <Modal open={showCreateModal} title="Create New User" onClose={() => setShowCreateModal(false)} actions={<><Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button><Button variant="primary" onClick={handleCreateUser}>Create</Button></>}>
        <TextField label="Name" value={newName} onChange={setNewName} placeholder="Enter name" />
        <TextField label="Email" value={newEmail} onChange={setNewEmail} type="email" placeholder="Enter email" />
        <TextField label="Password" value={newPassword} onChange={setNewPassword} type="password" placeholder="Enter password" />
        <Select
          label="Role"
          value={newRole}
          onChange={(v) => setNewRole(v as any)}
          options={[
            { value: 'admin', label: 'Admin' },
            { value: 'editor', label: 'Editor' },
            { value: 'viewer', label: 'Viewer' },
          ]}
        />
      </Modal>
    </div>
  );
}