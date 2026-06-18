'use client';

import { type ReactNode } from 'react';
import { BookOpen, BarChart3, Calendar, Users, FileText, Clock } from 'lucide-react';
import { ModuleSidebar, type SidebarItem } from '@/components/global/ModuleSidebar';
import { ModuleTopbar } from '@/components/global/ModuleTopbar';
import { ModuleErrorBoundary } from '@/components/global/ModuleErrorBoundary';

const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/academics' },
  { id: 'courses', label: 'Courses', icon: BookOpen, path: '/academics/courses' },
  { id: 'timetable', label: 'Timetable', icon: Calendar, path: '/academics/timetable' },
  { id: 'faculty', label: 'Faculty', icon: Users, path: '/academics/faculty' },
  { id: 'syllabus', label: 'Syllabus', icon: FileText, path: '/academics/syllabus' },
  { id: 'attendance', label: 'Attendance', icon: Clock, path: '/academics/attendance' },
];

const MODULE_COLOR = '#3B82F6';
const MODULE_NAME = 'Academic Operations';

export default function AcademicsLayout({ children }: { children: ReactNode }) {
  return (
    <ModuleErrorBoundary moduleName={MODULE_NAME} moduleColor={MODULE_COLOR}>
      <div className="flex h-screen overflow-hidden">
        <ModuleSidebar
          items={SIDEBAR_ITEMS}
          moduleColor={MODULE_COLOR}
          moduleName={MODULE_NAME}
          moduleIcon={BookOpen}
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
