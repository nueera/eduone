'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus,
  BookOpen,
  FileCheck,
  Building2,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
} from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import type { ModuleData } from './ModuleTile';
import ModuleTile from './ModuleTile';

const modules: ModuleData[] = [
  {
    id: 'admission',
    name: 'Admission CRM',
    icon: UserPlus,
    accentKey: 'admission',
    hexColor: '#F97316',
    description: 'Manage admissions, leads & enrollment pipeline',
    featured: true,
    stats: [
      { label: 'New Leads', value: '142', trend: 'up' },
      { label: 'Enrolled', value: '89', trend: 'up' },
      { label: 'Conversion', value: '63%', trend: 'up' },
    ],
  },
  {
    id: 'academics',
    name: 'Academic Ops',
    icon: BookOpen,
    accentKey: 'academics',
    hexColor: '#3B82F6',
    description: 'Courses, timetables & faculty management',
  },
  {
    id: 'examination',
    name: 'Examination',
    icon: FileCheck,
    accentKey: 'examination',
    hexColor: '#A855F7',
    description: 'Exam scheduling, results & grading',
  },
  {
    id: 'campus',
    name: 'Campus Ops',
    icon: Building2,
    accentKey: 'campus',
    hexColor: '#10B981',
    description: 'Facilities, hostel & transport management',
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: DollarSign,
    accentKey: 'finance',
    hexColor: '#22C55E',
    description: 'Fee collection, payroll & budgeting',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart3,
    accentKey: 'analytics',
    hexColor: '#06B6D4',
    description: 'Insights, reports & dashboards',
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: Bell,
    accentKey: 'notifications',
    hexColor: '#EAB308',
    description: 'Alerts & communication center',
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    accentKey: 'settings',
    hexColor: '#6B7280',
    description: 'System configuration & preferences',
  },
];

export default function TileGrid() {
  const { searchQuery } = useAppStore();

  const filtered = useMemo(() => {
    if (!searchQuery) return modules;
    const q = searchQuery.toLowerCase();
    return modules.filter(
      (m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4 sm:p-6 max-w-5xl mx-auto">
      {filtered.map((mod, i) => (
        <ModuleTile key={mod.id} module={mod} index={i} />
      ))}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-full text-center py-12 text-muted-foreground"
        >
          No modules found for &ldquo;{searchQuery}&rdquo;
        </motion.div>
      )}
    </div>
  );
}
