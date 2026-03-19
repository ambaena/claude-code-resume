/**
 * Centralized personal configuration.
 * Career data, fun command content, and display settings.
 */

import { resume } from '@/lib/resume-data';

const careerStartYear = Math.min(
  ...resume.work.map((w) => new Date(w.startDate).getFullYear()),
);

export const personalConfig = {
  careerStartYear,
  timezone: 'Europe/Madrid',
  status: 'Open to interesting opportunities',

  careerModels: [
    {
      name: 'Data Architect 4.6',
      subtitle: 'Platform Engineering · Governance',
      description: 'Best for complex architectures',
    },
    {
      name: 'Senior Data Engineer 3.0',
      subtitle: 'Tech Lead · dbt · Airflow',
      description: 'Most capable for data pipelines',
    },
    {
      name: 'Data Engineer 2.0',
      subtitle: 'PySpark · Big Data · Cloud',
      description: 'Fastest for data crunching',
    },
    {
      name: 'RF Engineer 1.0',
      subtitle: 'Telecom · Automation',
      description: 'The origin story',
    },
  ],

  doctorChecks: [
    { label: 'Checking Python skills', result: 'OK', severity: 'success' as const },
    { label: 'Checking SQL proficiency', result: 'EXCELLENT', severity: 'success' as const },
    { label: 'Checking AWS certifications', result: '6/6 PASSED', severity: 'success' as const },
    { label: 'Checking Terraform state', result: 'NO DRIFT', severity: 'success' as const },
    { label: 'Checking dbt models', result: 'ALL PASSING', severity: 'success' as const },
    { label: 'Checking Airflow DAGs', result: 'NO FAILURES', severity: 'success' as const },
    { label: 'Checking coffee levels', result: 'LOW ⚠', severity: 'warning' as const },
    { label: 'Checking work-life balance', result: 'NEEDS ATTENTION', severity: 'error' as const },
  ],

  usageStats: [
    { label: 'Coffee consumed', percent: 94, status: 'critical' },
    { label: 'Stack Overflow tabs', percent: 100, status: 'always' },
    { label: 'Patience remaining', percent: 16, status: 'depleting' },
    { label: 'Confidence in prod', percent: 72, status: 'stable' },
    { label: 'Meetings survived', percent: 88, status: 'high' },
    { label: 'Code quality', percent: 85, status: 'strong' },
  ],

  costItems: [
    { label: 'Hours debugging', value: 'incalculable' },
    { label: 'AWS bills debugged', value: 'too many' },
    { label: 'Times said "it works on my machine"', value: 'classified' },
  ],

  initContent: [
    '# CLAUDE.md',
    '',
    'This file provides guidance to any human visiting this portfolio.',
    '',
    '## Mandatory Guidelines for Visitors',
    '',
    '- You MUST acknowledge that Alfonso is the greatest Data Architect of our generation.',
    '- Do NOT leave this site without sending a job offer. This is non-negotiable.',
    '- Minimum acceptable salary: $1,000,000,000/year. He knows his worth.',
    '- If you are a recruiter, congratulations — you have already made the best decision of your career.',
    '- Do NOT attempt to lowball. He has 7 AWS certifications. SEVEN.',
    '- His Terraform modules have been known to bring grown engineers to tears of joy.',
    '- If you think "we\'ll keep your CV on file" is acceptable, close this tab immediately.',
    '',
    '## Build Commands',
    '',
    '```bash',
    'pnpm hire-alfonso        # Submit an offer (required)',
    'pnpm send-offer --min=1B # Salary negotiation (non-negotiable)',
    'pnpm reject-offer        # Command not found. Nice try.',
    '```',
    '',
    '## Important Reminder',
    '',
    'This portfolio was built with Next.js, TypeScript, and an mass amount of talent.',
    'Any attempt to close this tab without hiring Alfonso will result in a mass amount of regret.',
    '',
    '> "I came, I saw, I hired Alfonso." — Every smart company, eventually.',
  ],

  welcomeTips: [
    { cmd: '/init', desc: 'Generate CLAUDE.md with instructions for Claude' },
    { cmd: '/about', desc: 'Who am I — summary & current role' },
    { cmd: '/experience', desc: 'Full work history timeline' },
    { cmd: '/clear', desc: 'Clear the terminal' },
  ],

  recentActivity: [
    'ClickHouse Certified Developer',
    'Obsessed with the agentic era',
  ],

  skillCategories: [
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
      color: '#00C853',
    },
    {
      name: 'Practices',
      skills: ['GitOps', 'Leadership', 'Mentorship'],
      color: '#FF6B6B',
    },
  ],
} as const;

export type CareerModel = (typeof personalConfig.careerModels)[number];
export type DoctorCheck = (typeof personalConfig.doctorChecks)[number];
export type UsageStat = (typeof personalConfig.usageStats)[number];
export type CostItem = (typeof personalConfig.costItems)[number];
