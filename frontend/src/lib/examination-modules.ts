/**
 * CollegeOS — Examination Sub-Module Catalog
 *
 * Single source of truth for the 8 examination sub-modules shown on the
 * Examination launcher page. Every route, sidebar entry, and tile renders
 * from this array, so adding/removing a sub-module only needs an edit here.
 *
 * Convention:
 *   id     — short URL-safe slug (used for /examination/<id>)
 *   code   — human-readable abbreviation shown on the tile (QPD, OSM, …)
 *   name   — full product name
 *   blurb  — one-line marketing description
 *   icon   — lucide-react icon component
 *   accent — CSS variable reference (e.g. `var(--exam-accent-qpd)`)
 *            pointing at a token defined in globals.css. No hardcoded hex
 *            values; the entire palette is theme-aware (light/dark) and
 *            lives in one place.
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
  /** CSS variable reference — resolved at render time via `--panel-accent`. */
  accent: string;
}

/**
 * Accent palette — eight CSS variable references, one per sub-module.
 * The variables themselves are defined in `globals.css` under both
 * `:root` (light) and `.dark` (dark), so a future palette refresh only
 * touches one block in CSS, never this file.
 */
const ACCENTS = {
  qpd: 'var(--exam-accent-qpd)',
  osm: 'var(--exam-accent-osm)',
  oes: 'var(--exam-accent-oes)',
  rps: 'var(--exam-accent-rps)',
  qpm: 'var(--exam-accent-qpm)',
  rrs: 'var(--exam-accent-rrs)',
  ses: 'var(--exam-accent-ses)',
  qpg: 'var(--exam-accent-qpg)',
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
