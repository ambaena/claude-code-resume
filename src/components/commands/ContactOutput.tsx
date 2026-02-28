'use client';

import { resume } from '@/lib/resume-data';
import { colors } from '@/lib/colors';

export function ContactOutput() {
  const { basics } = resume;

  return (
    <div className="text-xs sm:text-sm py-1">
      <div style={{ color: colors.inactive }} className="mb-1">$ cat ~/.contact</div>
      <div className="space-y-0.5 pl-2">
        <div>
          <span style={{ color: colors.success }}>  Email     </span>
          <a href={`mailto:${basics.email}`}>{basics.email}</a>
        </div>
        {basics.profiles.map((profile) => (
          <div key={profile.network}>
            <span style={{ color: colors.success }}>  {profile.network.padEnd(9)} </span>
            <a href={profile.url} target="_blank" rel="noopener noreferrer">
              {profile.url}
            </a>
          </div>
        ))}
        <div>
          <span style={{ color: colors.success }}>  Web       </span>
          <a href={`https://${basics.url}`} target="_blank" rel="noopener noreferrer">
            {basics.url}
          </a>
        </div>
      </div>
    </div>
  );
}
