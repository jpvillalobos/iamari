"use client";

import { useLang } from "@/lib/i18n";
import { EnrollmentData, Tier } from "@/lib/types";
import { Field, TextInput, Select, StepCard, StepHeader } from "../ui";

const COMMON_TIMEZONES = [
  "America/Costa_Rica",
  "America/Mexico_City",
  "America/Bogota",
  "America/Lima",
  "America/Santiago",
  "America/Buenos_Aires",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/Madrid",
  "Europe/London",
];

export default function Step01Account({
  data,
  update,
}: {
  data: EnrollmentData["account"];
  update: (p: Partial<EnrollmentData["account"]>) => void;
}) {
  const { t } = useLang();

  const tiers: { id: Tier; name: string; desc: string }[] = [
    { id: "essential", name: t("step01.tierEssential"), desc: t("step01.tierEssentialDesc") },
    { id: "familia", name: t("step01.tierFamilia"), desc: t("step01.tierFamiliaDesc") },
    {
      id: "familia_plus",
      name: t("step01.tierFamiliaPlus"),
      desc: t("step01.tierFamiliaPlusDesc"),
    },
  ];

  return (
    <StepCard>
      <StepHeader
        kicker={t("step01.kicker")}
        title={t("step01.title")}
        subtitle={t("step01.subtitle")}
      />

      <div className="grid gap-5">
        <Field label={t("step01.email")} hint={t("step01.emailHint")} required>
          <TextInput
            type="email"
            value={data.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </Field>

        <Field label={t("step01.timezone")} hint={t("step01.timezoneHint")}>
          <Select value={data.timezone} onChange={(e) => update({ timezone: e.target.value })}>
            {COMMON_TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz.replace("_", " ")}
              </option>
            ))}
          </Select>
        </Field>

        <div>
          <span className="block text-sm font-medium text-cream mb-3">{t("step01.tier")}</span>
          <div className="grid sm:grid-cols-3 gap-3">
            {tiers.map((tier) => {
              const active = data.tier === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => update({ tier: tier.id })}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    active
                      ? "border-amber bg-glow"
                      : "border-border-warm bg-ink/40 hover:border-amber/30 hover:bg-ink/60"
                  }`}
                >
                  <div
                    className={`text-[0.65rem] tracking-[0.15em] uppercase font-medium mb-1 ${
                      active ? "text-amber" : "text-text-muted"
                    }`}
                  >
                    {tier.name}
                  </div>
                  <div className="text-xs text-text-muted font-light leading-relaxed">{tier.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </StepCard>
  );
}
