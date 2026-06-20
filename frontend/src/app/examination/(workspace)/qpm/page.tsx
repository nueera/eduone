'use client';

import SubModuleLanding from '@/components/collegeos/SubModuleLanding';
import { getExaminationSubModule } from '@/lib/examination-modules';

const subModule = getExaminationSubModule('qpm')!;

const stats = [
  { label: 'Papers in Pipeline', value: '186', delta: 7, trend: [142, 156, 168, 175, 180, 186] },
  { label: 'Awaiting Approval', value: '24', delta: -5, trend: [38, 33, 30, 28, 26, 24] },
  { label: 'Median Cycle Time', value: '6.2', unit: 'days', delta: -12, trend: [9.1, 8.4, 7.6, 6.9, 6.5, 6.2] },
];

const features = [
  'Full question paper lifecycle: appointment → draft → review → final manuscript',
  'Role-based workflow for setter, moderator, scrutinizer, and controller',
  'Version control for every revision with diff view and rollback',
  'Secure vault for approved papers with time-locked access windows',
  'Notification engine for pending tasks and overdue stages',
];

const actions = [
  { label: 'New Appointment', description: 'Appoint a setter for an upcoming paper' },
  { label: 'Review Queue', description: 'Papers awaiting your sign-off' },
  { label: 'Vault', description: 'Browse approved question papers' },
  { label: 'Workflow Settings', description: 'Configure stages and approvers' },
];

export default function QPMPage() {
  return (
    <SubModuleLanding
      subModule={subModule}
      stats={stats}
      features={features}
      actions={actions}
    />
  );
}
