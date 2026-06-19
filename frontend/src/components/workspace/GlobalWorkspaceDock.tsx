'use client';

/**
 * CollegeOS — Global Workspace Dock (with macOS-style magnification)
 *
 * Upgrade from the original:
 * - Cursor-following magnification: tiles near the cursor scale up,
 *   neighbors scale less, falloff is gaussian-like.
 * - Active indicator uses a soft accent halo (not just a bg tint).
 * - Spring-animated dot indicator that slides between active items.
 * - Tooltip shows module name + tiny accent dot for instant recognition.
 * - Glass surface with the new depth system (inset top highlight).
 *
 * Implementation notes:
 * - We track mouse X over the dock and compute each tile's distance
 *   from the cursor to determine its scale factor.
 * - Uses framer-motion's `useMotionValue` + `useTransform` for buttery
 *   60fps updates without re-rendering React.
 * - Respects prefers-reduced-motion: tiles fall back to a simple hover scale.
 */

import { useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import {
  UserPlus,
  BookOpen,
  FileCheck,
  Building2,
  DollarSign,
  LayoutDashboard,
  type LucideProps,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function ModuleIcon({ moduleId, ...props }: LucideProps & { moduleId: string }) {
  switch (moduleId) {
    case 'admission':
      return <UserPlus {...props} />;
    case 'academics':
      return <BookOpen {...props} />;
    case 'examination':
      return <FileCheck {...props} />;
    case 'campus':
      return <Building2 {...props} />;
    case 'finance':
      return <DollarSign {...props} />;
    default:
      return <LayoutDashboard {...props} />;
  }
}

const MODULE_COLORS: Record<string, string> = {
  admission: '#F97316',
  academics: '#3B82F6',
  examination: '#A855F7',
  campus: '#10B981',
  finance: '#22C55E',
};

/* Magnification parameters — tuned for a macOS-dock feel */
const BASE_SIZE = 44; // px (tile width/height at rest)
const MAX_SCALE = 1.55; // peak scale at cursor
const INFLUENCE_RADIUS = 90; // px radius of effect

/** Gaussian-like falloff — smooth, no harsh edges */
function magnifyScale(distance: number): number {
  if (distance > INFLUENCE_RADIUS) return 1;
  // Smoothstep-style falloff
  const t = 1 - distance / INFLUENCE_RADIUS;
  const eased = t * t * (3 - 2 * t);
  return 1 + (MAX_SCALE - 1) * eased;
}

interface DockTileProps {
  moduleId: string;
  label: string;
  isActive: boolean;
  color: string;
  mouseX: MotionValue<number>;
  onClick: () => void;
  reducedMotion: boolean;
}

function DockTile({ moduleId, label, isActive, color, mouseX, onClick, reducedMotion }: DockTileProps) {
  const ref = useRef<HTMLButtonElement | null>(null);

  // Distance from cursor → tile center
  const distance = useTransform(mouseX, (mx) => {
    const el = ref.current;
    if (!el || reducedMotion) return Infinity;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    return Math.abs(mx - center);
  });

  // Distance → scale
  const scaleRaw = useTransform(distance, (d) => magnifyScale(d));
  const scale = useSpring(scaleRaw, {
    stiffness: 500,
    damping: 32,
    mass: 0.6,
  });

  // Lift the tile slightly as it scales (macOS dock does this)
  const yRaw = useTransform(scale, (s) => -(s - 1) * 12);
  const y = useSpring(yRaw, { stiffness: 500, damping: 32, mass: 0.6 });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          ref={ref}
          onClick={onClick}
          // When reduced motion is on, fall back to a simple hover scale
          whileHover={reducedMotion ? { scale: 1.1 } : undefined}
          whileTap={{ scale: 0.92 }}
          style={
            reducedMotion
              ? undefined
              : { width: BASE_SIZE, height: BASE_SIZE, scale, y, originY: 1 }
          }
          className={cn(
            'relative flex items-center justify-center rounded-xl transition-colors duration-200 group',
            // Static sizing for reduced motion
            reducedMotion && 'w-11 h-11',
            // Always provide a hover bg tint
            'hover:bg-accent'
          )}
        >
          {/* Active accent halo — soft radial glow behind the icon */}
          {isActive && (
            <motion.div
              layoutId="dock-active-halo"
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${color}22 0%, ${color}08 60%, transparent 80%)`,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            />
          )}

          {/* Top-edge accent bar — only on active */}
          {isActive && (
            <motion.div
              layoutId="dock-active-bar"
              className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-6 rounded-full"
              style={{ backgroundColor: color }}
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            />
          )}

          <ModuleIcon
            moduleId={moduleId}
            className={cn(
              'w-5 h-5 relative z-10 transition-colors duration-200',
              isActive ? '' : 'text-muted-foreground group-hover:text-foreground'
            )}
            style={isActive ? { color } : undefined}
            strokeWidth={isActive ? 2.25 : 1.75}
          />

          {/* Active dot below the icon */}
          {isActive && (
            <motion.div
              layoutId="dock-dot"
              className="absolute -bottom-1.5 w-1 h-1 rounded-full"
              style={{ backgroundColor: color }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </motion.button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs flex items-center gap-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
        />
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export function GlobalWorkspaceDock() {
  const router = useRouter();
  const pathname = usePathname();
  const { dockItems } = useWorkspaceStore();
  const reducedMotion = useReducedMotion() ?? false;

  const currentModule = pathname.split('/')[1] || '';

  const handleClick = useCallback(
    (moduleId: string) => {
      router.push(`/${moduleId}`);
    },
    [router]
  );

  // Track cursor X over the dock — springs give it weight
  const mouseXRaw = useMotionValue(Infinity);
  const mouseX = useSpring(mouseXRaw, {
    stiffness: 600,
    damping: 35,
    mass: 0.4,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    mouseXRaw.set(e.clientX);
  };

  const handleMouseLeave = () => {
    mouseXRaw.set(Infinity);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40"
      >
        {/* Dock glass surface — upgraded with the new depth system */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            'glass rounded-2xl px-2.5 py-2 flex items-end gap-1.5',
            // Extra vertical padding so magnified tiles have room to grow upward
            'pt-3'
          )}
          style={{
            // Ensure the dock has its own stacking context for the magnified tiles
            isolation: 'isolate',
          }}
        >
          {dockItems.map((item) => (
            <DockTile
              key={item.id}
              moduleId={item.moduleId}
              label={item.label}
              isActive={currentModule === item.moduleId}
              color={MODULE_COLORS[item.moduleId] || '#6B7280'}
              mouseX={mouseX}
              onClick={() => handleClick(item.moduleId)}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </motion.div>
    </TooltipProvider>
  );
}
