'use client';

/**
 * CollegeOS — Premium chart tooltip
 *
 * Drop-in replacement for Recharts' default <Tooltip contentStyle=...>.
 * Renders a glass-surface card with: title, color swatch, label, value,
 * and (optional) delta vs. previous point.
 *
 * Usage:
 *   <Tooltip content={<ChartTooltip prefix="₹" suffix="L" valueFormatter={(v) => (v/100000).toFixed(1)} />} />
 *
 * To show deltas, pass `showDelta` and ensure each datum has a `prev` field
 * OR a numeric dataKey the tooltip can compare against.
 */

import { motion } from 'framer-motion';

export interface ChartTooltipPayloadItem {
  name?: string | number;
  value?: number | string | Array<number | string>;
  color?: string;
  dataKey?: string | number;
  payload?: Record<string, unknown>;
}

export interface ChartTooltipProps {
  /** Injected by Recharts */
  active?: boolean;
  /** Injected by Recharts */
  payload?: ChartTooltipPayloadItem[];
  /** Injected by Recharts — usually the x-axis value */
  label?: string | number;
  /** Optional formatter for each value */
  valueFormatter?: (value: number | string, name: string) => string;
  /** Optional override for the title (defaults to `label`) */
  title?: string;
  /** Optional prefix shown before the value (e.g. "₹") */
  prefix?: string;
  /** Optional suffix shown after the value (e.g. "%", "L") */
  suffix?: string;
  /** Hide the color swatch (useful for single-series charts) */
  hideSwatch?: boolean;
  /** Show a delta vs the previous datum — requires `prev` field on each datum */
  showDelta?: boolean;
  /** Field name on the datum that holds the previous value (default: 'prev') */
  deltaField?: string;
  /** Numeric dataKey to compute delta from when deltaField not present */
  deltaFrom?: string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter,
  title,
  prefix,
  suffix,
  hideSwatch,
  showDelta,
  deltaField = 'prev',
  deltaFrom,
}: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const header = title ?? (label != null ? String(label) : '');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-xl px-3 py-2.5 min-w-[140px] shadow-popover"
    >
      {header && (
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1.5 num-tabular">
          {header}
        </p>
      )}
      <div className="space-y-1">
        {payload.map((item, i) => {
          const name = typeof item.name === 'string' ? item.name : String(item.name ?? '');
          const rawValue = Array.isArray(item.value)
            ? item.value[0]
            : item.value;
          const numericValue = typeof rawValue === 'string' ? parseFloat(rawValue) : (rawValue ?? 0);
          const formatted = valueFormatter
            ? valueFormatter(numericValue, name)
            : `${prefix ?? ''}${typeof numericValue === 'number' ? numericValue.toLocaleString() : numericValue}${suffix ?? ''}`;

          // Delta computation
          let delta: number | null = null;
          if (showDelta && item.payload) {
            const prev = (item.payload as Record<string, unknown>)[deltaField];
            const deltaSource = deltaFrom
              ? (item.payload as Record<string, unknown>)[deltaFrom]
              : numericValue;
            if (typeof prev === 'number' && typeof deltaSource === 'number') {
              delta = prev !== 0 ? ((deltaSource - prev) / prev) * 100 : 0;
            }
          }

          return (
            <div key={`${name}-${i}`} className="flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 min-w-0">
                {!hideSwatch && item.color && (
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                )}
                <span className="text-muted-foreground truncate">{name}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {delta != null && (
                  <span
                    className={
                      delta >= 0
                        ? 'text-[10px] font-medium text-emerald-500 num-tabular'
                        : 'text-[10px] font-medium text-rose-500 num-tabular'
                    }
                  >
                    {delta >= 0 ? '+' : ''}
                    {delta.toFixed(1)}%
                  </span>
                )}
                <span className="font-semibold text-foreground num-tabular">{formatted}</span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ============ Chart configuration presets ============ */

/**
 * CartesianGrid — minimal dotted hairlines.
 * Usage: <CartesianGrid {...chartGridProps} />
 */
export const chartGridProps = {
  strokeDasharray: '2 4',
  stroke: 'var(--border)',
  vertical: false,
  opacity: 0.6,
} as const;

/**
 * XAxis / YAxis — minimal, muted, tabular numerals.
 * Usage: <XAxis {...chartAxisProps} dataKey="month" />
 */
export const chartAxisProps = {
  tick: {
    fontSize: 11,
    fill: 'var(--muted-foreground)',
    fontFamily: 'var(--font-geist-mono)',
  },
  tickLine: false,
  axisLine: false,
} as const;

/**
 * Active dot — a ring, not a solid dot (Linear/Vercel style).
 * Usage: <Area ... activeDot={chartActiveDot} />
 */
export const chartActiveDot = {
  r: 4,
  strokeWidth: 2,
  fill: 'var(--popover)',
  stroke: 'var(--chart-1)',
} as const;

/**
 * Build a Recharts <defs> gradient — soft fade to transparent at ~70%.
 * Usage:
 *   <defs>{chartGradient('colorLeads', '#F97316')}</defs>
 *   <Area fill="url(#colorLeads)" />
 */
export function chartGradient(
  id: string,
  color: string,
  options: { fromOpacity?: number; toOpacity?: number; direction?: 'vertical' | 'horizontal' } = {}
) {
  const { fromOpacity = 0.28, toOpacity = 0, direction = 'vertical' } = options;
  const coords = direction === 'vertical' ? { x1: '0', y1: '0', x2: '0', y2: '1' } : { x1: '0', y1: '0', x2: '1', y2: '0' };
  return (
    <linearGradient id={id} {...coords}>
      <stop offset="0%" stopColor={color} stopOpacity={fromOpacity} />
      <stop offset="70%" stopColor={color} stopOpacity={toOpacity * 1.5} />
      <stop offset="100%" stopColor={color} stopOpacity={toOpacity} />
    </linearGradient>
  );
}
