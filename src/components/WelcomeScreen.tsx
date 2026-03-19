'use client';

import { colors } from '@/lib/colors';
import { siteConfig } from '@/config/site';
import { careerModels } from './commands/Models';
import { personalConfig } from '@/config/personal';

interface WelcomeScreenProps {
  currentModelIndex?: number;
}

const tips = personalConfig.welcomeTips;

const recentActivity = personalConfig.recentActivity;

function ClawdArt() {
  return (
    <pre className="text-xs sm:text-sm leading-tight" style={{ color: colors.brand }}>
      {`  ▐▛███▜▌\n ▝▜█████▛▘\n   ▘▘ ▝▝`}
    </pre>
  );
}

export function WelcomeScreen({ currentModelIndex = 0 }: WelcomeScreenProps) {
  const model = careerModels[currentModelIndex];

  return (
    <div className="text-xs sm:text-sm select-none mb-4">
      {/* Path display */}
      <div className="mb-1" style={{ color: colors.inactive }}>
        {siteConfig.path}
      </div>
      <div className="mb-3">
        <span style={{ color: colors.text }} className="font-bold">❯ </span>
        <span style={{ color: colors.text }}>claude</span>
      </div>

      {/* Top border: ╭─── Claude Resume v2.1.63 ───...─╮ */}
      <div className="flex whitespace-pre overflow-hidden" style={{ color: colors.brand }}>
        <span>╭───</span>
        <span>{` ${siteConfig.name} `}</span>
        <span className="text-white">{`v${siteConfig.version} `}</span>
        <span className="flex-1 overflow-hidden">{'─'.repeat(200)}</span>
        <span>╮</span>
      </div>

      {/* Content with text-aligned side borders */}
      <div className="flex" style={{ color: colors.brand }}>
        {/* Left border — 1px line centered in 1ch, aligns with ╭/╰ */}
        <div
          className="w-[1ch] shrink-0"
          style={{
            backgroundImage: `linear-gradient(${colors.brand}, ${colors.brand})`,
            backgroundSize: '1px 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row">
            {/* Left panel */}
            <div className="flex-1 p-3 flex flex-col items-center justify-center gap-2">
              <div className="font-bold" style={{ color: colors.text }}>
                Welcome, stranger!
              </div>

              <ClawdArt />

              <div className="text-center space-y-0.5">
                <div>
                  <span style={{ color: colors.text }} className="font-bold">
                    {model?.name ?? siteConfig.modelName}
                  </span>
                  <span style={{ color: colors.inactive }}> · </span>
                  <span style={{ color: colors.text }}>
                    {model?.subtitle ?? siteConfig.modelTier}
                  </span>
                  <span style={{ color: colors.inactive }}> ·</span>
                </div>
                <a
                  href={siteConfig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: colors.subtle, textDecoration: 'none' }}
                >
                  {siteConfig.url.replace(/^https?:\/\//, '')}
                </a>
                <div style={{ color: colors.inactive }}>
                  {siteConfig.path}
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div
              className="hidden sm:block flex-1 p-3"
              style={{ borderLeft: `1px solid ${colors.inactive}` }}
            >
              <div className="font-bold mb-2" style={{ color: colors.brand }}>
                Tips for getting started
              </div>
              <div className="space-y-0.5">
                {tips.map((tip) => (
                  <div key={tip.cmd} className="flex gap-2">
                    <span style={{ color: colors.helpBlue, minWidth: '110px', display: 'inline-block' }}>
                      {tip.cmd}
                    </span>
                    <span style={{ color: colors.subtle }}>{tip.desc}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2" style={{ color: colors.subtle }}>
                Or just type anything to chat with my AI clone!
              </div>
              <div className="my-2 h-px" style={{ backgroundColor: colors.inactive }} />
              <div className="font-bold mb-1" style={{ color: colors.brand }}>
                Recent activity
              </div>
              {recentActivity.map((item) => (
                <div key={item} className="pl-2" style={{ color: colors.text }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile tips */}
          <div className="sm:hidden p-3" style={{ borderTop: `1px solid ${colors.inactive}` }}>
            <div className="font-bold mb-2" style={{ color: colors.subtle }}>
              Tips for getting started
            </div>
            <div className="space-y-0.5">
              {tips.map((tip) => (
                <div key={tip.cmd} className="flex gap-2">
                  <span style={{ color: colors.success, minWidth: '100px', display: 'inline-block' }}>
                    {tip.cmd}
                  </span>
                  <span style={{ color: colors.subtle }}>{tip.desc}</span>
                </div>
              ))}
            </div>
            <div className="mt-2" style={{ color: colors.subtle }}>
              Or just type anything to chat!
            </div>
          </div>
        </div>
        {/* Right border — 1px line centered in 1ch, aligns with ╮/╯ */}
        <div
          className="w-[1ch] shrink-0"
          style={{
            backgroundImage: `linear-gradient(${colors.brand}, ${colors.brand})`,
            backgroundSize: '1px 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>

      {/* Bottom border: ╰─────...─╯ */}
      <div className="flex whitespace-pre overflow-hidden" style={{ color: colors.brand }}>
        <span>╰</span>
        <span className="flex-1 overflow-hidden">{'─'.repeat(200)}</span>
        <span>╯</span>
      </div>
    </div>
  );
}
