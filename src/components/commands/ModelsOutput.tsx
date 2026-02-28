'use client';

import { colors } from '@/lib/colors';

const models = [
  { name: 'Data Architect 4.6', subtitle: 'Platform Engineering · Governance', current: true },
  { name: 'Senior Data Engineer 3.0', subtitle: 'Tech Lead · dbt · Airflow', current: false },
  { name: 'Data Engineer 2.0', subtitle: 'PySpark · Big Data · Cloud', current: false },
  { name: 'RF Engineer 1.0', subtitle: 'Telecom · Automation', current: false },
];

export function ModelsOutput() {
  return (
    <div className="text-xs sm:text-sm py-1">
      <div style={{ color: colors.brand }} className="font-bold mb-1">Available Models</div>
      <div className="space-y-1 pl-2">
        {models.map((model) => (
          <div key={model.name} className="flex items-center gap-2">
            {model.current ? (
              <span style={{ color: colors.success }}>●</span>
            ) : (
              <span style={{ color: colors.inactive }}>○</span>
            )}
            <span
              style={{ color: model.current ? colors.text : colors.subtle }}
              className={model.current ? 'font-bold' : ''}
            >
              {model.name}
            </span>
            <span style={{ color: colors.inactive }}>— {model.subtitle}</span>
            {model.current && (
              <span
                className="text-xs px-1 rounded"
                style={{ backgroundColor: 'rgba(78, 186, 101, 0.15)', color: colors.success }}
              >
                active
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
