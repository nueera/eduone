'use client';

import SubModuleLanding from '@/components/collegeos/SubModuleLanding';
import { getExaminationSubModule } from '@/lib/examination-modules';

const subModule = getExaminationSubModule('qpg')!;

const stats = [
  { label: 'Papers Generated', value: '2,860', delta: 21, trend: [1900, 2100, 2350, 2550, 2720, 2860] },
  { label: 'Question Bank Size', value: '18.4', unit: 'K', delta: 8, trend: [15.2, 16.1, 16.9, 17.5, 18.0, 18.4] },
  { label: 'Avg Generation Time', value: '2.4', unit: 's', delta: -40, trend: [6.2, 5.1, 4.0, 3.2, 2.8, 2.4] },
];

const features = [
  'Rule-based automatic paper generation from a tagged question bank',
  'Difficulty + topic + Bloom\u2019s taxonomy weighting per question',
  'Multiple blueprints per exam — generate variants A/B/C in one click',
  'Auto-balance total marks and time estimate against the configured syllabus',
  'Export to PDF / Word / QTI for direct import into OES or print workflows',
];

const actions = [
  { label: 'New Blueprint', description: 'Define the rules for a generated paper' },
  { label: 'Generate Paper', description: 'Run the generator against a blueprint' },
  { label: 'Question Bank', description: 'Add, tag, and review bank questions' },
  { label: 'Generated Archive', description: 'Browse previously generated papers' },
];

export default function QPGPage() {
  return (
    <SubModuleLanding
      subModule={subModule}
      stats={stats}
      features={features}
      actions={actions}
    />
  );
}
