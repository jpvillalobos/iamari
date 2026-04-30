"use client";

import { ReactNode } from "react";

export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="bg-ink/60 border border-border-warm rounded-2xl p-5 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-[0.7rem] tracking-[0.15em] uppercase text-text-muted font-medium">
          {label}
        </span>
        {icon && <span className="text-amber-warm/70">{icon}</span>}
      </div>
      <div className="font-display text-3xl sm:text-4xl text-cream leading-none mb-1">
        {value}
      </div>
      {hint && <div className="text-xs text-text-muted font-light mt-2">{hint}</div>}
    </div>
  );
}
