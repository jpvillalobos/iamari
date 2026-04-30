"use client";

import { useLang } from "@/lib/i18n";
import { useConfig } from "@/lib/config";
import { Card, PageHeader, Toggle } from "@/components/ui";

export default function WhatsAppPage() {
  const { t } = useLang();
  const { draft, update } = useConfig();

  const toggle = (id: string) => {
    const has = draft.whatsapp.optedInMemberIds.includes(id);
    const next = has
      ? draft.whatsapp.optedInMemberIds.filter((x) => x !== id)
      : [...draft.whatsapp.optedInMemberIds, id];
    update("whatsapp", { optedInMemberIds: next });
  };

  return (
    <>
      <PageHeader
        kicker={t("whatsapp.kicker")}
        title={t("whatsapp.title")}
        subtitle={t("whatsapp.subtitle")}
      />

      <Card>
        {draft.household.members.length === 0 ? (
          <p className="text-text-muted">{t("whatsapp.noMembers")}</p>
        ) : (
          <div className="grid gap-3">
            {draft.household.members.map((m) => (
              <Toggle
                key={m.id}
                on={draft.whatsapp.optedInMemberIds.includes(m.id)}
                onClick={() => toggle(m.id)}
                label={m.nickname ? `${m.name} (${m.nickname})` : m.name || m.phone}
                description={m.phone || "—"}
              />
            ))}
          </div>
        )}
      </Card>
    </>
  );
}
