'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import SubModuleTile from './SubModuleTile';
import { useAppStore } from '@/stores/useAppStore';
import type { ExaminationSubModule } from '@/lib/examination-modules';

interface SubModuleGridProps {
  /** All sub-modules to render. */
  modules: ExaminationSubModule[];
  /** Base path tiles link into, e.g. "/examination". */
  basePath: string;
  /** Parent module display name (for the header). */
  parentName: string;
  /** Parent module accent color (hex). */
  parentColor: string;
  /** Optional parent icon component. */
  parentIcon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  /** Optional intro paragraph shown under the title. */
  intro?: string;
}

/**
 * SubModuleGrid
 * -------------
 * In-module launcher grid. Renders the same Windows 8 / Metro-inspired
 * tile pattern as the global homepage, but scoped to one module.
 *
 * Reuses the global Background, glass surfaces, and OKLCH theme — no
 * bespoke CSS, no hardcoded colors.
 */
export default function SubModuleGrid({
  modules,
  basePath,
  parentName,
  parentColor,
  parentIcon: ParentIcon,
  intro,
}: SubModuleGridProps) {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useAppStore();

  const filtered = useMemo(() => {
    if (!searchQuery) return modules;
    const q = searchQuery.toLowerCase();
    return modules.filter(
      (m) =>
        m.code.toLowerCase().includes(q) ||
        m.name.toLowerCase().includes(q) ||
        m.blurb.toLowerCase().includes(q),
    );
  }, [modules, searchQuery]);

  // Pick a sensible column count for the stagger math — matches the
  // responsive grid below (2 / 3 / 4 across breakpoints).
  const gridColumns = 4;

  return (
    <div className="relative z-10 flex flex-col items-center gap-6 px-4 sm:px-6 pb-24 pt-4">
      {/* Back + parent label */}
      <motion.button
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.push('/')}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors glass rounded-full px-3 py-1.5"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </motion.button>

      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="text-center max-w-2xl"
      >
        <div className="flex items-center justify-center gap-3">
          {ParentIcon && (
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{
                background: `color-mix(in oklch, ${parentColor} 16%, transparent)`,
              }}
            >
              <ParentIcon
                className="w-5 h-5"
                style={{ color: parentColor }}
              />
            </div>
          )}
          <h1 className="display-hero font-display text-foreground">
            {parentName}
          </h1>
        </div>
        {intro && (
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {intro}
          </p>
        )}
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-xl flex items-center gap-2 px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${parentName} modules\u2026`}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </motion.div>

      {/* Tile grid — Windows 8 / Metro layout: 2 / 3 / 4 cols responsive */}
      <div
        className={cn(
          'w-full max-w-6xl',
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
        )}
      >
        {filtered.map((mod, i) => (
          <SubModuleTile
            key={mod.id}
            subModule={mod}
            index={i}
            basePath={basePath}
            gridColumns={gridColumns}
          />
        ))}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12 text-muted-foreground text-sm"
          >
            No modules found for &ldquo;{searchQuery}&rdquo;
          </motion.div>
        )}
      </div>
    </div>
  );
}
