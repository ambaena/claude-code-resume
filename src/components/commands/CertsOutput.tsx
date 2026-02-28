'use client';

import { resume } from '@/lib/resume-data';
import { colors } from '@/lib/colors';

const issuerColors: Record<string, string> = {
  AWS: '#FF9900',
  ClickHouse: '#FFCC00',
  Scrum: '#009FDA',
  Dbt: '#FF694B',
  Airflow: '#017CEE',
  Terraform: '#7B42BC',
};

export function CertsOutput({ compact }: { compact?: boolean }) {
  const { certificates } = resume;

  // Group AWS certs together
  const awsCerts = certificates.filter((c) => c.issuer === 'AWS');
  const otherCerts = certificates.filter((c) => c.issuer !== 'AWS');

  return (
    <div className="text-xs sm:text-sm py-1 space-y-2">
      <div style={{ color: colors.brand }} className="font-bold">
        Certifications ({certificates.length})
      </div>

      {/* AWS group */}
      <div>
        <span style={{ color: issuerColors.AWS }} className="font-bold">
          AWS ({awsCerts.length})
        </span>
        <div className="pl-2 space-y-0.5">
          {awsCerts.map((cert, i) => (
            <div key={i} className="flex gap-2 items-baseline">
              <span style={{ color: issuerColors.AWS }}>▪</span>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.permission }}
              >
                {cert.name}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Other certs */}
      {!compact && (
        <div className="space-y-0.5">
          <span style={{ color: colors.subtle }} className="font-bold">Others</span>
          {otherCerts.map((cert, i) => (
            <div key={i} className="flex gap-2 items-baseline pl-2">
              <span style={{ color: issuerColors[cert.issuer] ?? colors.success }}>▪</span>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.permission }}
              >
                {cert.name}
              </a>
              <span style={{ color: colors.inactive }}>({cert.issuer})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
