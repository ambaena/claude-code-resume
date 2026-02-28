'use client';

import { resume } from '@/lib/resume-data';
import { colors } from '@/lib/colors';

export function StatusOutput() {
  const yearsExp = new Date().getFullYear() - 2018;
  const totalCerts = resume.certificates.length;
  const awsCerts = resume.certificates.filter((c) => c.issuer === 'AWS').length;
  const companies = new Set(resume.work.map((w) => w.name)).size;

  return (
    <div className="text-xs sm:text-sm py-1">
      <div style={{ color: colors.brand }} className="font-bold mb-1">Portfolio Status</div>
      <div className="space-y-0.5 pl-2">
        <div>
          <span style={{ color: colors.success }}>✓</span>
          <span style={{ color: colors.subtle }}> Experience:  </span>
          <span style={{ color: colors.text }}>{yearsExp}+ years in data engineering</span>
        </div>
        <div>
          <span style={{ color: colors.success }}>✓</span>
          <span style={{ color: colors.subtle }}> Certs:       </span>
          <span style={{ color: colors.text }}>{totalCerts} professional certifications</span>
        </div>
        <div>
          <span style={{ color: colors.success }}>✓</span>
          <span style={{ color: colors.subtle }}> AWS Certs:   </span>
          <span style={{ color: colors.text }}>{awsCerts} AWS certifications</span>
        </div>
        <div>
          <span style={{ color: colors.success }}>✓</span>
          <span style={{ color: colors.subtle }}> Companies:   </span>
          <span style={{ color: colors.text }}>{companies} companies</span>
        </div>
        <div>
          <span style={{ color: colors.success }}>✓</span>
          <span style={{ color: colors.subtle }}> Status:      </span>
          <span style={{ color: '#4FC3F7' }}>Open to interesting opportunities</span>
        </div>
      </div>
    </div>
  );
}
