'use client';

import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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

export function GlobalWorkspaceDock() {
  const router = useRouter();
  const pathname = usePathname();
  const { dockItems } = useWorkspaceStore();

  const currentModule = pathname.split('/')[1] || '';

  const handleClick = useCallback(
    (moduleId: string) => {
      router.push(`/${moduleId}`);
    },
    [router]
  );

  return (
    <TooltipProvider delayDuration={0}>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40"
      >
        <div className="glass rounded-2xl px-2 py-2 flex items-center gap-1">
          {dockItems.map((item) => {
            const isActive = currentModule === item.moduleId;
            const color = MODULE_COLORS[item.moduleId] || '#6B7280';

            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleClick(item.moduleId)}
                    className={cn(
                      'relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200',
                      'hover:bg-accent group'
                    )}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="dock-active"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: `${color}18` }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}

                    <ModuleIcon
                      moduleId={item.moduleId}
                      className={cn(
                        'w-5 h-5 relative z-10 transition-colors duration-200',
                        isActive ? '' : 'text-muted-foreground group-hover:text-foreground'
                      )}
                      style={isActive ? { color } : undefined}
                    />

                    {/* Active dot */}
                    {isActive && (
                      <motion.div
                        layoutId="dock-dot"
                        className="absolute -bottom-1 w-1 h-1 rounded-full"
                        style={{ backgroundColor: color }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </motion.div>
    </TooltipProvider>
  );
}
