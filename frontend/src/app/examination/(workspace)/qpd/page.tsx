'use client';

import { FileOutput } from 'lucide-react';
import SubModuleLanding from '@/components/collegeos/SubModuleLanding';
import { getExaminationSubModule } from '@/lib/examination-modules';

const subModule = getExaminationSubModule('qpd')!;

const stats = [
  { label: 'Papers Delivered', value: '1,284', delta: 12, trend: [980, 1050, 1120, 1180, 1240, 1284] },
  { label: 'Pending', value: '23', delta: -8, trend: [45, 38, 32, 28, 25, 23] },
  { label: 'Avg Delivery Time', value: '4.2', unit: 'min', delta: -15, trend: [8, 7, 6, 5, 4.5, 4.2] },
];

const features = [
  'End-to-end encrypted question paper delivery to exam centres',
  'Time-locked release — papers unlock only at the scheduled exam start',
  'Dual authorization: setter + controller sign-off before release',
  'Audit trail with IP + device fingerprint logging for every access',
  'Automatic retry + fallback channel for low-bandwidth centres',
];

const actions = [
  { label: 'Schedule Delivery', description: 'Create a new delivery window for an upcoming exam' },
  { label: 'Track Shipments', description: 'Monitor real-time status of in-transit papers' },
  { label: 'Audit Logs', description: 'Review access logs for delivered papers' },
  { label: 'Manage Centres', description: 'Add or update exam centre endpoints' },
];

export default function QPDPage() {
  return (
    <SubModuleLanding
      subModule={subModule}
      stats={stats}
      features={features}
      actions={actions}
    />
  );
}
