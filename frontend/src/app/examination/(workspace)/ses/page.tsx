'use client';

import SubModuleLanding from '@/components/collegeos/SubModuleLanding';
import { getExaminationSubModule } from '@/lib/examination-modules';

const subModule = getExaminationSubModule('ses')!;

const stats = [
  { label: 'Students Onboarded', value: '14,820', delta: 6, trend: [12800, 13400, 13800, 14200, 14500, 14820] },
  { label: 'PRNs Generated', value: '3,240', delta: 14, trend: [2400, 2650, 2850, 3050, 3180, 3240] },
  { label: 'Pending Verification', value: '47', delta: -22, trend: [98, 78, 65, 58, 52, 47] },
];

const features = [
  'Automatic PRN (Permanent Registration Number) generation on enrollment',
  'Document verification workflow with checklist + reviewer sign-off',
  'Online onboarding forms with e-signature and digital photograph upload',
  'Integration with Aadhaar / DigiLocker for identity validation',
  'Bulk import via CSV for legacy student migration',
];

const actions = [
  { label: 'New Enrollment', description: 'Onboard a new student into the system' },
  { label: 'PRN Lookup', description: 'Search PRNs by name, mobile, or DOB' },
  { label: 'Verification Queue', description: 'Pending document verifications' },
  { label: 'Bulk Import', description: 'Upload a CSV of legacy students' },
];

export default function SESPage() {
  return (
    <SubModuleLanding
      subModule={subModule}
      stats={stats}
      features={features}
      actions={actions}
    />
  );
}
