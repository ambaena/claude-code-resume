'use client';

import { filterCommands } from '@/lib/commands';
import { colors } from '@/lib/colors';
import { CommandDefinition } from '@/lib/types';

interface SlashMenuProps {
  input: string;
  selectedIndex: number;
  onSelect: (command: string) => void;
}

export function SlashMenu({ input, selectedIndex, onSelect }: SlashMenuProps) {
  const matches = filterCommands(input);

  if (matches.length === 0) return null;

  return (
    <div className="relative z-10">
      <div
        className="border rounded px-1 py-1 text-xs sm:text-sm max-h-48 overflow-y-auto"
        style={{
          borderColor: colors.promptBorder,
          backgroundColor: colors.surface,
        }}
      >
        {matches.map((cmd: CommandDefinition, i: number) => (
          <div
            key={cmd.name}
            className="px-2 py-0.5 cursor-pointer flex gap-4"
            style={{
              backgroundColor: i === selectedIndex ? 'rgba(87, 105, 247, 0.15)' : 'transparent',
            }}
            onClick={() => onSelect(cmd.name)}
          >
            <span style={{ color: colors.success, minWidth: '120px' }}>{cmd.name}</span>
            <span style={{ color: colors.subtle }}>{cmd.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
