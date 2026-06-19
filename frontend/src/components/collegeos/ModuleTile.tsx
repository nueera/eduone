'use client';

import { useRef, type MouseEventHandler } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { staggerByIndex } from '@/lib/motion';

export interface ModuleData {
  id: string;
  name: string;
  icon: LucideIcon;
  accentKey: string;
  hexColor: string;
  description: string;
  featured?: boolean;
  stats?: { label: string; value: string; trend?: string }[];
}

interface ModuleTileProps {
  module: ModuleData;
  index: number;
}

export default function ModuleTile({ module, index }: ModuleTileProps) {
  const router = useRouter();
  const Icon = module.icon;
  const ref = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useReducedMotion() ?? false;

  // Diagonal cascade stagger (row + col based, not flat)
  const delay = staggerByIndex(index, 4);

  // Spotlight + 3D tilt handlers (skipped when user prefers reduced motion)
  const handleMouseMove: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight position (0–100%)
    ref.current.style.setProperty('--spot-x', `${(x / rect.width) * 100}%`);
    ref.current.style.setProperty('--spot-y', `${(y / rect.height) * 100}%`);

    // 3D tilt — subtle, max ~5deg
    const rx = ((y / rect.height) - 0.5) * -8;
    const ry = ((x / rect.width) - 0.5) * 8;
    ref.current.style.setProperty('--tilt-x', `${rx}deg`);
    ref.current.style.setProperty('--tilt-y', `${ry}deg`);

    // Icon parallax — moves opposite to tilt for depth
    ref.current.style.setProperty('--icon-x', `${((x / rect.width) - 0.5) * -6}px`);
    ref.current.style.setProperty('--icon-y', `${((y / rect.height) - 0.5) * -6}px`);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--tilt-x', '0deg');
    ref.current.style.setProperty('--tilt-y', '0deg');
    ref.current.style.setProperty('--icon-x', '0px');
    ref.current.style.setProperty('--icon-y', '0px');
  };

  return (
    <motion.button
      ref={ref}
      onClick={() => router.push(`/${module.id}`)}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-6 cursor-pointer overflow-hidden',
        'glass glass-hover transition-shadow duration-300',
        'w-full aspect-square max-w-[220px]',
        // 3D perspective container — applied via inline style below
        module.featured && 'col-span-2 row-span-2 max-w-none'
      )}
      style={{
        // 3D setup — preserve-3d so children can occupy depth
        transformStyle: 'preserve-3d',
        transform:
          'perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))',
        transition: 'transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)',
        ['--tile-accent' as string]: module.hexColor,
      }}
    >
      {/* Spotlight-follow cursor — soft radial accent that tracks mouse */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklch, var(--tile-accent) 16%, transparent), transparent 60%)`,
        }}
      />

      {/* Top hairline accent — only visible on hover */}
      <div
        className="pointer-events-none absolute top-0 left-1/4 right-1/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${module.hexColor}, transparent)` }}
      />

      {/* Icon — sits at a different depth for parallax */}
      <div
        className="relative z-10 flex items-center justify-center w-14 h-14 rounded-xl transition-transform duration-300 group-hover:scale-105"
        style={{
          background: `color-mix(in oklch, ${module.hexColor} 16%, transparent)`,
          transform: 'translate3d(var(--icon-x, 0px), var(--icon-y, 0px), 40px)',
          transformStyle: 'preserve-3d',
        }}
      >
        <Icon
          className="w-7 h-7 transition-all duration-300"
          style={{ color: module.hexColor }}
          strokeWidth={1.75}
        />
      </div>

      {/* Name + description */}
      <div className="relative z-10 text-center" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-sm font-semibold text-foreground tracking-tight">{module.name}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{module.description}</p>
      </div>

      {/* Stats if featured */}
      {module.featured && module.stats && (
        <div
          className="relative z-10 flex gap-4 mt-2"
          style={{ transform: 'translateZ(10px)' }}
        >
          {module.stats.slice(0, 3).map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-semibold num-tabular" style={{ color: module.hexColor }}>
                {stat.value}
              </p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </motion.button>
  );
}
