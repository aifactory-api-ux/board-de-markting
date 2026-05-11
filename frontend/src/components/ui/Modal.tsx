import { tokens } from '../../styles/tokens';
import { classNames } from '../../utils/classNames';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export interface ModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  actions?: React.ReactNode;
  className?: string;
}

export function Modal({ open, title, children, onClose, actions, className }: ModalProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className={classNames('modal', className)} onClose={onClose} style={{ position: 'relative', zIndex: 50 }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
        </Transition.Child>
        <div style={{ position: 'fixed', inset: 0, overflowY: 'auto' }}>
          <div style={{ minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel style={{ backgroundColor: tokens.colors.surface, borderRadius: tokens.radii.lg, padding: tokens.spacing.lg, width: '100%', maxWidth: 500, boxShadow: tokens.shadows.modal, margin: tokens.spacing.lg }}>
                <Dialog.Title style={{ fontSize: tokens.typography.headings.h2.size, fontWeight: 600, color: tokens.colors.text_primary, marginBottom: tokens.spacing.md }}>
                  {title}
                </Dialog.Title>
                <div>{children}</div>
                {actions && <div style={{ display: 'flex', gap: tokens.spacing.sm, justifyContent: 'flex-end', marginTop: tokens.spacing.lg }}>{actions}</div>}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}