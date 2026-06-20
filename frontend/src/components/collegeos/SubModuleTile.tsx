'use client';

import { useRef, type MouseEventHandler } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { staggerByIndex } from '@/lib/motion';
import type { ExaminationSubModule } from '@/lib/examination-modules';

interface SubModuleTileProps {
  subModule: ExaminationSubModule;
  index: number;
  /** Base path the tile links into, e.g. "/examination". */
  basePath: string;
  /** Number of columns in the grid — used for diagonal stagger math. */
  gridColumns?: number;
}

/**
 * SubModuleTile
 * -------------
 * Windows 8 / Metro-inspired card used inside a module launcher page.
 *
 * Built entirely on the global CSS surface + accent utility system:
 *   .glass / .glass-hover / .surface-hover / .spotlight-card
 *   .accent-chip / .accent-text / .accent-hairline / .accent-wash
 *   .tile-3d / .tile-3d-layer-*  (3D depth utilities)
 *
 * The tile scopes a single `--panel-accent` CSS variable to its own
 * subtree (mapped from the sub-module's accent CSS var), and every
 * accent-tinted child reads from that variable. No inline `color-mix`
 * calls, no hardcoded percentages — tune in globals.css, applies here.
 *
 * Visual structure (premium product vibe — no Explore / no arrow CTA):
 *   ┌─────────────────────────────┐
 *   │                             │
 *   │  ┌──┐                       │
 *   │  │IC│  QPD                  │   ← icon + big code
 *   │  └──┘                       │
 *   │                             │
 *   │  Question Paper Delivery    │   ← full name
 *   │  Safe, secure, and reliable │   ← blurb
 *   │  method of online delivery  │
 *   │  of question papers.        │
 *   │                             │
 *   └─────────────────────────────┘
 */
export default function SubModuleTile({
  subModule,
  index,
  basePath,
  gridColumns = 4,
}: SubModuleTileProps) {
  const router = useRouter();
  const ref = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useReducedMotion() ?? false;

  const Icon = subModule.icon;
  const delay = staggerByIndex(index, gridColumns);

  const handleMouseMove: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight position — consumed by .accent-wash + .spotlight-card
    ref.current.style.setProperty('--spot-x', `${(x / rect.width) * 100}%`);
    ref.current.style.setProperty('--spot-y', `${(y / rect.height) * 100}%`);

    // 3D tilt — subtle, max ~3deg
    const rx = ((y / rect.height) - 0.5) * -6;
    const ry = ((x / rect.width) - 0.5) * 6;
    ref.current.style.setProperty('--tilt-x', `${rx}deg`);
    ref.current.style.setProperty('--tilt-y', `${ry}deg`);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--tilt-x', '0deg');
    ref.current.style.setProperty('--tilt-y', '0deg');
  };

  const href = `${basePath}/${subModule.id}`;

  return (
    <motion.button
      ref={ref}
      onClick={() => router.push(href)}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative flex flex-col rounded-2xl p-6 cursor-pointer overflow-hidden text-left',
        'min-h-[200px]',
        // Global surface system — no per-tile CSS
        'glass glass-hover surface-hover',
        // Spotlight overlay is a global utility class
        'spotlight-card',
        // 3D depth container — utility class handles perspective + tilt
        'tile-3d',
      )}
      style={{
        // Single source of truth for the tile's accent — every
        // accent-tinted child below reads from this via utility classes.
        // Value is a CSS var reference, never a hardcoded hex.
        ['--panel-accent' as string]: subModule.accent,
      }}
    >
      {/* Accent wash on hover — global .accent-wash utility */}
      <div
        aria-hidden
        className="accent-wash pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Top hairline accent — global .accent-hairline utility */}
      <div
        aria-hidden
        className="accent-hairline pointer-events-none absolute top-0 left-1/4 right-1/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Header row: icon + code — lifted to front depth */}
      <div className="tile-3d-layer-front relative z-10 flex items-center gap-3">
        <div className="accent-chip flex items-center justify-center w-12 h-12 rounded-xl transition-transform duration-300 group-hover:scale-105">
          <Icon
            className="w-5 h-5 transition-transform duration-300"
            strokeWidth={1.75}
          />
        </div>
        <span className="display-title font-display num-tabular text-foreground">
          {subModule.code}
        </span>
      </div>

      {/* Body — full name + blurb; breathing room for premium feel */}
      <div className="tile-3d-layer-mid relative z-10 mt-auto pt-8">
        <h3 className="text-sm font-semibold text-foreground tracking-tight">
          {subModule.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3">
          {subModule.blurb}
        </p>
      </div>
    </motion.button>
  );
}
