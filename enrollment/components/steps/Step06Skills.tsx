"use client";

import { useLang } from "@/lib/i18n";
import { EnrollmentData } from "@/lib/types";
import { StepCard, StepHeader, Toggle } from "../ui";

const SKILL_KEYS: { id: keyof EnrollmentData["skills"]; labelKey: string; descKey: string }[] = [
  { id: "emailTriage", labelKey: "step06.emailTriage", descKey: "step06.emailTriageDesc" },
  { id: "weather", labelKey: "step06.weather", descKey: "step06.weatherDesc" },
  { id: "voiceTranscription", labelKey: "step06.voice", descKey: "step06.voiceDesc" },
  { id: "imageOcr", labelKey: "step06.ocr", descKey: "step06.ocrDesc" },
  { id: "browserAutomation", labelKey: "step06.browser", descKey: "step06.browserDesc" },
  { id: "calendar", labelKey: "step06.calendar", descKey: "step06.calendarDesc" },
];

export default function Step06Skills({
  data,
  update,
}: {
  data: EnrollmentData["skills"];
  update: (p: Partial<EnrollmentData["skills"]>) => void;
}) {
  const { t } = useLang();

  return (
    <StepCard>
      <StepHeader
        kicker={t("step06.kicker")}
        title={t("step06.title")}
        subtitle={t("step06.subtitle")}
      />

      <div className="grid sm:grid-cols-2 gap-3">
        {SKILL_KEYS.map((s) => (
          <Toggle
            key={s.id}
            on={data[s.id]}
            onClick={() => update({ [s.id]: !data[s.id] } as Partial<EnrollmentData["skills"]>)}
            label={t(s.labelKey)}
            description={t(s.descKey)}
          />
        ))}
      </div>
    </StepCard>
  );
}
