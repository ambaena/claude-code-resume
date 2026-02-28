'use client';

import { useEffect, useState } from 'react';
import { colors } from '@/lib/colors';
import { siteConfig } from '@/config/site';
import { resume } from '@/lib/resume-data';

interface Segment {
  text: string;
  color?: string;
  bold?: boolean;
}

type Line = Segment[];

function clawdArt(): Line[] {
  return [
    [{ text: '        ▐▛███▜▌', color: colors.brand }],
    [{ text: '       ▝▜█████▛▘', color: colors.brand }],
    [{ text: '         ▘▘ ▝▝', color: colors.brand }],
  ];
}

function buildWelcomeLines(width: number): Line[] {
  const isMobile = width < 768;
  const boxWidth = isMobile ? Math.min(width - 4, 60) : Math.min(width - 4, 100);
  const dividerCol = isMobile ? boxWidth : Math.floor(boxWidth * 0.53);
  const rightStart = dividerCol + 1;
  const rightWidth = boxWidth - rightStart;

  const title = ` ${siteConfig.name} v${siteConfig.version} `;
  const topBorderLeft = '─'.repeat(Math.max(0, Math.floor((boxWidth - title.length - 2) / 2)));
  const topBorderRight = '─'.repeat(Math.max(0, boxWidth - topBorderLeft.length - title.length - 2));

  const padRight = (segments: Segment[], targetLen: number): Segment[] => {
    const textLen = segments.reduce((sum, s) => sum + s.text.length, 0);
    const pad = Math.max(0, targetLen - textLen);
    return [...segments, { text: ' '.repeat(pad) }];
  };

  const leftLine = (segs: Segment[]): Segment[] => padRight(segs, dividerCol);
  const rightLine = (segs: Segment[]): Segment[] => padRight(segs, rightWidth);

  const emptyLeft = (): Segment[] => leftLine([{ text: '' }]);
  const emptyRight = (): Segment[] => rightLine([{ text: '' }]);

  const recentCerts = resume.certificates.slice(-2);

  if (isMobile) {
    // Single panel stacked layout
    const lines: Line[] = [];

    // Top border
    lines.push([
      { text: '╭─', color: colors.brand },
      { text: topBorderLeft, color: colors.brand },
      { text: title, color: colors.brand, bold: true },
      { text: topBorderRight, color: colors.brand },
      { text: '─╮', color: colors.brand },
    ]);

    // Welcome text
    const welcomeRow = padRight([{ text: '  Welcome, stranger!', bold: true }], boxWidth);
    lines.push([{ text: '│', color: colors.brand }, ...welcomeRow, { text: '│', color: colors.brand }]);

    lines.push([{ text: '│', color: colors.brand }, ...padRight([{ text: '' }], boxWidth), { text: '│', color: colors.brand }]);

    // Clawd
    for (const art of clawdArt()) {
      const row = padRight(art, boxWidth);
      lines.push([{ text: '│', color: colors.brand }, ...row, { text: '│', color: colors.brand }]);
    }

    lines.push([{ text: '│', color: colors.brand }, ...padRight([{ text: '' }], boxWidth), { text: '│', color: colors.brand }]);

    // Model info
    const modelLine = padRight([
      { text: `  ${siteConfig.modelName}`, color: colors.text, bold: true },
      { text: ` · `, color: colors.inactive },
      { text: siteConfig.modelTier, color: colors.text },
      { text: ' ·', color: colors.inactive },
    ], boxWidth);
    lines.push([{ text: '│', color: colors.brand }, ...modelLine, { text: '│', color: colors.brand }]);

    const emailLine = padRight([
      { text: `  ${siteConfig.email}'s Portfolio`, color: colors.subtle },
    ], boxWidth);
    lines.push([{ text: '│', color: colors.brand }, ...emailLine, { text: '│', color: colors.brand }]);

    const pathLine = padRight([
      { text: `  ${siteConfig.path}`, color: colors.inactive },
    ], boxWidth);
    lines.push([{ text: '│', color: colors.brand }, ...pathLine, { text: '│', color: colors.brand }]);

    lines.push([{ text: '│', color: colors.brand }, ...padRight([{ text: '' }], boxWidth), { text: '│', color: colors.brand }]);

    // Separator
    lines.push([
      { text: '│', color: colors.brand },
      { text: ' ' + '─'.repeat(boxWidth - 2) + ' ', color: colors.inactive },
      { text: '│', color: colors.brand },
    ]);

    lines.push([{ text: '│', color: colors.brand }, ...padRight([{ text: '' }], boxWidth), { text: '│', color: colors.brand }]);

    // Tips
    const tips = [
      { cmd: '/help', desc: 'List all available commands' },
      { cmd: '/experience', desc: 'Browse my work history' },
      { cmd: '/skills', desc: 'See my technical toolkit' },
      { cmd: '/certs', desc: 'View my certifications' },
    ];

    const tipsHeader = padRight([{ text: '  Tips for getting started', color: colors.subtle, bold: true }], boxWidth);
    lines.push([{ text: '│', color: colors.brand }, ...tipsHeader, { text: '│', color: colors.brand }]);

    lines.push([{ text: '│', color: colors.brand }, ...padRight([{ text: '' }], boxWidth), { text: '│', color: colors.brand }]);

    for (const tip of tips) {
      const tipLine = padRight([
        { text: `   ${tip.cmd.padEnd(14)}`, color: colors.success },
        { text: tip.desc, color: colors.subtle },
      ], boxWidth);
      lines.push([{ text: '│', color: colors.brand }, ...tipLine, { text: '│', color: colors.brand }]);
    }

    lines.push([{ text: '│', color: colors.brand }, ...padRight([{ text: '' }], boxWidth), { text: '│', color: colors.brand }]);

    const chatTip = padRight([
      { text: '   Or just type anything to chat!', color: colors.subtle },
    ], boxWidth);
    lines.push([{ text: '│', color: colors.brand }, ...chatTip, { text: '│', color: colors.brand }]);

    // Bottom border
    lines.push([
      { text: '╰', color: colors.brand },
      { text: '─'.repeat(boxWidth), color: colors.brand },
      { text: '╯', color: colors.brand },
    ]);

    return lines;
  }

  // Desktop: two panels
  const makeDualLine = (left: Segment[], right: Segment[]): Line => {
    return [
      { text: '│', color: colors.brand },
      ...leftLine(left),
      { text: '│', color: colors.inactive },
      ...rightLine(right),
      { text: '│', color: colors.brand },
    ];
  };

  const lines: Line[] = [];

  // Top border
  lines.push([
    { text: '╭─', color: colors.brand },
    { text: topBorderLeft, color: colors.brand },
    { text: title, color: colors.brand, bold: true },
    { text: topBorderRight, color: colors.brand },
    { text: '─╮', color: colors.brand },
  ]);

  // Row 1: empty | Tips header
  lines.push(makeDualLine(
    [],
    [{ text: ' Tips for getting started', color: colors.subtle, bold: true }],
  ));

  // Row 2: Welcome | empty
  lines.push(makeDualLine(
    [{ text: '         Welcome, stranger!', bold: true }],
    [],
  ));

  // Row 3: empty | /help
  lines.push(makeDualLine(
    [],
    [{ text: '  /help', color: colors.success }, { text: '       List all available commands', color: colors.subtle }],
  ));

  // Row 4: empty | /experience
  lines.push(makeDualLine(
    [],
    [{ text: '  /experience', color: colors.success }, { text: ' Browse my work history', color: colors.subtle }],
  ));

  // Row 5: Clawd line 1 | /skills
  lines.push(makeDualLine(
    clawdArt()[0],
    [{ text: '  /skills', color: colors.success }, { text: '     See my technical toolkit', color: colors.subtle }],
  ));

  // Row 6: Clawd line 2 | /certs
  lines.push(makeDualLine(
    clawdArt()[1],
    [{ text: '  /certs', color: colors.success }, { text: '      View my 11 certifications', color: colors.subtle }],
  ));

  // Row 7: Clawd line 3 | Chat tip
  lines.push(makeDualLine(
    clawdArt()[2],
    [{ text: '  Or just type anything to chat with my AI clone!', color: colors.subtle }],
  ));

  // Row 8: empty | separator
  lines.push(makeDualLine(
    [],
    [{ text: ' ' + '─'.repeat(Math.max(0, rightWidth - 2)), color: colors.inactive }],
  ));

  // Row 9: Model info | Recent certs header
  lines.push(makeDualLine(
    [
      { text: ' ' },
      { text: siteConfig.modelName, color: colors.text, bold: true },
      { text: ' · ', color: colors.inactive },
      { text: siteConfig.modelTier, color: colors.text },
      { text: ' ·', color: colors.inactive },
    ],
    [{ text: ' Recent certifications', color: colors.subtle, bold: true }],
  ));

  // Row 10: Email | Cert 1
  lines.push(makeDualLine(
    [{ text: ` ${siteConfig.email}'s Portfolio`, color: colors.subtle }],
    [{ text: `   ${recentCerts[0]?.name ?? ''}`, color: colors.text }],
  ));

  // Row 11: Path | Cert 2
  lines.push(makeDualLine(
    [{ text: `         ${siteConfig.path}`, color: colors.inactive }],
    [{ text: `   ${recentCerts[1]?.name ?? ''}`, color: colors.text }],
  ));

  // Bottom border
  lines.push([
    { text: '╰', color: colors.brand },
    { text: '─'.repeat(boxWidth), color: colors.brand },
    { text: '╯', color: colors.brand },
  ]);

  return lines;
}

function SegmentSpan({ segment }: { segment: Segment }) {
  return (
    <span
      style={{
        color: segment.color ?? colors.text,
        fontWeight: segment.bold ? 'bold' : undefined,
      }}
    >
      {segment.text}
    </span>
  );
}

export function WelcomeScreen() {
  const [width, setWidth] = useState(1024);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const lines = buildWelcomeLines(width);

  return (
    <pre className="text-xs sm:text-sm leading-relaxed select-none whitespace-pre overflow-x-auto">
      {lines.map((line, i) => (
        <div key={i}>
          {line.map((seg, j) => (
            <SegmentSpan key={j} segment={seg} />
          ))}
        </div>
      ))}
    </pre>
  );
}
