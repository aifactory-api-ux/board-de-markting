import { tokens } from '../styles/tokens';
import { useAuth } from '../hooks/useAuth';
import TopNavBar from '../components/ui/TopNavBar';
import Button from '../components/ui/Button';
import TextField from '../components/ui/TextField';
import Loader from '../components/shared/Loader';

export default function Configuracion() {
  const { user, logout } = useAuth();

  if (!user) return <Loader />;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: tokens.colors.background }}>
      <TopNavBar user={user} onLogout={logout} onSearch={() => {}} notifications={[]} onNotificationClick={() => {}} />
      <div style={{ padding: tokens.spacing.lg, maxWidth: 600, margin: '0 auto' }}>
        <h1 style={{ margin: 0, marginBottom: tokens.spacing.lg, fontSize: tokens.typography.headings.h1.size, fontWeight: 600, color: tokens.colors.text_primary }}>Settings</h1>
        <div style={{ backgroundColor: tokens.colors.surface, padding: tokens.spacing.lg, borderRadius: tokens.radii.lg, boxShadow: tokens.shadows.card }}>
          <h2 style={{ margin: 0, marginBottom: tokens.spacing.md, fontSize: tokens.typography.headings.h3.size, fontWeight: 600, color: tokens.colors.text_primary }}>Profile</h2>
          <TextField label="Name" value={user.name} onChange={() => {}} />
          <TextField label="Email" value={user.email} onChange={() => {}} />
          <div style={{ marginTop: tokens.spacing.lg }}>
            <Button variant="primary" onClick={() => {}}>Save Changes</Button>
          </div>
        </div>
        <div style={{ backgroundColor: tokens.colors.surface, padding: tokens.spacing.lg, borderRadius: tokens.radii.lg, boxShadow: tokens.shadows.card, marginTop: tokens.spacing.lg }}>
          <h2 style={{ margin: 0, marginBottom: tokens.spacing.md, fontSize: tokens.typography.headings.h3.size, fontWeight: 600, color: tokens.colors.text_primary }}>Change Password</h2>
          <TextField label="Current Password" value="" onChange={() => {}} type="password" />
          <TextField label="New Password" value="" onChange={() => {}} type="password" />
          <TextField label="Confirm New Password" value="" onChange={() => {}} type="password" />
          <div style={{ marginTop: tokens.spacing.lg }}>
            <Button variant="primary" onClick={() => {}}>Update Password</Button>
          </div>
        </div>
      </div>
    </div>
  );
}