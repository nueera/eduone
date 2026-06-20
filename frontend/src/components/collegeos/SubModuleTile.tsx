'use client';

import { useRef, type MouseEventHandler } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
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
 *   .accent-chip / .accent-text / .accent-hairline / .accent-wash / .accent-cta
 *
 * The tile scopes a single `--panel-accent` CSS variable to its own
 * subtree (mapped from the sub-module's accent color), and every
 * accent-tinted child reads from that variable. No inline `color-mix`
 * calls, no hardcoded percentages — tune in globals.css, applies here.
 *
 * Visual structure:
 *   ┌─────────────────────────────┐
 *   │  ┌──┐                       │
 *   │  │IC│  QPD                  │   ← icon + big code
 *   │  └──┘                       │
 *   │  Question Paper Delivery    │   ← full name
 *   │  Safe, secure, and reliable │   ← blurb
 *   │  method of online delivery  │
 *   │  ─────────────────────────  │
 *   │  Explore               →    │   ← CTA
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
        'group relative flex flex-col rounded-2xl p-5 cursor-pointer overflow-hidden text-left',
        // Global surface system — no per-tile CSS
        'glass glass-hover surface-hover',
        // Spotlight overlay is a global utility class
        'spotlight-card',
      )}
      style={{
        // 3D perspective setup — only structural CSS lives here
        transformStyle: 'preserve-3d',
        transform:
          'perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))',
        transition: 'transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)',
        // Single source of truth for the tile's accent — every
        // accent-tinted child below reads from this via utility classes.
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

      {/* Header row: icon + code */}
      <div
        className="relative z-10 flex items-center gap-3"
        style={{ transform: 'translateZ(30px)' }}
      >
        <div className="accent-chip flex items-center justify-center w-11 h-11 rounded-xl transition-transform duration-300 group-hover:scale-105">
          <Icon
            className="w-5 h-5 transition-transform duration-300"
            strokeWidth={1.75}
          />
        </div>
        <span className="display-title font-display num-tabular text-foreground">
          {subModule.code}
        </span>
      </div>

      {/* Body — full name + blurb */}
      <div
        className="relative z-10 mt-4 flex-1"
        style={{ transform: 'translateZ(20px)' }}
      >
        <h3 className="text-sm font-semibold text-foreground tracking-tight">
          {subModule.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-3">
          {subModule.blurb}
        </p>
      </div>

      {/* CTA row — uses .accent-text + .accent-cta utilities */}
      <div
        className="relative z-10 mt-4 pt-3 border-t border-border/60 flex items-center justify-between"
        style={{ transform: 'translateZ(10px)' }}
      >
        <span className="accent-text text-xs font-medium transition-colors">
          Explore
        </span>
        <span className="accent-cta flex items-center justify-center w-7 h-7 rounded-lg group-hover:translate-x-0.5">
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </span>
      </div>
    </motion.button>
  );
}
