'use client';

/**
 * CollegeOS — Sparkline
 *
 * Tiny inline trend chart (40-80px tall). Designed to live inside StatCards
 * and table cells. No axes, no grid, just a smooth line + soft gradient fill.
 *
 * Uses Recharts under the hood (already a dependency) so styling tokens
 * stay consistent with the rest of the app's charts.
 */

import { ResponsiveContainer, AreaChart, Area, YAxis } from 'recharts';
import { chartGradient } from '@/components/ui/chart-tooltip';

export interface SparklineDatum {
  value: number;
}

export interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  width?: number | string;
  /** Unique id suffix so multiple sparklines can coexist on a page */
  idSuffix?: string;
  /** Show a subtle filled gradient under the line */
  fill?: boolean;
  /** Stroke width in px */
  strokeWidth?: number;
  /** Round line joins for a softer look */
  type?: 'monotone' | 'natural' | 'linear';
}

export function Sparkline({
  data,
  color = 'var(--primary)',
  height = 40,
  width = '100%',
  idSuffix = 'spark',
  fill = true,
  strokeWidth = 1.75,
  type = 'monotone',
}: SparklineProps) {
  if (!data || data.length === 0) return null;

  const chartData: SparklineDatum[] = data.map((value) => ({ value }));
  const gradientId = `spark-fill-${idSuffix}`;

  return (
    <div style={{ width, height }} className="overflow-visible">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
          <defs>{chartGradient(gradientId, color, { fromOpacity: 0.25, toOpacity: 0 })}</defs>
          <YAxis domain={['dataMin', 'dataMax']} hide />
          <Area
            type={type}
            dataKey="value"
            stroke={color}
            strokeWidth={strokeWidth}
            fill={fill ? `url(#${gradientId})` : 'transparent'}
            isAnimationActive={false}
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
