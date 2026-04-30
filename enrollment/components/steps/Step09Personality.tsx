"use client";

import { useLang } from "@/lib/i18n";
import { EnrollmentData } from "@/lib/types";
import { Field, TextArea, StepCard, StepHeader } from "../ui";

export default function Step09Personality({
  data,
  update,
}: {
  data: EnrollmentData["personality"];
  update: (p: Partial<EnrollmentData["personality"]>) => void;
}) {
  const { t } = useLang();

  return (
    <StepCard>
      <StepHeader
        kicker={t("step09.kicker")}
        title={t("step09.title")}
        subtitle={t("step09.subtitle")}
      />

      <div className="grid gap-6">
        <Field label={t("step09.ownerProfile")} hint={t("step09.ownerProfileHint")}>
          <TextArea
            value={data.ownerProfile}
            onChange={(e) => update({ ownerProfile: e.target.value })}
            placeholder={t("step09.ownerProfilePlaceholder")}
            rows={4}
          />
        </Field>

        <Field label={t("step09.assistantSoul")} hint={t("step09.assistantSoulHint")}>
          <TextArea
            value={data.assistantSoul}
            onChange={(e) => update({ assistantSoul: e.target.value })}
            placeholder={t("step09.assistantSoulPlaceholder")}
            rows={5}
          />
        </Field>

        <Field label={t("step09.voiceNotes")} hint={t("step09.voiceNotesHint")}>
          <TextArea
            value={data.voiceNotes}
            onChange={(e) => update({ voiceNotes: e.target.value })}
            placeholder={t("step09.voiceNotesPlaceholder")}
            rows={4}
          />
        </Field>
      </div>
    </StepCard>
  );
}
