/**
 * CollegeOS — Shared motion presets
 *
 * Use these instead of ad-hoc framer-motion configs to keep motion language
 * consistent across the app. All presets respect prefers-reduced-motion at
 * the runtime level via framer-motion's `useReducedMotion` hook (callers
 * should use it when wiring complex sequences).
 *
 * Usage:
 *   import { motionPresets, staggerContainer } from '@/lib/motion';
 *   <motion.div {...motionPresets.fadeUp}>...</motion.div>
 *   <motion.ul variants={staggerContainer} initial="hidden" animate="show">
 *     <motion.li variants={motionPresets.fadeUpItem}>...</motion.li>
 *   </motion.ul>
 */

import type { Transition, Variants } from 'framer-motion';

/* Cubic-bezier easings — named, perceptually tuned */
export const easing = {
  /** Sharp start, soft landing — for things entering the viewport */
  easeOut: [0.22, 1, 0.36, 1] as const,
  /** Symmetric, calm — for layout shifts */
  easeInOut: [0.65, 0, 0.35, 1] as const,
  /** Snap forward — for interactive feedback */
  easeSnap: [0.34, 1.56, 0.64, 1] as const,
};

/* Spring configs — named by intent, not by parameter values */
export const springs = {
  /** Snappy interactive spring (taps, toggles) */
  snappy: { type: 'spring', stiffness: 500, damping: 30, mass: 0.8 } as Transition,
  /** Smooth interactive spring (hovers, slides) */
  smooth: { type: 'spring', stiffness: 400, damping: 32, mass: 1 } as Transition,
  /** Soft settle spring (large surface movements) */
  soft: { type: 'spring', stiffness: 220, damping: 28, mass: 1.2 } as Transition,
  /** Bouncy accent spring (active indicators, dots) */
  bouncy: { type: 'spring', stiffness: 560, damping: 18, mass: 0.7 } as Transition,
};

/* One-shot entrance presets — pass directly to a motion component */
export const motionPresets = {
  /** Standard fade-up — the workhorse */
  fadeUp: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: easing.easeOut },
  },
  /** Fade-in only — for things that shouldn't move (overlays, backdrops) */
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, ease: easing.easeOut },
  },
  /** Scale-in — for popovers, dialogs, modal-like elements */
  scaleIn: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.28, ease: easing.easeOut },
  },
  /** Page-level enter — slight scale + fade, longer duration */
  pageEnter: {
    initial: { opacity: 0, y: 8, scale: 0.995 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.4, ease: easing.easeOut },
  },
  /** Slide-in from right — for drawers, sheets */
  slideInRight: {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, ease: easing.easeOut },
  },
  /** Item variant for use inside a stagger container */
  fadeUpItem: {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easing.easeOut } },
  } as Variants,
};

/* Stagger container — wrap a list of motion children with `variants={staggerContainer}` and `initial="hidden" animate="show"` */
export const staggerContainer = (stagger = 0.05, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/* Per-row stagger — for grids where items should cascade diagonally.
   Pass the item's row+col index. */
export function staggerByIndex(index: number, columns: number, base = 0.04): number {
  const row = Math.floor(index / columns);
  const col = index % columns;
  return (row + col) * base;
}

/* Reduced-motion-safe variants — pass `useReducedMotion()` boolean to pick */
export function motionOrStatic<T extends Variants>(reduced: boolean, variants: T): T {
  if (!reduced) return variants;
  // Flatten everything to instant-on
  return {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0 } },
  } as unknown as T;
}
