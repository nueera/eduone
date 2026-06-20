'use client';

import SubModuleLanding from '@/components/collegeos/SubModuleLanding';
import { getExaminationSubModule } from '@/lib/examination-modules';

const subModule = getExaminationSubModule('oes')!;

const stats = [
  { label: 'Active Exams', value: '36', delta: 4, trend: [22, 26, 30, 33, 35, 36] },
  { label: 'Concurrent Candidates', value: '12.4', unit: 'K', delta: 22, trend: [8.2, 9.1, 10.3, 11.0, 11.8, 12.4] },
  { label: 'Uptime', value: '99.98', unit: '%', delta: 0.02, trend: [99.92, 99.95, 99.96, 99.97, 99.98, 99.98] },
];

const features = [
  'Highly scalable distributed exam engine — handles 50K+ concurrent candidates',
  'Question randomization and shuffling per candidate to prevent collusion',
  'Auto-save every 15 seconds; resume on reconnect after network drops',
  'Proctoring integration with webcam snapshot + tab-switch detection',
  'Sectional timing, negative marking, and question-pool support out of the box',
];

const actions = [
  { label: 'Create Exam', description: 'Configure a new online examination' },
  { label: 'Live Monitoring', description: 'Watch ongoing exam sessions in real time' },
  { label: 'Question Pool', description: 'Manage question banks used by randomizer' },
  { label: 'Proctoring Reports', description: 'Review flagged candidate sessions' },
];

export default function OESPage() {
  return (
    <SubModuleLanding
      subModule={subModule}
      stats={stats}
      features={features}
      actions={actions}
    />
  );
}
