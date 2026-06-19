'use client';

import { useAppStore, MODULE_ACCENTS } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';

const accentOptions = Object.entries(MODULE_ACCENTS).map(([key, val]) => ({
  key,
  ...val,
}));

export default function AccentPicker() {
  const { accentColor, setAccentColor } = useAppStore();

  return (
    <div className="flex items-center gap-2">
      {accentOptions.map((opt) => (
        <button
          key={opt.key}
          onClick={() => setAccentColor({ name: opt.name, hex: opt.hex, oklchHue: opt.oklchHue })}
          className={cn(
            'w-5 h-5 rounded-full transition-all duration-200 hover:scale-125',
            accentColor.hex === opt.hex && 'ring-2 ring-offset-2 ring-offset-background scale-110'
          )}
          style={{
            backgroundColor: opt.hex,
            // Tailwind's `ring` color via the className above uses --tw-ring-color.
            // Set it here so the active ring matches the swatch color.
            ['--tw-ring-color' as string]: opt.hex,
          }}
          title={opt.name}
        />
      ))}
    </div>
  );
}
