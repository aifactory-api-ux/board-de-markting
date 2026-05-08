import { tokens } from '../../styles/tokens';
import { classNames } from '../../utils/classNames';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={classNames('tooltip-content', className)}
            sideOffset={5}
            style={{
              backgroundColor: tokens.colors.secondary,
              color: 'white',
              padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
              borderRadius: tokens.radii.sm,
              fontSize: tokens.typography.small.size,
              zIndex: 100,
            }}
          >
            {content}
            <TooltipPrimitive.Arrow style={{ fill: tokens.colors.secondary }} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}