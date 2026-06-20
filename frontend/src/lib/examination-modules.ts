/**
 * CollegeOS — Examination Sub-Module Catalog
 *
 * Single source of truth for the 8 examination sub-modules shown on the
 * Examination launcher page. Every route, sidebar entry, and tile renders
 * from this array, so adding/removing a sub-module only needs an edit here.
 *
 * Convention:
 *   id    — short URL-safe slug (used for /examination/<id>)
 *   code  — human-readable abbreviation shown on the tile (QPD, OSM, …)
 *   name  — full product name
 *   blurb — one-line marketing description
 *   icon  — lucide-react icon component
 *   accent — hex color used to tint the tile; all derive from the
 *            examination purple family so the launcher stays cohesive.
 */

import {
  FileOutput,
  ScanLine,
  MonitorSmartphone,
  Sigma,
  FolderCog,
  LifeBuoy,
  UserCheck,
  Wand2,
  type LucideIcon,
} from 'lucide-react';

export interface ExaminationSubModule {
  id: string;
  code: string;
  name: string;
  blurb: string;
  icon: LucideIcon;
  accent: string;
}

/**
 * Accent palette — eight perceptually-spaced hues neighbouring the
 * examination module purple (oklch hue ≈ 300). Kept here so a future
 * redesign only touches one block.
 */
const ACCENTS = {
  qpd: '#A855F7', // primary examination purple
  osm: '#9333EA',
  oes: '#8B5CF6',
  rps: '#7C3AED',
  qpm: '#C084FC',
  rrs: '#D946EF',
  ses: '#A78BFA',
  qpg: '#9F67F5',
} as const;

export const EXAMINATION_SUBMODULES: ExaminationSubModule[] = [
  {
    id: 'qpd',
    code: 'QPD',
    name: 'Question Paper Delivery',
    blurb:
      'Safe, secure, and reliable method of online delivery of question papers',
    icon: FileOutput,
    accent: ACCENTS.qpd,
  },
  {
    id: 'osm',
    code: 'OSM',
    name: 'On-Screen Marking System',
    blurb:
      'Simple, scalable, and faster method of assessing student\u2019s theory answer papers',
    icon: ScanLine,
    accent: ACCENTS.osm,
  },
  {
    id: 'oes',
    code: 'OES',
    name: 'Online Examination System',
    blurb: 'Highly scalable, distributed online examination system',
    icon: MonitorSmartphone,
    accent: ACCENTS.oes,
  },
  {
    id: 'rps',
    code: 'RPS',
    name: 'Result Processing System',
    blurb: 'Student lifecycle management system for universities.',
    icon: Sigma,
    accent: ACCENTS.rps,
  },
  {
    id: 'qpm',
    code: 'QPM',
    name: 'Question Paper Management',
    blurb:
      'Question paper lifecycle management; appointments to manuscripts',
    icon: FolderCog,
    accent: ACCENTS.qpm,
  },
  {
    id: 'rrs',
    code: 'RRS',
    name: 'Result Redressal System',
    blurb:
      'Quick delivery of answer paper photocopies to students through an online system',
    icon: LifeBuoy,
    accent: ACCENTS.rrs,
  },
  {
    id: 'ses',
    code: 'SES',
    name: 'Student Enrolment System',
    blurb: 'PRN generation, student document verification, and onboarding',
    icon: UserCheck,
    accent: ACCENTS.ses,
  },
  {
    id: 'qpg',
    code: 'QPG',
    name: 'Question Paper Generation',
    blurb:
      'Rule based automatic question paper generation from question bank',
    icon: Wand2,
    accent: ACCENTS.qpg,
  },
];

/** Lookup helper for sub-module pages that need their own metadata. */
export function getExaminationSubModule(
  id: string,
): ExaminationSubModule | undefined {
  return EXAMINATION_SUBMODULES.find((m) => m.id === id);
}
