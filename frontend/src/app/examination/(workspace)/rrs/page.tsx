'use client';

import SubModuleLanding from '@/components/collegeos/SubModuleLanding';
import { getExaminationSubModule } from '@/lib/examination-modules';

const subModule = getExaminationSubModule('rrs')!;

const stats = [
  { label: 'Requests Received', value: '612', delta: 9, trend: [480, 510, 545, 575, 595, 612] },
  { label: 'Photocopies Delivered', value: '587', delta: 11, trend: [440, 470, 510, 545, 568, 587] },
  { label: 'Median TAT', value: '38', unit: 'hrs', delta: -18, trend: [62, 55, 48, 44, 41, 38] },
];

const features = [
  'Online application portal for answer-paper photocopy requests',
  'Secure, watermarked digital delivery — only visible to the requesting student',
  'Configurable fee collection per subject with online payment gateway',
  'Dispute flagging — student can raise a re-evaluation request directly from the photocopy view',
  'End-to-end audit log: who requested, who approved, when delivered',
];

const actions = [
  { label: 'New Request', description: 'Apply for an answer paper photocopy' },
  { label: 'Pending Approvals', description: 'Review requests awaiting sign-off' },
  { label: 'Delivery Queue', description: 'Photocopies scheduled for delivery' },
  { label: 'Disputes', description: 'Cases flagged for re-evaluation' },
];

export default function RRSPage() {
  return (
    <SubModuleLanding
      subModule={subModule}
      stats={stats}
      features={features}
      actions={actions}
    />
  );
}
