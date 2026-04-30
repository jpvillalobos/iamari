"use client";

import { useLang } from "@/lib/i18n";
import { useConfig } from "@/lib/config";
import { AriConfig } from "@/lib/types";
import { PageHeader, Toggle } from "@/components/ui";

const SKILLS: { key: keyof AriConfig["skills"]; labelKey: string; descKey: string }[] = [
  { key: "emailTriage", labelKey: "dashboard.skills.emailTriage", descKey: "skills.emailTriageDesc" },
  { key: "weather", labelKey: "dashboard.skills.weather", descKey: "skills.weatherDesc" },
  { key: "voiceTranscription", labelKey: "dashboard.skills.voiceTranscription", descKey: "skills.voiceDesc" },
  { key: "imageOcr", labelKey: "dashboard.skills.imageOcr", descKey: "skills.ocrDesc" },
  { key: "browserAutomation", labelKey: "dashboard.skills.browserAutomation", descKey: "skills.browserDesc" },
  { key: "calendar", labelKey: "dashboard.skills.calendar", descKey: "skills.calendarDesc" },
];

export default function SkillsPage() {
  const { t } = useLang();
  const { draft, update } = useConfig();

  return (
    <>
      <PageHeader
        kicker={t("skills.kicker")}
        title={t("skills.title")}
        subtitle={t("skills.subtitle")}
      />

      <div className="grid sm:grid-cols-2 gap-3">
        {SKILLS.map((s) => (
          <Toggle
            key={s.key}
            on={draft.skills[s.key]}
            onClick={() => update("skills", { [s.key]: !draft.skills[s.key] })}
            label={t(s.labelKey)}
            description={t(s.descKey)}
          />
        ))}
      </div>
    </>
  );
}
