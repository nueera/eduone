'use client';

import { type ReactNode } from 'react';
import { UserPlus, Users, ClipboardList, GraduationCap, FileText, BarChart3 } from 'lucide-react';
import { ModuleSidebar, type SidebarItem } from '@/components/global/ModuleSidebar';
import { ModuleTopbar } from '@/components/global/ModuleTopbar';
import { ModuleErrorBoundary } from '@/components/global/ModuleErrorBoundary';

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/admission' },
  { id: 'leads', label: 'Lead Management', icon: Users, path: '/admission/leads' },
  { id: 'applications', label: 'Applications', icon: ClipboardList, path: '/admission/applications' },
  { id: 'enrollment', label: 'Enrollment', icon: GraduationCap, path: '/admission/enrollment' },
  { id: 'documents', label: 'Documents', icon: FileText, path: '/admission/documents' },
];

const MODULE_COLOR = '#F97316';
const MODULE_NAME = 'Admission CRM';

export default function AdmissionLayout({ children }: { children: ReactNode }) {
  return (
    <ModuleErrorBoundary moduleName={MODULE_NAME} moduleColor={MODULE_COLOR}>
      <div className="flex h-screen overflow-hidden">
        <ModuleSidebar
          items={SIDEBAR_ITEMS}
          moduleColor={MODULE_COLOR}
          moduleName={MODULE_NAME}
          moduleIcon={UserPlus}
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
