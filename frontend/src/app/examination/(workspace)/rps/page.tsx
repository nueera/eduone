'use client';

import SubModuleLanding from '@/components/collegeos/SubModuleLanding';
import { getExaminationSubModule } from '@/lib/examination-modules';

const subModule = getExaminationSubModule('rps')!;

const stats = [
  { label: 'Results Processed', value: '4,210', delta: 11, trend: [3100, 3400, 3700, 3900, 4050, 4210] },
  { label: 'Grade Disputes', value: '17', delta: -23, trend: [42, 36, 28, 22, 19, 17] },
  { label: 'Avg Processing Time', value: '1.8', unit: 'days', delta: -22, trend: [3.2, 2.8, 2.4, 2.1, 1.9, 1.8] },
];

const features = [
  'End-to-end result lifecycle from raw marks to published transcripts',
  'Configurable grading rules: absolute, relative, or GPA-based per program',
  'Automatic SGPA / CGPA computation with arrears and re-attempt handling',
  'Bulk result publication with lockdown + sign-off workflow',
  'Student lifecycle hooks — provisional certificate, migration, etc.',
];

const actions = [
  { label: 'Process New Batch', description: 'Run grading rules on a fresh marks dataset' },
  { label: 'Re-evaluate', description: 'Trigger re-grading for selected students' },
  { label: 'Publish Results', description: 'Push approved results to student portal' },
  { label: 'Transcripts', description: 'Generate official mark sheets in bulk' },
];

export default function RPSPage() {
  return (
    <SubModuleLanding
      subModule={subModule}
      stats={stats}
      features={features}
      actions={actions}
    />
  );
}
