'use client';

import { colors } from '@/lib/colors';

const skillCategories = [
  {
    name: 'Languages',
    skills: ['Python', 'SQL', 'Bash'],
    color: '#F5A623',
  },
  {
    name: 'Cloud & Infra',
    skills: ['AWS', 'Terraform', 'Containerization', 'k8s'],
    color: '#4FC3F7',
  },
  {
    name: 'Data',
    skills: ['Spark', 'Airflow', 'dbt'],
    color: colors.success,
  },
  {
    name: 'Practices',
    skills: ['GitOps', 'Leadership', 'Mentorship'],
    color: colors.bashBorder,
  },
];

export function SkillsOutput() {
  return (
    <div className="text-xs sm:text-sm py-1 space-y-2">
      {skillCategories.map((cat) => (
        <div key={cat.name}>
          <span style={{ color: cat.color }} className="font-bold">{cat.name}</span>
          <div className="pl-2 flex flex-wrap gap-x-3 gap-y-0.5">
            {cat.skills.map((skill) => (
              <span key={skill} style={{ color: colors.text }}>
                <span style={{ color: colors.inactive }}>▪ </span>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
