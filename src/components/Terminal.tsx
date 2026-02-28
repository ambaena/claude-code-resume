'use client';

import { useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { InputBox } from './InputBox';
import { SlashMenu } from './SlashMenu';
import { Spinner } from './Spinner';
import { StreamingText } from './StreamingText';
import { useCommandHistory } from '@/hooks/useCommandHistory';
import { useAutoComplete } from '@/hooks/useAutoComplete';
import { useTerminalScroll } from '@/hooks/useTerminalScroll';
import { findCommand, fuzzyMatch, filterCommands } from '@/lib/commands';
import { colors } from '@/lib/colors';
import { siteConfig } from '@/config/site';

// Command outputs
import { HelpOutput } from './commands/HelpOutput';
import { AboutOutput } from './commands/AboutOutput';
import { ExperienceOutput } from './commands/ExperienceOutput';
import { SkillsOutput } from './commands/SkillsOutput';
import { EducationOutput } from './commands/EducationOutput';
import { CertsOutput } from './commands/CertsOutput';
import { ContactOutput } from './commands/ContactOutput';
import { ModelsOutput } from './commands/ModelsOutput';
import { LanguagesOutput } from './commands/LanguagesOutput';
import { StatusOutput } from './commands/StatusOutput';
import { CostOutput } from './commands/CostOutput';
import { DoctorOutput } from './commands/DoctorOutput';
import { DownloadOutput } from './commands/DownloadOutput';

interface HistoryEntry {
  id: string;
  type: 'welcome' | 'command' | 'ai';
  input?: string;
  output?: ReactNode;
  aiContent?: string;
  isStreaming?: boolean;
}

export function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    { id: 'welcome', type: 'welcome' },
  ]);
  const [focused, setFocused] = useState(true);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [compact, setCompact] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const cmdHistory = useCommandHistory();
  const { complete } = useAutoComplete();
  const { containerRef, scrollToBottom } = useTerminalScroll();
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll on history changes
  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  // Focus input on click anywhere
  useEffect(() => {
    const handler = () => setFocused(true);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        handleClear();
      }
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        if (abortRef.current) {
          abortRef.current.abort();
          abortRef.current = null;
          setIsAiLoading(false);
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const addEntry = useCallback((entry: Omit<HistoryEntry, 'id'>) => {
    setHistory((prev) => [...prev, { ...entry, id: crypto.randomUUID() }]);
  }, []);

  const handleClear = useCallback(() => {
    setHistory([{ id: 'welcome', type: 'welcome' }]);
  }, []);

  const renderCommandOutput = useCallback((commandName: string): ReactNode | null => {
    switch (commandName) {
      case '/help': return <HelpOutput compact={compact} />;
      case '/about': return <AboutOutput />;
      case '/experience': return <ExperienceOutput compact={compact} />;
      case '/skills': return <SkillsOutput />;
      case '/education': return <EducationOutput />;
      case '/certs': return <CertsOutput compact={compact} />;
      case '/contact': return <ContactOutput />;
      case '/models': return <ModelsOutput />;
      case '/languages': return <LanguagesOutput />;
      case '/status': return <StatusOutput />;
      case '/cost': return <CostOutput />;
      case '/doctor': return <DoctorOutput />;
      case '/download': return <DownloadOutput />;
      case '/version':
        return (
          <div className="text-xs sm:text-sm py-1" style={{ color: colors.subtle }}>
            {siteConfig.name} v{siteConfig.version} — Built with Next.js, TypeScript, and too much coffee
          </div>
        );
      case '/init':
        return (
          <div className="text-xs sm:text-sm py-1">
            <div style={{ color: colors.subtle }}>Creating ALFONSO.md...</div>
            <div style={{ color: colors.success }}>Done! Portfolio initialized. Type /help to explore.</div>
          </div>
        );
      case '/theme':
        return null; // handled separately
      case '/compact':
        return null; // handled separately
      case '/clear':
        return null; // handled separately
      default:
        return null;
    }
  }, [compact]);

  const handleAIChat = useCallback(async (message: string) => {
    const entryId = crypto.randomUUID();
    setIsAiLoading(true);

    setHistory((prev) => [
      ...prev,
      { id: entryId, type: 'ai', input: message, aiContent: '', isStreaming: true },
    ]);

    try {
      const controller = new AbortController();
      abortRef.current = controller;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        if (response.status === 429) {
          setHistory((prev) =>
            prev.map((e) =>
              e.id === entryId
                ? { ...e, aiContent: 'Whoa, slow down! I need a coffee break. Rate limit reached — try again in a minute.', isStreaming: false }
                : e,
            ),
          );
          setIsAiLoading(false);
          return;
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          // Parse SSE format
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('0:')) {
              // Vercel AI SDK text stream format
              try {
                const text = JSON.parse(line.slice(2));
                accumulated += text;
              } catch {
                // Try raw text
                accumulated += line.slice(2);
              }
            }
          }

          setHistory((prev) =>
            prev.map((e) =>
              e.id === entryId ? { ...e, aiContent: accumulated } : e,
            ),
          );
        }
      }

      setHistory((prev) =>
        prev.map((e) =>
          e.id === entryId ? { ...e, isStreaming: false } : e,
        ),
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        setHistory((prev) =>
          prev.map((e) =>
            e.id === entryId ? { ...e, aiContent: (e.aiContent || '') + '\n[cancelled]', isStreaming: false } : e,
          ),
        );
      } else {
        setHistory((prev) =>
          prev.map((e) =>
            e.id === entryId
              ? { ...e, aiContent: 'Oops, something went wrong. My neural networks need a reboot. Try again!', isStreaming: false }
              : e,
          ),
        );
      }
    } finally {
      setIsAiLoading(false);
      abortRef.current = null;
    }
  }, []);

  const handleSubmit = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setShowSlashMenu(false);
    setMenuIndex(0);
    cmdHistory.push(trimmed);

    if (trimmed.startsWith('/')) {
      const cmd = findCommand(trimmed);

      if (cmd) {
        // Special commands
        if (cmd.name === '/clear') {
          handleClear();
          setInput('');
          return;
        }
        if (cmd.name === '/theme') {
          setIsDark((d) => !d);
          addEntry({
            type: 'command',
            input: trimmed,
            output: (
              <div className="text-xs sm:text-sm py-1" style={{ color: colors.success }}>
                Theme toggled. {isDark ? 'Light' : 'Dark'} mode activated.
              </div>
            ),
          });
          setInput('');
          return;
        }
        if (cmd.name === '/compact') {
          setCompact((c) => !c);
          addEntry({
            type: 'command',
            input: trimmed,
            output: (
              <div className="text-xs sm:text-sm py-1" style={{ color: colors.success }}>
                Compact mode {compact ? 'disabled' : 'enabled'}.
              </div>
            ),
          });
          setInput('');
          return;
        }

        const output = renderCommandOutput(cmd.name);
        addEntry({ type: 'command', input: trimmed, output });
      } else {
        // Unknown command — fuzzy match
        const suggestion = fuzzyMatch(trimmed);
        addEntry({
          type: 'command',
          input: trimmed,
          output: (
            <div className="text-xs sm:text-sm py-1">
              <span style={{ color: colors.error }}>
                command not found: {trimmed}
              </span>
              {suggestion && (
                <span style={{ color: colors.subtle }}>
                  {' '}— Did you mean{' '}
                  <span style={{ color: colors.success }}>{suggestion}</span>?
                </span>
              )}
            </div>
          ),
        });
      }
    } else {
      // Easter eggs
      const lower = trimmed.toLowerCase();
      if (lower === 'sudo hire alfonso') {
        addEntry({
          type: 'command',
          input: trimmed,
          output: (
            <StreamingText content="Permission granted. Sending offer letter... Just kidding, but seriously, check /contact!" />
          ),
        });
        setInput('');
        return;
      }

      // AI chat
      handleAIChat(trimmed);
    }

    setInput('');
  }, [input, cmdHistory, handleClear, addEntry, renderCommandOutput, handleAIChat, compact, isDark]);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    cmdHistory.reset();

    if (value.startsWith('/') && value.length > 1) {
      const matches = filterCommands(value);
      setShowSlashMenu(matches.length > 0);
      setMenuIndex(0);
    } else if (value === '/') {
      setShowSlashMenu(true);
      setMenuIndex(0);
    } else {
      setShowSlashMenu(false);
    }
  }, [cmdHistory]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const completed = complete(input);
      if (completed) {
        setInput(completed);
        setShowSlashMenu(false);
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (showSlashMenu) {
        setMenuIndex((i) => Math.max(0, i - 1));
      } else {
        const prev = cmdHistory.navigateUp(input);
        if (prev !== null) setInput(prev);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (showSlashMenu) {
        const matches = filterCommands(input);
        setMenuIndex((i) => Math.min(matches.length - 1, i + 1));
      } else {
        const next = cmdHistory.navigateDown();
        if (next !== null) setInput(next);
      }
      return;
    }

    if (e.key === 'Enter' && showSlashMenu) {
      e.preventDefault();
      const matches = filterCommands(input);
      if (matches[menuIndex]) {
        setInput(matches[menuIndex].name);
        setShowSlashMenu(false);
      }
      return;
    }

    if (e.key === 'Escape') {
      setShowSlashMenu(false);
    }
  }, [input, showSlashMenu, menuIndex, cmdHistory, complete]);

  const bgColor = isDark ? colors.bg : '#F5F5F0';
  const textColor = isDark ? colors.text : '#1A1A2E';

  return (
    <div
      className="h-screen flex flex-col overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Scrollable output area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-2 sm:px-4 py-2 sm:py-4"
      >
        <div className="max-w-[1100px] mx-auto">
          {history.map((entry) => {
            if (entry.type === 'welcome') {
              return <WelcomeScreen key={entry.id} />;
            }

            if (entry.type === 'command') {
              return (
                <div key={entry.id} className="mb-2">
                  {/* Command echo */}
                  <div className="text-xs sm:text-sm">
                    <span style={{ color: colors.brand }} className="font-bold">&gt; </span>
                    <span style={{ color: colors.text }}>{entry.input}</span>
                  </div>
                  {/* Command output */}
                  {entry.output}
                </div>
              );
            }

            if (entry.type === 'ai') {
              return (
                <div key={entry.id} className="mb-2">
                  {/* User message echo */}
                  <div className="text-xs sm:text-sm">
                    <span style={{ color: colors.brand }} className="font-bold">&gt; </span>
                    <span style={{ color: colors.text }}>{entry.input}</span>
                  </div>
                  {/* AI response */}
                  {entry.isStreaming && !entry.aiContent ? (
                    <Spinner />
                  ) : (
                    <StreamingText content={entry.aiContent || ''} />
                  )}
                  {entry.isStreaming && entry.aiContent && <Spinner />}
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>

      {/* Input area - fixed at bottom */}
      <div className="flex-shrink-0 px-2 sm:px-4 pb-2 sm:pb-4">
        <div className="max-w-[1100px] mx-auto">
          {showSlashMenu && (
            <SlashMenu
              input={input}
              selectedIndex={menuIndex}
              onSelect={(cmd) => {
                setInput(cmd);
                setShowSlashMenu(false);
              }}
            />
          )}
          <InputBox
            value={input}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            focused={focused}
            onFocus={() => setFocused(true)}
            disabled={isAiLoading}
          />
        </div>
      </div>
    </div>
  );
}
