"use client";

import { useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { useConfig } from "@/lib/config";
import { useSession } from "@/lib/session";
import { PLANS, Tier } from "@/lib/types";
import { getStats } from "@/lib/mockStats";
import { AppShell } from "@/components/AppShell";
import { Button, Card, PageHeader } from "@/components/ui";
import { QuotaBar } from "@/components/QuotaBar";
import { formatDate, formatNumber, formatTokens } from "@/lib/format";

const TIERS: Tier[] = ["essential", "familia", "familia_plus"];

function tierLabelKey(t: Tier): string {
  return t === "essential" ? "plan.tierEssential" : t === "familia" ? "plan.tierFamilia" : "plan.tierFamiliaPlus";
}

export default function PlanPage() {
  const { t, lang } = useLang();
  const router = useRouter();
  const { saved, resetToDemo } = useConfig();
  const { logout } = useSession();
  const stats = getStats("30d");
  const current = saved.account.tier;
  const plan = PLANS[current];

  const onLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <AppShell>
      <PageHeader
        kicker={t("plan.kicker")}
        title={t("plan.title")}
        subtitle={t("plan.subtitle")}
      />

      <Card className="mb-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap mb-5">
          <div>
            <div className="text-[0.7rem] tracking-[0.18em] uppercase text-amber font-medium mb-1">
              {t("plan.current")}
            </div>
            <h2 className="font-display text-3xl text-cream">{t(tierLabelKey(current))}</h2>
          </div>
          <div className="text-right">
            <div className="font-display text-3xl text-amber-warm">
              ${plan.priceUsd}
              <span className="text-sm text-text-muted font-sans font-light">
                {" "}
                {t("plan.perMonth")}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-border-warm pt-5 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
          {plan.features.map((f) => (
            <div key={f} className="flex items-start gap-2 text-sm text-cream font-light">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-amber mt-1 shrink-0"
              >
                <path d="M3 7l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-5">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-3">
          <h3 className="font-display text-xl text-cream">{t("dashboard.quota.title")}</h3>
          <span className="text-xs text-text-muted">
            {t("dashboard.quota.subtitle", { date: formatDate(stats.nextResetISO, lang) })}
          </span>
        </div>
        <QuotaBar
          used={stats.tokensUsed}
          limit={stats.tokensLimit}
          label={t("dashboard.quota.used", {
            used: formatTokens(stats.tokensUsed, lang),
            limit: formatTokens(stats.tokensLimit, lang),
          })}
        />
        <p className="text-sm text-text-muted font-light mt-3">
          {t("plan.monthlyTokens", { tokens: formatNumber(plan.monthlyTokens, lang) })} ·{" "}
          {plan.maxMembers === -1
            ? t("plan.membersUnlimited")
            : t("plan.members", { count: plan.maxMembers })}
        </p>
      </Card>

      <Card className="mb-5">
        <h3 className="font-display text-xl text-cream mb-2">{t("plan.billingTitle")}</h3>
        <p className="text-sm text-text-muted font-light mb-4">{t("plan.billingMockup")}</p>
        <div className="text-xs text-text-muted">
          {t("plan.nextCharge")}: <span className="text-amber-warm">{formatDate(stats.nextResetISO, lang)}</span>
        </div>
      </Card>

      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {TIERS.map((tier) => {
          const p = PLANS[tier];
          const isCurrent = tier === current;
          return (
            <div
              key={tier}
              className={`p-5 rounded-2xl border backdrop-blur-sm ${
                isCurrent
                  ? "bg-glow border-amber/50"
                  : "bg-ink/40 border-border-warm"
              }`}
            >
              <div className="font-display text-lg text-cream mb-1">{t(tierLabelKey(tier))}</div>
              <div className="font-display text-2xl text-amber-warm mb-3">
                ${p.priceUsd}
                <span className="text-xs text-text-muted font-sans font-light"> {t("plan.perMonth")}</span>
              </div>
              <div className="text-xs text-text-muted font-light mb-4 leading-relaxed">
                {p.maxMembers === -1
                  ? t("plan.membersUnlimited")
                  : t("plan.members", { count: p.maxMembers })}
                <br />
                {t("plan.monthlyTokens", { tokens: formatTokens(p.monthlyTokens, lang) })}
              </div>
              <button
                type="button"
                disabled
                className="w-full px-4 py-2 text-sm rounded-lg border border-border-warm text-text-muted cursor-not-allowed"
                title={t("plan.comingSoon")}
              >
                {isCurrent ? t("plan.current") : t("plan.switchTo", { plan: t(tierLabelKey(tier)) })}
              </button>
            </div>
          );
        })}
      </div>

      <Card className="border-rose-500/30">
        <div className="text-[0.7rem] tracking-[0.18em] uppercase text-rose-300 font-medium mb-3">
          {t("plan.danger")}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-cream font-medium mb-1">{t("plan.resetDemo")}</h4>
            <p className="text-xs text-text-muted font-light mb-3">{t("plan.resetDemoDesc")}</p>
            <Button variant="danger" onClick={resetToDemo} className="!py-2 !px-4 !text-sm">
              {t("plan.resetDemo")}
            </Button>
          </div>
          <div>
            <h4 className="text-cream font-medium mb-1">{t("plan.logout")}</h4>
            <p className="text-xs text-text-muted font-light mb-3">
              {t("login.subtitle")}
            </p>
            <Button variant="outline" onClick={onLogout} className="!py-2 !px-4 !text-sm">
              {t("plan.logout")}
            </Button>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}
