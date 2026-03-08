import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const baseClasses =
  'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-60 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary:
    'bg-emerald-500 text-slate-950 hover:bg-emerald-400 focus-visible:ring-emerald-400',
  secondary:
    'bg-slate-800 text-slate-100 hover:bg-slate-700 focus-visible:ring-slate-500',
  ghost:
    'bg-transparent text-slate-100 hover:bg-slate-800/60 focus-visible:ring-slate-600',
};

export function Button({ variant = 'primary', className, children, ...rest }: ButtonProps) {
  return (
    <button className={twMerge(baseClasses, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

