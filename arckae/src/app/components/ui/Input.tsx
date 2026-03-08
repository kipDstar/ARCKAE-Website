import type { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={twMerge(
        'w-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
        className,
      )}
      {...rest}
    />
  );
}

