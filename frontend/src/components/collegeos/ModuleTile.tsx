'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  return (
    <motion.button
      onClick={() => router.push(`/${module.id}`)}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-6 cursor-pointer',
        'glass glass-hover transition-all duration-300',
        'w-full aspect-square max-w-[200px]',
        module.featured && 'col-span-2 row-span-2 max-w-none'
      )}
    >
      {/* Accent glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${module.hexColor}15 0%, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className="relative z-10 flex items-center justify-center w-14 h-14 rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${module.hexColor}18`,
        }}
      >
        <Icon
          className="w-7 h-7 transition-colors duration-300"
          style={{ color: module.hexColor }}
        />
      </div>

      {/* Name */}
      <div className="relative z-10 text-center">
        <h3 className="text-sm font-semibold text-foreground">{module.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{module.description}</p>
      </div>

      {/* Stats if featured */}
      {module.featured && module.stats && (
        <div className="relative z-10 flex gap-4 mt-2">
          {module.stats.slice(0, 3).map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-lg font-bold" style={{ color: module.hexColor }}>{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </motion.button>
  );
}
