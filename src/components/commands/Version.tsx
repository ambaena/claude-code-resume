'use client';

import { siteConfig } from '@/config/site';
import { colors } from '@/lib/colors';

export function Version() {
  return (
    <div className="text-xs sm:text-sm py-1" style={{ color: colors.subtle }}>
      {siteConfig.name} v{siteConfig.version} — Built with Next.js, TypeScript, and too much Claude Code
    </div>
  );
}
