import type { Lang } from "./i18n";

export function formatNumber(n: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === "es" ? "es-CR" : "en-US").format(n);
}

export function formatTokens(n: number, lang: Lang): string {
  if (n >= 1_000_000) {
    const millions = n / 1_000_000;
    return `${millions.toFixed(millions >= 10 ? 0 : 1)}M`;
  }
  if (n >= 1_000) {
    const thousands = n / 1_000;
    return `${thousands.toFixed(thousands >= 10 ? 0 : 1)}K`;
  }
  return formatNumber(n, lang);
}

export function formatDate(iso: string, lang: Lang): string {
  try {
    return new Intl.DateTimeFormat(lang === "es" ? "es-CR" : "en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function relativeTime(
  iso: string,
  t: (key: string, vars?: Record<string, string | number>) => string,
): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const min = Math.floor(diff / 60_000);
  if (min < 1) return t("time.justNow");
  if (min < 60) return t("time.minutesAgo", { count: min });
  const hr = Math.floor(min / 60);
  if (hr < 24) return t("time.hoursAgo", { count: hr });
  const day = Math.floor(hr / 24);
  return t("time.daysAgo", { count: day });
}
