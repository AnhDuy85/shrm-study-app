import type { ReactNode } from 'react';

type BadgeTone = 'neutral' | 'success' | 'info' | 'warning';

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: 'bg-gray-100 text-gray-700',
  success: 'bg-green-100 text-green-800',
  info: 'bg-indigo-100 text-indigo-800',
  warning: 'bg-amber-100 text-amber-800',
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
}

export default function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
