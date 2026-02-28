'use client';

import { useState, useEffect } from 'react';
import { colors } from '@/lib/colors';

export function DownloadOutput() {
  const [stage, setStage] = useState<'downloading' | 'done'>('downloading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('done');
      // Trigger actual download
      const link = document.createElement('a');
      link.href = '/alfonso-baena-resume.pdf';
      link.download = 'alfonso-baena-resume.pdf';
      link.click();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-xs sm:text-sm py-1">
      {stage === 'downloading' ? (
        <div>
          <span style={{ color: colors.subtle }}>Downloading resume... </span>
          <span style={{ color: colors.brand }} className="cursor-blink">●</span>
        </div>
      ) : (
        <div>
          <span style={{ color: colors.success }}>✓ Resume downloaded successfully.</span>
          <div style={{ color: colors.subtle }} className="mt-0.5">
            If the download didn&apos;t start,{' '}
            <a href="/alfonso-baena-resume.pdf" download>click here</a>.
          </div>
        </div>
      )}
    </div>
  );
}
