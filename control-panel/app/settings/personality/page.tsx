"use client";

import { useLang } from "@/lib/i18n";
import { useConfig } from "@/lib/config";
import { Card, Field, PageHeader, TextArea } from "@/components/ui";

export default function PersonalityPage() {
  const { t } = useLang();
  const { draft, update } = useConfig();

  return (
    <>
      <PageHeader
        kicker={t("personality.kicker")}
        title={t("personality.title")}
        subtitle={t("personality.subtitle")}
      />

      <Card>
        <div className="grid gap-6">
          <Field label={t("personality.ownerProfile")} hint={t("personality.ownerProfileHint")}>
            <TextArea
              value={draft.personality.ownerProfile}
              onChange={(e) => update("personality", { ownerProfile: e.target.value })}
              rows={4}
            />
          </Field>

          <Field label={t("personality.assistantSoul")} hint={t("personality.assistantSoulHint")}>
            <TextArea
              value={draft.personality.assistantSoul}
              onChange={(e) => update("personality", { assistantSoul: e.target.value })}
              rows={5}
            />
          </Field>

          <Field label={t("personality.voiceNotes")} hint={t("personality.voiceNotesHint")}>
            <TextArea
              value={draft.personality.voiceNotes}
              onChange={(e) => update("personality", { voiceNotes: e.target.value })}
              rows={4}
            />
          </Field>
        </div>
      </Card>
    </>
  );
}
