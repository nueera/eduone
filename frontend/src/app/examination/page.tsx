'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, Command, FileCheck } from 'lucide-react';
import Background from '@/components/collegeos/Background';
import DateTime from '@/components/collegeos/DateTime';
import CommandPalette from '@/components/collegeos/CommandPalette';
import AccentPicker from '@/components/collegeos/AccentPicker';
import SubModuleGrid from '@/components/collegeos/SubModuleGrid';
import { useAppStore } from '@/stores/useAppStore';
import { useMounted } from '@/hooks/use-mounted';
import { EXAMINATION_SUBMODULES } from '@/lib/examination-modules';

const MODULE_NAME = 'Examination';
const MODULE_ACCENT = 'var(--module-examination)';

/**
 * Status bar items — semantic status keys map to global `.status-dot-*`
 * utility classes that read from the `--status-*` design tokens. No
 * hardcoded hex colors.
 */
const statusItems = [
  { label: 'Exam Scheduler', status: 'operational' },
  { label: 'Question Bank', status: 'operational' },
  { label: 'Results Engine', status: 'operational' },
  { label: 'Marking Pipeline', status: 'degraded' },
] as const;

/**
 * Examination launcher page
 * -------------------------
 * Full-screen Windows 8 / Metro-style tile grid mirroring the global
 * homepage aesthetic. Shows 8 examination sub-modules (QPD, OSM, OES,
 * RPS, QPM, RRS, SES, QPG). All sub-module data comes from
 * `EXAMINATION_SUBMODULES` so adding/removing a tile only needs an
 * edit in `src/lib/examination-modules.ts`.
 *
 * All theming flows through the global CSS design system: the
 * `--module-examination` token (defined in globals.css) is the single
 * source of truth for the module accent, and every accent-tinted child
 * reads from it via the `.accent-*` utility classes.
 */
export default function ExaminationLauncherPage() {
  const { toggleCommandPalette } = useAppStore();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted ? resolvedTheme === 'dark' : true;

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen flex flex-col relative noise-overlay">
      <Background />

      {/* Top bar — same structure as the global homepage so the
          in-module launcher reads as part of CollegeOS, not a sub-app.
          All accent styling flows through the .accent-chip utility,
          scoped once via --panel-accent at this wrapper. */}
      <header
        className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4"
        style={{ ['--panel-accent' as string]: MODULE_ACCENT }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          {/* Icon chip — global .accent-chip utility (no inline color) */}
          <div className="accent-chip w-9 h-9 rounded-xl flex items-center justify-center">
            <FileCheck className="w-4 h-4" strokeWidth={1.75} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight font-display">
              CollegeOS
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {MODULE_NAME} Module
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <AccentPicker />

          <button
            onClick={toggleCommandPalette}
            className="glass rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Command className="w-3 h-3" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-flex h-4 items-center gap-0.5 rounded border border-border bg-muted px-1 text-[9px] font-medium">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-accent transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </motion.div>
      </header>

      {/* Center content — DateTime + tile grid + status bar */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8 px-4 pb-24">
        <DateTime />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full"
        >
          <SubModuleGrid
            modules={EXAMINATION_SUBMODULES}
            basePath="/examination"
            parentName={MODULE_NAME}
            parentAccent={MODULE_ACCENT}
            parentIcon={FileCheck}
            intro="Eight integrated systems covering the full examination lifecycle — from question paper generation to result redressal."
          />
        </motion.div>

        {/* Status bar — semantic status dots via global utility classes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-4"
        >
          {statusItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
            >
              <span
                className={`status-dot status-dot-${item.status}`}
                aria-hidden
              />
              <span className="num-tabular">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <CommandPalette />
    </div>
  );
}
