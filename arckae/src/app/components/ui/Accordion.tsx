import type { ReactNode } from 'react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface AccordionItemProps {
  id: string;
  title: string;
  children: ReactNode;
}

interface AccordionProps {
  items: AccordionItemProps[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className={twMerge('space-y-3', className)}>
      {items.map((item) => {
        const isOpen = item.id === openId;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-100"
            >
              <span>{item.title}</span>
              <span className="ml-4 text-xs text-emerald-400">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen ? (
              <div className="border-t border-slate-800 px-4 py-3 text-sm text-slate-300">
                {item.children}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

