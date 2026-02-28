'use client';

import { commands } from '@/lib/commands';
import { colors } from '@/lib/colors';

export function HelpOutput({ compact }: { compact?: boolean }) {
  const categories = {
    content: 'Resume Commands',
    system: 'System Commands',
    fun: 'Fun Commands',
  } as const;

  const grouped = commands.reduce<Record<string, typeof commands>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  return (
    <div className="text-xs sm:text-sm py-1 space-y-2">
      {Object.entries(categories).map(([key, label]) => (
        <div key={key}>
          <div style={{ color: colors.brand }} className="font-bold mb-1">{label}</div>
          {grouped[key]?.map((cmd) => (
            <div key={cmd.name} className="flex gap-2 pl-2">
              <span style={{ color: colors.success, minWidth: compact ? '100px' : '140px' }} className="inline-block">
                {cmd.name}
              </span>
              {cmd.aliases.length > 0 && !compact && (
                <span style={{ color: colors.inactive }} className="inline-block min-w-[120px]">
                  {cmd.aliases.join(', ')}
                </span>
              )}
              <span style={{ color: colors.subtle }}>{cmd.description}</span>
            </div>
          ))}
        </div>
      ))}
      <div style={{ color: colors.subtle }} className="mt-2">
        Or type anything without / to chat with my AI clone!
      </div>
    </div>
  );
}
