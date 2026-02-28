'use client';

import { resume } from '@/lib/resume-data';
import { colors } from '@/lib/colors';

export function AboutOutput() {
  const { basics, work } = resume;
  const currentRole = work[0];

  return (
    <div className="text-xs sm:text-sm py-1">
      <div className="mb-2">
        <span style={{ color: colors.brand }} className="font-bold">{basics.name}</span>
        <span style={{ color: colors.inactive }}> — </span>
        <span style={{ color: colors.subtle }}>{basics.label}</span>
      </div>

      {/* Summary box */}
      <div className="mb-2">
        <div style={{ color: colors.promptBorder }}>╭{'─'.repeat(70)}╮</div>
        <div className="flex">
          <span style={{ color: colors.promptBorder }}>│ </span>
          <span className="flex-1 whitespace-pre-wrap" style={{ color: colors.text }}>
            {basics.summary}
          </span>
        </div>
        <div style={{ color: colors.promptBorder }}>╰{'─'.repeat(70)}╯</div>
      </div>

      <div className="space-y-0.5">
        <div>
          <span style={{ color: colors.success }}>  Current Role  </span>
          <span style={{ color: colors.text }}>{currentRole.position} @ {currentRole.name}</span>
        </div>
        <div>
          <span style={{ color: colors.success }}>  Location      </span>
          <span style={{ color: colors.text }}>{basics.location.city}, {basics.location.region}</span>
        </div>
        <div>
          <span style={{ color: colors.success }}>  Website       </span>
          <a href={`https://${basics.url}`} target="_blank" rel="noopener noreferrer">{basics.url}</a>
        </div>
      </div>
    </div>
  );
}
