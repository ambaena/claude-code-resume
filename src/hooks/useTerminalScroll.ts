'use client';

import { useRef, useCallback, useEffect } from 'react';

export function useTerminalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isUserScrolled = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      isUserScrolled.current = scrollHeight - scrollTop - clientHeight > 50;
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (isUserScrolled.current) return;
    requestAnimationFrame(() => {
      const el = containerRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, []);

  return { containerRef, scrollToBottom };
}
