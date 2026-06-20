'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CircleDot } from 'lucide-react';
import { Panel } from '@/components/ui/panel';
import { StatCard } from '@/components/ui/stat-card';
import type { ExaminationSubModule } from '@/lib/examination-modules';

interface SubModuleLandingProps {
  subModule: ExaminationSubModule;
  /** Quick stats shown at the top of the page (per sub-module). */
  stats?: {
    label: string;
    value: string;
    delta?: number;
    trend?: number[];
  }[];
  /** Optional feature bullets shown in the overview panel. */
  features?: string[];
  /** Optional CTA tiles (each renders as a Panel with an arrow). */
  actions?: {
    label: string;
    description: string;
    onClick?: () => void;
  }[];
}

/**
 * SubModuleLanding
 * ----------------
 * Shared landing-page scaffold for every examination sub-module route
 * (/examination/qpd, /examination/osm, …). Centralizes the layout so a
 * new sub-module page is a 10-line file, not a 200-line one.
 *
 * All theming flows from the sub-module's `accent` color through CSS
 * variables — no hardcoding, no per-page CSS.
 */
export default function SubModuleLanding({
  subModule,
  stats = [],
  features = [],
  actions = [],
}: SubModuleLandingProps) {
  const router = useRouter();
  const Icon = subModule.icon;
  const accent = subModule.accent;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 noise-overlay">
      {/* Page header — back link, code, name, blurb */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3"
      >
        <button
          onClick={() => router.push('/examination')}
          className="self-start flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Examination
        </button>

        <div className="flex items-start gap-4">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
            style={{ background: `color-mix(in oklch, ${accent} 16%, transparent)` }}
          >
            <Icon className="w-6 h-6" style={{ color: accent }} strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-semibold tracking-wider num-tabular"
                style={{ color: accent }}
              >
                {subModule.code}
              </span>
              <CircleDot className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Examination Module</span>
            </div>
            <h1 className="display-title font-display text-foreground mt-1">
              {subModule.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl leading-relaxed">
              {subModule.blurb}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats row (only if provided) */}
      {stats.length > 0 && (
        <div className="grid grid-cols-12 gap-4">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              size={i === 0 ? 'hero' : 'md'}
              className={
                i === 0
                  ? 'col-span-12 lg:col-span-6'
                  : 'col-span-6 lg:col-span-2'
              }
              label={stat.label}
              value={stat.value}
              accentColor={accent}
              delta={stat.delta}
              trend={stat.trend}
              index={i}
              gridColumns={12}
            />
          ))}
        </div>
      )}

      {/* Overview + Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel
          className="lg:col-span-2"
          title="Overview"
          description={`What ${subModule.name} does`}
          accentColor={accent}
          index={0}
          gridColumns={2}
          bodyClassName="pt-2"
        >
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>{subModule.blurb}</p>
            {features.length > 0 && (
              <ul className="space-y-2 mt-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: accent }}
                    />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Panel>

        <Panel
          title="Quick Actions"
          description="Common tasks"
          accentColor={accent}
          index={1}
          gridColumns={2}
          bodyClassName="pt-2"
        >
          <div className="space-y-2">
            {actions.length > 0 ? (
              actions.map((action) => (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors text-left"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {action.label}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 shrink-0 ml-2"
                    style={{ color: accent }}
                  />
                </button>
              ))
            ) : (
              <p className="text-xs text-muted-foreground py-6 text-center">
                Actions will appear here as the module is built out.
              </p>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
