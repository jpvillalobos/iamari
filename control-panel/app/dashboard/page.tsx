"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useConfig } from "@/lib/config";
import { getStats } from "@/lib/mockStats";
import { PLANS, ActivityItem } from "@/lib/types";
import { AppShell } from "@/components/AppShell";
import { PageHeader, Card } from "@/components/ui";
import { StatCard } from "@/components/StatCard";
import { QuotaBar } from "@/components/QuotaBar";
import { formatNumber, formatTokens, formatDate, relativeTime } from "@/lib/format";

export default function DashboardPage() {
  const { t, lang } = useLang();
  const { saved } = useConfig();
  const [range, setRange] = useState<"7d" | "30d">("7d");
  const stats = getStats(range);
  const plan = PLANS[saved.account.tier];

  const planName = t(
    saved.account.tier === "essential"
      ? "plan.tierEssential"
      : saved.account.tier === "familia"
        ? "plan.tierFamilia"
        : "plan.tierFamiliaPlus",
  );

  return (
    <AppShell>
      <PageHeader
        kicker={t("dashboard.kicker")}
        title={t("dashboard.title", {
          name: saved.assistant.name || "Ari",
          range:
            range === "7d"
              ? t("dashboard.range7d").toLowerCase()
              : t("dashboard.range30d").toLowerCase(),
        })}
        subtitle={t("dashboard.subtitle")}
        right={
          <div className="flex items-center gap-1 text-xs border border-border-warm rounded-lg p-1 bg-ink/40">
            {(["7d", "30d"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  range === r ? "bg-amber text-midnight" : "text-text-muted hover:text-cream"
                }`}
              >
                {t(r === "7d" ? "dashboard.range7d" : "dashboard.range30d")}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
        <StatCard
          label={t("dashboard.stats.messagesSent")}
          value={formatNumber(stats.messagesSent, lang)}
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 13l12-5-12-5v4l8 1-8 1z" strokeLinejoin="round" />
            </svg>
          }
        />
        <StatCard
          label={t("dashboard.stats.messagesReceived")}
          value={formatNumber(stats.messagesReceived, lang)}
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 3l-12 5 12 5v-4l-8-1 8-1z" strokeLinejoin="round" />
            </svg>
          }
        />
        <StatCard
          label={t("dashboard.stats.emailsTriaged")}
          value={formatNumber(stats.emailsTriaged, lang)}
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="12" height="10" rx="1.5" />
              <path d="M2 5l6 4 6-4" strokeLinejoin="round" />
            </svg>
          }
        />
        <StatCard
          label={t("dashboard.stats.emailsArchived")}
          value={formatNumber(stats.emailsArchived, lang)}
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="12" height="3" rx="0.8" />
              <rect x="3" y="6" width="10" height="7" rx="0.8" />
              <path d="M6 9h4" strokeLinecap="round" />
            </svg>
          }
        />
        <StatCard
          label={t("dashboard.stats.routinesTriggered")}
          value={formatNumber(stats.routinesTriggered, lang)}
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="5.5" />
              <path d="M8 5v3l2 1.5" strokeLinecap="round" />
            </svg>
          }
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        <Card className="lg:col-span-2">
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-5">
            <div>
              <div className="text-[0.7rem] tracking-[0.18em] uppercase text-amber font-medium mb-1">
                {t("dashboard.quota.title")}
              </div>
              <h2 className="font-display text-2xl text-cream">
                {formatTokens(stats.tokensUsed, lang)}{" "}
                <span className="text-text-muted text-base font-sans font-light">
                  / {formatTokens(stats.tokensLimit, lang)}
                </span>
              </h2>
            </div>
            <div className="text-right">
              <div className="text-xs text-text-muted">
                {t("dashboard.quota.plan", { plan: planName })}
              </div>
              <div className="text-xs text-text-muted/80 font-light">
                {t("dashboard.quota.subtitle", {
                  date: formatDate(stats.nextResetISO, lang),
                })}
              </div>
            </div>
          </div>
          <QuotaBar used={stats.tokensUsed} limit={stats.tokensLimit} />
          <div className="mt-3 text-sm text-text-muted font-light">
            {t("dashboard.quota.remaining", {
              remaining: formatTokens(plan.monthlyTokens - stats.tokensUsed, lang),
            })}
          </div>
        </Card>

        <Card>
          <div className="text-[0.7rem] tracking-[0.18em] uppercase text-amber font-medium mb-2">
            {t("dashboard.skills.title")}
          </div>
          <h3 className="font-display text-xl text-cream mb-1">
            {t("dashboard.skills.title")}
          </h3>
          <p className="text-text-muted text-xs font-light mb-4">
            {t("dashboard.skills.subtitle")}
          </p>
          <ul className="space-y-2.5">
            {(Object.keys(stats.skillInvocations) as Array<keyof typeof stats.skillInvocations>).map(
              (k) => (
                <li
                  key={k}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-cream font-light">
                    {t(`dashboard.skills.${k}`)}
                  </span>
                  <span className="text-amber-warm font-medium font-mono text-xs">
                    {formatNumber(stats.skillInvocations[k], lang)}
                  </span>
                </li>
              ),
            )}
          </ul>
        </Card>
      </div>

      <Card>
        <div className="text-[0.7rem] tracking-[0.18em] uppercase text-amber font-medium mb-3">
          {t("dashboard.activity.title")}
        </div>
        {stats.recentActivity.length === 0 ? (
          <p className="text-text-muted text-sm">{t("dashboard.activity.empty")}</p>
        ) : (
          <ul className="divide-y divide-border-warm">
            {stats.recentActivity.map((a) => (
              <ActivityRow key={a.id} a={a} />
            ))}
          </ul>
        )}
      </Card>
    </AppShell>
  );
}

function ActivityRow({ a }: { a: ActivityItem }) {
  const { t } = useLang();
  return (
    <li className="py-3 flex items-start gap-3">
      <span className="shrink-0 mt-1">
        <KindDot kind={a.kind} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[0.65rem] tracking-[0.12em] uppercase text-amber-warm font-medium">
            {t(`kinds.${a.kind}`)}
          </span>
          {a.member && (
            <span className="text-[0.65rem] text-text-muted">· {a.member}</span>
          )}
          <span className="text-[0.65rem] text-text-muted/80 ml-auto">
            {relativeTime(a.at, t)}
          </span>
        </div>
        <p className="text-sm text-cream font-light leading-relaxed mt-0.5">
          {a.summary}
        </p>
      </div>
    </li>
  );
}

function KindDot({ kind }: { kind: ActivityItem["kind"] }) {
  const color =
    kind === "email_triage"
      ? "bg-amber"
      : kind === "whatsapp_sent" || kind === "whatsapp_received"
        ? "bg-emerald-400"
        : kind === "routine"
          ? "bg-sky-400"
          : kind === "rule_match"
            ? "bg-rose-400"
            : "bg-violet-400";
  return <span className={`block w-2 h-2 rounded-full ${color}`} />;
}
