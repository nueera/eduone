'use client';

import { useTheme } from 'next-themes';
import { useMounted } from '@/hooks/use-mounted';
import { useAppStore, DEFAULT_ACCENT } from '@/stores/useAppStore';

export default function Background() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const { accentColor } = useAppStore();

  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const hue = mounted ? accentColor.oklchHue : DEFAULT_ACCENT.oklchHue;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-in-out"
        style={{
          background: isDark
            ? `linear-gradient(145deg, oklch(0.1 0.02 ${hue + 10}) 0%, oklch(0.08 0.03 ${hue + 20}) 35%, oklch(0.06 0.02 ${hue - 10}) 70%, oklch(0.07 0.025 ${hue}) 100%)`
            : `linear-gradient(145deg, oklch(0.985 0.003 ${hue - 10}) 0%, oklch(0.96 0.005 ${hue}) 35%, oklch(0.975 0.004 ${hue + 10}) 70%, oklch(0.97 0.003 ${hue - 10}) 100%)`,
        }}
      />

      {/* Dot grid pattern */}
      <div className="absolute inset-0 dot-grid opacity-60" />

      {/* Animated gradient orbs - dark mode */}
      {isDark && (
        <>
          <div
            className="orb-1 absolute rounded-full"
            style={{
              width: '480px',
              height: '480px',
              top: '5%',
              left: '10%',
              background: `radial-gradient(circle, oklch(0.28 0.08 ${hue} / 6%) 0%, transparent 70%)`,
              filter: 'blur(80px)',
            }}
          />
          <div
            className="orb-2 absolute rounded-full"
            style={{
              width: '360px',
              height: '360px',
              top: '45%',
              right: '5%',
              background: `radial-gradient(circle, oklch(0.32 0.08 ${hue + 40 > 360 ? hue + 40 - 360 : hue + 40} / 4%) 0%, transparent 70%)`,
              filter: 'blur(80px)',
            }}
          />
          <div
            className="orb-3 absolute rounded-full"
            style={{
              width: '320px',
              height: '320px',
              bottom: '5%',
              left: '35%',
              background: `radial-gradient(circle, oklch(0.25 0.06 ${hue + 80 > 360 ? hue + 80 - 360 : hue + 80} / 4%) 0%, transparent 70%)`,
              filter: 'blur(80px)',
            }}
          />
        </>
      )}

      {/* Animated gradient orbs - light mode */}
      {mounted && !isDark && (
        <>
          <div
            className="orb-1 absolute rounded-full"
            style={{
              width: '480px',
              height: '480px',
              top: '5%',
              left: '10%',
              background: `radial-gradient(circle, oklch(0.72 0.03 ${hue} / 3%) 0%, transparent 70%)`,
              filter: 'blur(100px)',
            }}
          />
          <div
            className="orb-2 absolute rounded-full"
            style={{
              width: '360px',
              height: '360px',
              top: '45%',
              right: '5%',
              background: `radial-gradient(circle, oklch(0.75 0.03 ${hue + 40 > 360 ? hue + 40 - 360 : hue + 40} / 2%) 0%, transparent 70%)`,
              filter: 'blur(100px)',
            }}
          />
          <div
            className="orb-3 absolute rounded-full"
            style={{
              width: '320px',
              height: '320px',
              bottom: '5%',
              left: '35%',
              background: `radial-gradient(circle, oklch(0.7 0.025 ${hue + 80 > 360 ? hue + 80 - 360 : hue + 80} / 2%) 0%, transparent 70%)`,
              filter: 'blur(100px)',
            }}
          />
        </>
      )}
    </div>
  );
}
