'use client';

import SubModuleLanding from '@/components/collegeos/SubModuleLanding';
import { getExaminationSubModule } from '@/lib/examination-modules';

const subModule = getExaminationSubModule('osm')!;

const stats = [
  { label: 'Papers Evaluated', value: '8,492', delta: 18, trend: [6200, 6900, 7400, 7800, 8100, 8492] },
  { label: 'Active Evaluators', value: '124', delta: 5, trend: [98, 105, 112, 118, 121, 124] },
  { label: 'Avg Marks/Min', value: '6.8', delta: 9, trend: [5.1, 5.6, 6.0, 6.3, 6.5, 6.8] },
];

const features = [
  'On-screen evaluation of scanned answer sheets with annotation tools',
  'Automatic masking of student identity to ensure blind grading',
  'Question-wise marks distribution with real-time totals',
  'Multi-evaluator workflow with arbitration for score disagreements',
  'Built-in progress dashboard per evaluator and per subject',
];

const actions = [
  { label: 'New Evaluation Batch', description: 'Allocate answer sheets to evaluators' },
  { label: 'Evaluator Performance', description: 'Throughput and accuracy reports' },
  { label: 'Re-evaluation Queue', description: 'Manage re-grading requests' },
  { label: 'Export Marks', description: 'Download consolidated mark sheets' },
];

export default function OSMPage() {
  return (
    <SubModuleLanding
      subModule={subModule}
      stats={stats}
      features={features}
      actions={actions}
    />
  );
}
