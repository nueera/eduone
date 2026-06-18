'use client';

import { type ReactNode } from 'react';
import { FileCheck, BarChart3, Calendar, FileText, Award, ClipboardCheck } from 'lucide-react';
import { ModuleSidebar, type SidebarItem } from '@/components/global/ModuleSidebar';
import { ModuleTopbar } from '@/components/global/ModuleTopbar';
import { ModuleErrorBoundary } from '@/components/global/ModuleErrorBoundary';

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/examination' },
  { id: 'schedule', label: 'Exam Schedule', icon: Calendar, path: '/examination/schedule' },
  { id: 'question-papers', label: 'Question Papers', icon: FileText, path: '/examination/question-papers' },
  { id: 'results', label: 'Results', icon: Award, path: '/examination/results' },
  { id: 'grading', label: 'Grading', icon: ClipboardCheck, path: '/examination/grading' },
];

const MODULE_COLOR = '#A855F7';
const MODULE_NAME = 'Examination';

export default function ExaminationLayout({ children }: { children: ReactNode }) {
  return (
    <ModuleErrorBoundary moduleName={MODULE_NAME} moduleColor={MODULE_COLOR}>
      <div className="flex h-screen overflow-hidden">
        <ModuleSidebar
          items={SIDEBAR_ITEMS}
          moduleColor={MODULE_COLOR}
          moduleName={MODULE_NAME}
          moduleIcon={FileCheck}
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
