'use client';

import { colors } from '@/lib/colors';

interface StreamingTextProps {
  content: string;
}

export function StreamingText({ content }: StreamingTextProps) {
  return (
    <div className="text-xs sm:text-sm py-1">
      {/* Left border line */}
      <div className="flex">
        <div
          className="w-0.5 mr-3 flex-shrink-0 self-stretch rounded"
          style={{ backgroundColor: colors.bashBorder }}
        />
        <div className="flex-1 whitespace-pre-wrap break-words" style={{ color: colors.text }}>
          {content}
        </div>
      </div>
    </div>
  );
}
