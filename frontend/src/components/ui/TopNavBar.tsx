import { tokens } from '../../styles/tokens';
import { User, Notification } from '../../../../shared/types';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { classNames } from '../../utils/classNames';

export interface TopNavBarProps {
  user: User;
  onLogout: () => void;
  onSearch: (query: string) => void;
  notifications: Notification[];
  onNotificationClick: (id: string) => void;
  className?: string;
}

export function TopNavBar({ user, onLogout, notifications, onNotificationClick, className }: TopNavBarProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className={classNames('top-nav-bar', className)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${tokens.spacing.md} ${tokens.spacing.lg}`, backgroundColor: tokens.colors.surface, borderBottom: `1px solid ${tokens.colors.border}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
        <h1 style={{ margin: 0, fontSize: tokens.typography.headings.h2.size, fontWeight: 600, color: tokens.colors.primary }}>Board Marketing</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.lg }}>
        <div style={{ position: 'relative' }}>
          <button onClick={() => {}} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
            <span style={{ fontSize: 20 }}>🔔</span>
            {unreadCount > 0 && (
              <span style={{ position: 'absolute', top: -4, right: -4, backgroundColor: tokens.colors.danger, color: tokens.colors.surface, borderRadius: '50%', width: 16, height: 16, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {unreadCount}
              </span>
            )}
          </button>
          {notifications.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: tokens.spacing.sm, backgroundColor: tokens.colors.surface, borderRadius: tokens.radii.md, boxShadow: tokens.shadows.modal, minWidth: 300, zIndex: 100 }}>
              {notifications.slice(0, 5).map((n) => (
                <div key={n.id} onClick={() => onNotificationClick(n.id)} style={{ padding: tokens.spacing.md, borderBottom: `1px solid ${tokens.colors.border}`, cursor: 'pointer' }}>
                  <p style={{ margin: 0, fontSize: tokens.typography.small.size }}>{n.message}</p>
                  <span style={{ fontSize: tokens.typography.caption.size, color: tokens.colors.text_secondary }}>{new Date(n.createdAt).toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Avatar name={user.name} src={user.avatarUrl || undefined} />
          <span style={{ fontSize: tokens.typography.body.size, fontWeight: 500, color: tokens.colors.text_primary }}>{user.name}</span>
          <Badge label={user.role} color={user.role === 'admin' ? tokens.colors.danger : user.role === 'editor' ? tokens.colors.warning : tokens.colors.info} />
        </div>
        <button onClick={onLogout} style={{ background: 'none', border: 'none', color: tokens.colors.text_secondary, cursor: 'pointer', fontSize: tokens.typography.body.size }}>
          Logout
        </button>
      </div>
    </nav>
  );
}