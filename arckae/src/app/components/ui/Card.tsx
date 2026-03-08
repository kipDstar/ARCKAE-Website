import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={twMerge(
        'rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-black/30 backdrop-blur',
        className,
      )}
    >
      {children}
    </div>
  );
}

