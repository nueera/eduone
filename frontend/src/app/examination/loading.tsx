import { ModuleSkeleton } from '@/components/global/ModuleSkeleton';

/**
 * Examination loading skeleton.
 * The accent comes from the global `--module-examination` CSS variable,
 * not a hardcoded hex.
 */
export default function Loading() {
  return <ModuleSkeleton moduleColor="var(--module-examination)" />;
}
