import { tokens } from '../../styles/tokens';

export function Loader({ className }: { className?: string }) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: tokens.spacing.xl }}>
      <div style={{ width: 40, height: 40, border: `3px solid ${tokens.colors.border}`, borderTopColor: tokens.colors.primary, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}