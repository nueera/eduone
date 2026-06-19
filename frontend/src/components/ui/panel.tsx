'use client';

/**
 * CollegeOS — Panel
 *
 * Premium wrapper for any dashboard surface. Replaces the old
 * `glass rounded-xl p-4` pattern with the new depth system.
 *
 * Features:
 * - .surface-2 elevation (1px border + card shadow + inset top highlight)
 * - Optional .surface-hover lift on interactive panels
 * - Optional title/description/footer slots with consistent typography
 * - Optional accent stripe at the top edge for module branding
 * - Spotlight-follow cursor (opt-in)
 */

import { forwardRef, useRef, type MouseEventHandler, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { staggerByIndex } from '@/lib/motion';

export interface PanelProps {
  title?: ReactNode;
  description?: ReactNode;
  /** Right-aligned actions (filter button, "view all", etc.) */
  actions?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  /** Optional accent color for the top stripe — usually the module color */
  accentColor?: string;
  /** Hover lift + cursor spotlight */
  interactive?: boolean;
  /** Spotlight-follow cursor (sets --spot-x / --spot-y CSS vars) */
  spotlight?: boolean;
  /** Padding control */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Grid index for staggered entrance (pass the item's index in the grid) */
  index?: number;
  gridColumns?: number;
  className?: string;
  bodyClassName?: string;
}

const paddingMap = {
  none: '',
  sm: 'p-3',
  md: 'p-4 sm:p-5',
  lg: 'p-5 sm:p-6',
};

export const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  {
    title,
    description,
    actions,
    children,
    footer,
    accentColor,
    interactive = false,
    spotlight = false,
    padding = 'md',
    index = 0,
    gridColumns = 2,
    className,
    bodyClassName,
  },
  ref
) {
  const localRef = useRef<HTMLDivElement | null>(null);

  const setRef = (el: HTMLDivElement | null) => {
    localRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!localRef.current || !spotlight) return;
    const rect = localRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    localRef.current.style.setProperty('--spot-x', `${x}%`);
    localRef.current.style.setProperty('--spot-y', `${y}%`);
  };

  const delay = staggerByIndex(index, gridColumns);

  const hasHeader = title || description || actions;

  return (
    <motion.div
      ref={setRef}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative overflow-hidden rounded-xl surface-2',
        interactive && 'surface-hover cursor-pointer',
        spotlight && 'spotlight-card',
        className
      )}
      style={accentColor ? { ['--panel-accent' as string]: accentColor } : undefined}
    >
      {/* Top accent stripe */}
      {accentColor && (
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-50"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        />
      )}

      {/* Spotlight overlay */}
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklch, var(--panel-accent, var(--primary)) 10%, transparent), transparent 45%)',
          }}
        />
      )}

      {/* Header */}
      {hasHeader && (
        <div className="relative z-10 flex items-start justify-between gap-3 px-4 sm:px-5 pt-4 sm:pt-5 pb-3">
          <div className="min-w-0">
            {title && (
              <h3 className="text-sm font-semibold text-foreground tracking-tight">{title}</h3>
            )}
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
          {actions && <div className="shrink-0 flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {/* Body */}
      <div className={cn('relative z-10', paddingMap[padding], bodyClassName)}>{children}</div>

      {/* Footer */}
      {footer && (
        <div className="relative z-10 px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-border/60 mt-3 text-xs text-muted-foreground">
          {footer}
        </div>
      )}
    </motion.div>
  );
});
