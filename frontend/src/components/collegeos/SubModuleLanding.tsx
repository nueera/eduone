'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CircleDot } from 'lucide-react';
import { Panel } from '@/components/ui/panel';
import { StatCard } from '@/components/ui/stat-card';
import { Button } from '@/components/ui/button';
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
  /** Optional CTA tiles (each renders as a list row with an arrow). */
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
 * Theming strategy
 * ----------------
 * The root container scopes a single `--panel-accent` CSS variable to
 * the sub-module's accent color. Every accent-tinted descendant reads
 * from that variable via the global utility classes defined in
 * globals.css:
 *
 *   .accent-chip    — icon chip background + foreground
 *   .accent-text    — text colored with the accent
 *   .accent-bullet  — small accent-colored dot for list bullets
 *   .accent-hairline — top accent line
 *
 * No inline `color-mix` calls. No hardcoded percentages. No per-page
 * styling. Tune the percentages in globals.css once, applies everywhere.
 *
 * Uses the global `Button` component for the back link and CTAs so
 * focus rings, keyboard nav, and hover states match the rest of the app.
 */
export default function SubModuleLanding({
  subModule,
  stats = [],
  features = [],
  actions = [],
}: SubModuleLandingProps) {
  const router = useRouter();
  const Icon = subModule.icon;

  return (
    // Scope --panel-accent once at the page root. Every accent-tinted
    // child below (icon chip, code label, bullet dots, arrow icons)
    // reads from this via utility classes — no inline color-mix.
    <div
      className="p-4 sm:p-6 lg:p-8 space-y-6 noise-overlay"
      style={{ ['--panel-accent' as string]: subModule.accent }}
    >
      {/* Page header — back link, code, name, blurb */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/examination')}
          className="self-start h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Examination
        </Button>

        <div className="flex items-start gap-4">
          {/* Icon chip — global .accent-chip utility */}
          <div className="accent-chip flex items-center justify-center w-12 h-12 rounded-xl shrink-0">
            <Icon className="w-6 h-6" strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="accent-text text-xs font-semibold tracking-wider num-tabular">
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
              accentColor={subModule.accent}
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
          accentColor={subModule.accent}
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
                    {/* Bullet — global .accent-bullet utility */}
                    <span className="accent-bullet mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" />
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
          accentColor={subModule.accent}
          index={1}
          gridColumns={2}
          bodyClassName="pt-2"
        >
          <div className="space-y-1">
            {actions.length > 0 ? (
              actions.map((action) => (
                <Button
                  key={action.label}
                  variant="ghost"
                  onClick={action.onClick}
                  className="w-full justify-between p-3 h-auto rounded-lg text-left"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {action.label}
                    </p>
                    <p className="text-xs text-muted-foreground truncate font-normal">
                      {action.description}
                    </p>
                  </div>
                  {/* Arrow — global .accent-text utility */}
                  <ArrowRight className="accent-text w-4 h-4 shrink-0 ml-2" />
                </Button>
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
