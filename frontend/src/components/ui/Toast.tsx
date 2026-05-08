import { tokens } from '../../styles/tokens';
import { classNames } from '../../utils/classNames';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { useState } from 'react';

export interface ToastProps {
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  open: boolean;
  onClose: () => void;
  className?: string;
}

const typeColors = {
  info: tokens.colors.info,
  success: tokens.colors.success,
  warning: tokens.colors.warning,
  danger: tokens.colors.danger,
};

export function Toast({ message, type, open, onClose, className }: ToastProps) {
  return (
    <ToastPrimitive.Root open={open} onOpenChange={onClose} className={classNames('toast', className)} style={{ backgroundColor: tokens.colors.surface, borderRadius: tokens.radii.md, boxShadow: tokens.shadows.modal, padding: tokens.spacing.md, borderLeft: `4px solid ${typeColors[type]}` }}>
      <ToastPrimitive.Description style={{ fontSize: tokens.typography.body.size, color: tokens.colors.text_primary }}>{message}</ToastPrimitive.Description>
    </ToastPrimitive.Root>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'info' | 'success' | 'warning' | 'danger'>('info');

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {children}
      <ToastPrimitive.Viewport style={{ position: 'fixed', bottom: tokens.spacing.lg, right: tokens.spacing.lg, display: 'flex', flexDirection: 'column', gap: tokens.spacing.sm, zIndex: 9999 }} />
    </ToastPrimitive.Provider>
  );
}