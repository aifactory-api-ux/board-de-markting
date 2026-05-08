import { tokens } from '../styles/tokens';

export default function Login() {
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const rememberMe = (form.elements.namedItem('rememberMe') as HTMLInputElement).checked;

    const { useAuthStore } = await import('../state/authStore');
    const store = useAuthStore.getState();
    await store.login(email, password, rememberMe);
    window.location.href = '/';
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: tokens.colors.background }}>
      <div style={{ backgroundColor: tokens.colors.surface, padding: tokens.spacing.xl, borderRadius: tokens.radii.lg, boxShadow: tokens.shadows.card, width: '100%', maxWidth: 400 }}>
        <h1 style={{ margin: 0, marginBottom: tokens.spacing.lg, fontSize: tokens.typography.h1.size, fontWeight: 600, color: tokens.colors.text_primary, textAlign: 'center' }}>
          Board Marketing
        </h1>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: tokens.spacing.md }}>
            <label style={{ display: 'block', marginBottom: tokens.spacing.xs, fontSize: tokens.typography.body.size, fontWeight: 500, color: tokens.colors.text_primary }}>Email</label>
            <input type="email" name="email" required style={{ width: '100%', padding: `${tokens.spacing.sm} ${tokens.spacing.md}`, borderRadius: tokens.radii.md, border: `1px solid ${tokens.colors.border}`, fontSize: tokens.typography.body.size, fontFamily: tokens.typography.font_family }} />
          </div>
          <div style={{ marginBottom: tokens.spacing.md }}>
            <label style={{ display: 'block', marginBottom: tokens.spacing.xs, fontSize: tokens.typography.body.size, fontWeight: 500, color: tokens.colors.text_primary }}>Password</label>
            <input type="password" name="password" required style={{ width: '100%', padding: `${tokens.spacing.sm} ${tokens.spacing.md}`, borderRadius: tokens.radii.md, border: `1px solid ${tokens.colors.border}`, fontSize: tokens.typography.body.size, fontFamily: tokens.typography.font_family }} />
          </div>
          <div style={{ marginBottom: tokens.spacing.lg }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
              <input type="checkbox" name="rememberMe" />
              <span style={{ fontSize: tokens.typography.body.size, color: tokens.colors.text_secondary }}>Remember me</span>
            </label>
          </div>
          <button type="submit" style={{ width: '100%', padding: `${tokens.spacing.sm} ${tokens.spacing.md}`, backgroundColor: tokens.colors.primary, color: 'white', border: 'none', borderRadius: tokens.radii.md, fontSize: tokens.typography.body.size, fontWeight: 500, cursor: 'pointer' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}