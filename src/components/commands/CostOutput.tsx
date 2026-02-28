'use client';

import { colors } from '@/lib/colors';

export function CostOutput() {
  const yearsExp = new Date().getFullYear() - 2018;
  const coffees = yearsExp * 365 * 2; // ~2 coffees per day

  return (
    <div className="text-xs sm:text-sm py-1">
      <div style={{ color: colors.brand }} className="font-bold mb-1">Cost Analysis Report</div>
      <div className="space-y-0.5 pl-2">
        <div>
          <span style={{ color: colors.subtle }}>  Coffees consumed:       </span>
          <span style={{ color: '#F5A623' }}>~{coffees.toLocaleString()}</span>
        </div>
        <div>
          <span style={{ color: colors.subtle }}>  Hours debugging:        </span>
          <span style={{ color: colors.error }}>incalculable</span>
        </div>
        <div>
          <span style={{ color: colors.subtle }}>  AWS bills debugged:     </span>
          <span style={{ color: colors.error }}>too many</span>
        </div>
        <div>
          <span style={{ color: colors.subtle }}>  Stack Overflow visits:  </span>
          <span style={{ color: colors.permission }}>∞</span>
        </div>
        <div>
          <span style={{ color: colors.subtle }}>  Times said &quot;it works on my machine&quot;:  </span>
          <span style={{ color: colors.error }}>classified</span>
        </div>
        <div className="mt-1">
          <span style={{ color: colors.subtle }}>  ROI:                    </span>
          <span style={{ color: colors.success }} className="font-bold">priceless</span>
        </div>
      </div>
    </div>
  );
}
