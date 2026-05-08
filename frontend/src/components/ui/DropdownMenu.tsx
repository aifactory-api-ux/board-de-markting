import { tokens } from '../../styles/tokens';
import { classNames } from '../../utils/classNames';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export interface DropdownMenuItem {
  label: string;
  onClick: () => void;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  className?: string;
}

export function DropdownMenu({ trigger, items, className }: DropdownMenuProps) {
  return (
    <Menu as="div" className={classNames('dropdown-menu', className)} style={{ position: 'relative', display: 'inline-block' }}>
      <Menu.Button as={Fragment}>{trigger}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items style={{ position: 'absolute', right: 0, marginTop: tokens.spacing.sm, backgroundColor: tokens.colors.surface, borderRadius: tokens.radii.md, boxShadow: tokens.shadows.modal, minWidth: 160, zIndex: 50, padding: tokens.spacing.xs }}>
          {items.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <button
                  onClick={item.onClick}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                    backgroundColor: active ? tokens.colors.background : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: tokens.typography.body.size,
                    color: tokens.colors.text_primary,
                  }}
                >
                  {item.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}