"use client";

import { useLang } from "@/lib/i18n";
import { EnrollmentData, Member } from "@/lib/types";
import { StepCard, StepHeader, Toggle } from "../ui";

export default function Step04WhatsApp({
  whatsapp,
  members,
  update,
}: {
  whatsapp: EnrollmentData["whatsapp"];
  members: Member[];
  update: (p: Partial<EnrollmentData["whatsapp"]>) => void;
}) {
  const { t } = useLang();

  const toggleMember = (id: string) => {
    const has = whatsapp.optedInMemberIds.includes(id);
    update({
      optedInMemberIds: has
        ? whatsapp.optedInMemberIds.filter((x) => x !== id)
        : [...whatsapp.optedInMemberIds, id],
    });
  };

  return (
    <StepCard>
      <StepHeader
        kicker={t("step04.kicker")}
        title={t("step04.title")}
        subtitle={t("step04.subtitle")}
      />

      {members.length === 0 ? (
        <div className="border border-dashed border-border-warm rounded-xl p-8 text-center text-text-muted text-sm font-light">
          {t("step04.noMembers")}
        </div>
      ) : (
        <div className="grid gap-3">
          {members.map((m) => {
            const on = whatsapp.optedInMemberIds.includes(m.id);
            const label = m.nickname || m.name || "—";
            const desc = m.phone
              ? `${m.phone} · ${on ? t("step04.optedIn") : t("step04.skipped")}`
              : on
              ? t("step04.optedIn")
              : t("step04.skipped");
            return (
              <Toggle
                key={m.id}
                on={on}
                onClick={() => toggleMember(m.id)}
                label={label}
                description={desc}
              />
            );
          })}
        </div>
      )}

      <div className="mt-6 text-xs text-text-muted font-light italic leading-relaxed border-l-2 border-amber/40 pl-3">
        {t("step04.twilioNote")}
      </div>
    </StepCard>
  );
}
