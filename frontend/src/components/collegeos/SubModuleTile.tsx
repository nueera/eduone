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
 * Built on the same global CSS surface system as the rest of CollegeOS
 * (`.glass`, `.glass-hover`, `.surface-hover`, `.num-tabular`) so theme
 * + dark-mode + accent-sync all keep working without per-tile CSS.
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

    ref.current.style.setProperty('--spot-x', `${(x / rect.width) * 100}%`);
    ref.current.style.setProperty('--spot-y', `${(y / rect.height) * 100}%`);

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
        // Pull in the global surface system — no per-tile CSS needed
        'glass glass-hover surface-hover',
        // Spotlight overlay is a global utility class (.spotlight-card)
        'spotlight-card',
      )}
      style={{
        transformStyle: 'preserve-3d',
        transform:
          'perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))',
        transition: 'transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)',
        ['--tile-accent' as string]: subModule.accent,
      }}
    >
      {/* Accent wash on hover — uses tile accent via CSS var */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(360px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklch, var(--tile-accent) 14%, transparent), transparent 60%)',
        }}
      />

      {/* Top hairline accent — hover only */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/4 right-1/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--tile-accent), transparent)',
        }}
      />

      {/* Header row: icon + code */}
      <div
        className="relative z-10 flex items-center gap-3"
        style={{ transform: 'translateZ(30px)' }}
      >
        <div
          className="flex items-center justify-center w-11 h-11 rounded-xl transition-transform duration-300 group-hover:scale-105"
          style={{
            background:
              'color-mix(in oklch, var(--tile-accent) 16%, transparent)',
          }}
        >
          <Icon
            className="w-5 h-5 transition-transform duration-300"
            style={{ color: 'var(--tile-accent)' }}
            strokeWidth={1.75}
          />
        </div>
        <span
          className="display-title font-display num-tabular"
          style={{ color: 'var(--foreground)' }}
        >
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

      {/* CTA row */}
      <div
        className="relative z-10 mt-4 pt-3 border-t border-border/60 flex items-center justify-between"
        style={{ transform: 'translateZ(10px)' }}
      >
        <span
          className="text-xs font-medium transition-colors"
          style={{ color: 'var(--tile-accent)' }}
        >
          Explore
        </span>
        <span
          className="flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-300 group-hover:translate-x-0.5"
          style={{
            background:
              'color-mix(in oklch, var(--tile-accent) 14%, transparent)',
            color: 'var(--tile-accent)',
          }}
        >
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </span>
      </div>
    </motion.button>
  );
}
