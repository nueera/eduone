'use client';

import { type ReactNode } from 'react';
import { Building2, BarChart3, Home, Bus, Utensils, Shield } from 'lucide-react';
import { ModuleSidebar, type SidebarItem } from '@/components/global/ModuleSidebar';
import { ModuleTopbar } from '@/components/global/ModuleTopbar';
import { ModuleErrorBoundary } from '@/components/global/ModuleErrorBoundary';

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/campus' },
  { id: 'hostel', label: 'Hostel', icon: Home, path: '/campus/hostel' },
  { id: 'transport', label: 'Transport', icon: Bus, path: '/campus/transport' },
  { id: 'cafeteria', label: 'Cafeteria', icon: Utensils, path: '/campus/cafeteria' },
  { id: 'security', label: 'Security', icon: Shield, path: '/campus/security' },
];

const MODULE_COLOR = '#10B981';
const MODULE_NAME = 'Campus Operations';

export default function CampusLayout({ children }: { children: ReactNode }) {
  return (
    <ModuleErrorBoundary moduleName={MODULE_NAME} moduleColor={MODULE_COLOR}>
      <div className="flex h-screen overflow-hidden">
        <ModuleSidebar
          items={SIDEBAR_ITEMS}
          moduleColor={MODULE_COLOR}
          moduleName={MODULE_NAME}
          moduleIcon={Building2}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <ModuleTopbar moduleName={MODULE_NAME} moduleColor={MODULE_COLOR} />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </ModuleErrorBoundary>
  );
}
