'use client';

/**
 * CollegeOS — Premium StatCard
 *
 * Replaces the 4-identical-stats-in-a-row pattern with a flexible system:
 *
 * 1. Hero variant (size="hero") — large display number + inline sparkline,
 *    spans more grid columns. Use ONE per dashboard as the focal point.
 * 2. Standard variant (size="md") — compact card with sparkline + delta pill.
 * 3. Compact variant (size="sm") — just number + label, for dense layouts.
 *
 * Asymmetric grid pattern (recommended):
 *   <div className="grid grid-cols-12 gap-4">
 *     <StatCard size="hero" className="col-span-12 lg:col-span-6" ... />
 *     <StatCard size="md"   className="col-span-6  lg:col-span-2" ... />
 *     <StatCard size="md"   className="col-span-6  lg:col-span-2" ... />
 *     <StatCard size="md"   className="col-span-12 lg:col-span-2" ... />
 *   </div>
 *
 * Features:
 * - Tabular numerals on the value (premium dashboard feel)
 * - Display serif font option for hero numbers
 * - Inline sparkline that adapts to the accent color
 * - Semantic delta pill (green up / red down) with chevron
 * - Spotlight-follow cursor on hero variant
 * - Hover lift via .surface-hover
 */

import { forwardRef, useRef, type MouseEventHandler, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sparkline } from '@/components/ui/sparkline';
import { staggerByIndex } from '@/lib/motion';

export type StatCardSize = 'hero' | 'md' | 'sm';
export type StatCardDeltaDirection = 'up' | 'down' | 'flat';

export interface StatCardProps {
  label: string;
  value: string | number;
  /** Icon component to render in the accent chip */
  icon?: LucideIcon;
  /** Hex or CSS color — the card's accent. Defaults to primary. */
  accentColor?: string;
  /** Optional unit suffix shown after the value (e.g. "%", "L") */
  unit?: string;
  /** Delta vs previous period. Pass a number (signed) for auto-direction. */
  delta?: number;
  /** Or override direction explicitly */
  deltaDirection?: StatCardDeltaDirection;
  /** Optional delta label e.g. "vs last month" */
  deltaLabel?: string;
  /** Sparkline data — array of numbers */
  trend?: number[];
  /** Size variant — see docstring */
  size?: StatCardSize;
  /** Clickable CTA */
  onClick?: () => void;
  /** Optional footer (e.g. "View report →") */
  footer?: ReactNode;
  /** Stagger index — used for entrance animation in a grid */
  index?: number;
  /** Number of columns in the parent grid (for diagonal stagger calc) */
  gridColumns?: number;
  className?: string;
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  {
    label,
    value,
    icon: Icon,
    accentColor = 'var(--primary)',
    unit,
    delta,
    deltaDirection,
    deltaLabel,
    trend,
    size = 'md',
    onClick,
    footer,
    index = 0,
    gridColumns = 4,
    className,
  },
  ref
) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Merge forwarded ref + local ref for spotlight handler
  const setRef = (el: HTMLDivElement | null) => {
    cardRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  // Resolve delta direction
  const direction: StatCardDeltaDirection =
    deltaDirection ?? (delta == null ? 'flat' : delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat');
  const deltaValue = delta != null ? Math.abs(delta) : null;

  // Spotlight-follow cursor (hero variant only — perf consideration)
  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current || size !== 'hero') return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--spot-x', `${x}%`);
    cardRef.current.style.setProperty('--spot-y', `${y}%`);
  };

  // Size-aware class composition
  const sizeClasses: Record<StatCardSize, string> = {
    hero: 'p-6 lg:p-7',
    md: 'p-4',
    sm: 'p-3',
  };

  const valueClasses: Record<StatCardSize, string> = {
    hero: 'display-stat',
    md: 'text-2xl font-semibold tracking-tight',
    sm: 'text-lg font-semibold tracking-tight',
  };

  const labelClasses: Record<StatCardSize, string> = {
    hero: 'text-xs uppercase tracking-wider text-muted-foreground font-medium',
    md: 'text-xs text-muted-foreground',
    sm: 'text-[10px] text-muted-foreground',
  };

  const delay = staggerByIndex(index, gridColumns);

  return (
    <motion.div
      ref={setRef}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-xl surface-2 surface-hover',
        onClick && 'cursor-pointer',
        size === 'hero' && 'spotlight-card',
        className
      )}
      style={{
        // Make the accent color available to children as a CSS var
        ['--stat-accent' as string]: accentColor,
      }}
    >
      {/* Accent spotlight — only on hero */}
      {size === 'hero' && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklch, var(--stat-accent) 14%, transparent), transparent 45%)',
          }}
        />
      )}

      {/* Top row: icon chip + delta pill */}
      <div className="relative z-10 flex items-start justify-between mb-3">
        {Icon && (
          <div
            className="flex items-center justify-center rounded-lg"
            style={{
              width: size === 'hero' ? 40 : size === 'md' ? 32 : 28,
              height: size === 'hero' ? 40 : size === 'md' ? 32 : 28,
              backgroundColor: `color-mix(in oklch, ${accentColor} 14%, transparent)`,
            }}
          >
            <Icon
              style={{
                width: size === 'hero' ? 18 : 16,
                height: size === 'hero' ? 18 : 16,
                color: accentColor,
              }}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        )}

        {deltaValue != null && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium num-tabular',
              direction === 'up' && 'bg-emerald-500/10 text-emerald-500',
              direction === 'down' && 'bg-rose-500/10 text-rose-500',
              direction === 'flat' && 'bg-muted text-muted-foreground'
            )}
          >
            {direction === 'up' && <ArrowUpRight className="w-3 h-3" />}
            {direction === 'down' && <ArrowDownRight className="w-3 h-3" />}
            {deltaValue.toFixed(deltaValue >= 10 ? 0 : 1)}%
          </span>
        )}
      </div>

      {/* Value + label */}
      <div className="relative z-10">
        <p className={cn(valueClasses[size], 'text-foreground num-tabular')}>
          {value}
          {unit && (
            <span className="ml-0.5 text-base text-muted-foreground font-sans font-normal">
              {unit}
            </span>
          )}
        </p>
        <p className={cn(labelClasses[size], 'mt-1')}>{label}</p>
        {deltaLabel && size !== 'sm' && (
          <p className="text-[10px] text-muted-foreground/80 mt-0.5">{deltaLabel}</p>
        )}
      </div>

      {/* Sparkline — hero & md only */}
      {trend && trend.length > 0 && size !== 'sm' && (
        <div
          className={cn(
            'relative z-10 mt-3',
            size === 'hero' ? 'h-16' : 'h-10'
          )}
        >
          <Sparkline
            data={trend}
            color={accentColor}
            height={size === 'hero' ? 64 : 40}
            idSuffix={`${label.replace(/\s/g, '-')}-${index}`}
          />
        </div>
      )}

      {/* Footer */}
      {footer && <div className="relative z-10 mt-3 text-xs">{footer}</div>}
    </motion.div>
  );
});

/* Compound helper — assembles an asymmetric premium stat grid */
export interface StatGridProps {
  children: ReactNode;
  className?: string;
  columns?: 12 | 4;
}

export function StatGrid({ children, className, columns = 12 }: StatGridProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        columns === 12 ? 'grid-cols-12' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  );
}
