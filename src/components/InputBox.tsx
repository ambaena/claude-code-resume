'use client';

import { useRef, useEffect } from 'react';
import { colors } from '@/lib/colors';

interface InputBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  focused: boolean;
  onFocus: () => void;
  disabled?: boolean;
}

export function InputBox({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  focused,
  onFocus,
  disabled,
}: InputBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused]);

  const borderColor = focused ? colors.brand : colors.promptBorder;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
      return;
    }
    onKeyDown(e);
  };

  return (
    <div className="w-full" onClick={onFocus}>
      {/* Top border */}
      <div className="flex text-xs sm:text-sm">
        <span style={{ color: borderColor }}>╭</span>
        <span style={{ color: borderColor }} className="flex-1 overflow-hidden">
          {'─'.repeat(200)}
        </span>
        <span style={{ color: borderColor }}>╮</span>
      </div>

      {/* Input row */}
      <div className="flex text-xs sm:text-sm">
        <span style={{ color: borderColor }}>│</span>
        <div className="flex-1 flex items-center min-h-[1.5em] px-1 relative">
          <span style={{ color: colors.brand }} className="mr-1 font-bold select-none">&gt;</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={onFocus}
              disabled={disabled}
              className="absolute inset-0 w-full bg-transparent border-none outline-none text-text font-mono text-xs sm:text-sm caret-transparent"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            {/* Overlay with cursor */}
            <div className="pointer-events-none whitespace-pre flex items-center">
              <span className="text-text">{value}</span>
              {focused && (
                <span
                  className="cursor-blink inline-block w-[0.6em] h-[1.1em] align-middle ml-px"
                  style={{ backgroundColor: colors.text }}
                />
              )}
            </div>
          </div>
          {/* Mobile send button */}
          <button
            className="sm:hidden ml-1 px-2 py-0.5 rounded text-xs font-bold select-none"
            style={{
              backgroundColor: value.trim() ? colors.brand : colors.inactive,
              color: '#fff',
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSubmit();
            }}
            disabled={!value.trim() || disabled}
          >
            Send
          </button>
        </div>
        <span style={{ color: borderColor }}>│</span>
      </div>

      {/* Bottom border */}
      <div className="flex text-xs sm:text-sm">
        <span style={{ color: borderColor }}>╰</span>
        <span style={{ color: borderColor }} className="flex-1 overflow-hidden">
          {'─'.repeat(200)}
        </span>
        <span style={{ color: borderColor }}>╯</span>
      </div>
    </div>
  );
}
