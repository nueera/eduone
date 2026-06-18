'use client';

import { motion } from 'framer-motion';

interface ModuleSkeletonProps {
  moduleColor: string;
}

export function ModuleSkeleton({ moduleColor }: ModuleSkeletonProps) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-xl animate-pulse"
          style={{ backgroundColor: `${moduleColor}20` }}
        />
        <div className="space-y-2">
          <div className="h-5 w-40 rounded bg-muted animate-pulse" />
          <div className="h-3 w-24 rounded bg-muted animate-pulse" />
        </div>
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass rounded-xl p-4 space-y-3">
            <div className="h-3 w-20 rounded bg-muted animate-pulse" />
            <div className="h-7 w-16 rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="glass rounded-xl p-4">
        <div className="h-4 w-32 rounded bg-muted animate-pulse mb-4" />
        <div className="h-48 rounded bg-muted animate-pulse" />
      </div>

      {/* Table skeleton */}
      <div className="glass rounded-xl p-4 space-y-3">
        <div className="h-4 w-24 rounded bg-muted animate-pulse" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4">
            <div className="h-3 flex-1 rounded bg-muted animate-pulse" />
            <div className="h-3 w-20 rounded bg-muted animate-pulse" />
            <div className="h-3 w-16 rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
