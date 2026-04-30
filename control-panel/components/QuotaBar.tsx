"use client";

export function QuotaBar({
  used,
  limit,
  label,
}: {
  used: number;
  limit: number;
  label?: string;
}) {
  const pct = Math.min(100, Math.max(0, (used / limit) * 100));
  const danger = pct > 85;
  return (
    <div>
      {label && (
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-xs text-text-muted font-light">{label}</span>
          <span className="text-xs text-amber-warm font-medium">{pct.toFixed(0)}%</span>
        </div>
      )}
      <div className="h-2 rounded-full bg-ink-light/60 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            danger ? "bg-red-400" : "bg-gradient-to-r from-amber-warm to-amber"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
