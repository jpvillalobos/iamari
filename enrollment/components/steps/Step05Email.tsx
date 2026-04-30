"use client";

import { useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { EnrollmentData, slugifyFamilyName } from "@/lib/types";
import { Field, TextInput, StepCard, StepHeader, Checkbox } from "../ui";

export default function Step05Email({
  data,
  familyName,
  update,
}: {
  data: EnrollmentData["email"];
  familyName: string;
  update: (p: Partial<EnrollmentData["email"]>) => void;
}) {
  const { t } = useLang();

  // auto-suggest the agentmail address from the family name once
  useEffect(() => {
    if (!data.agentMailAddress && familyName) {
      const slug = slugifyFamilyName(familyName);
      if (slug) update({ agentMailAddress: `${slug}.ari@agentmail.to` });
    }
  }, [data.agentMailAddress, familyName, update]);

  return (
    <StepCard>
      <StepHeader
        kicker={t("step05.kicker")}
        title={t("step05.title")}
        subtitle={t("step05.subtitle")}
      />

      <div className="grid gap-6">
        <Field label={t("step05.address")} hint={t("step05.addressHint")}>
          <TextInput
            type="email"
            value={data.agentMailAddress}
            onChange={(e) => update({ agentMailAddress: e.target.value })}
            placeholder="family.ari@agentmail.to"
            disabled={data.skipped}
          />
        </Field>

        <div className="space-y-3 pt-1">
          <Checkbox
            on={data.forwardingPlanned && !data.skipped}
            onClick={() =>
              update({ forwardingPlanned: !data.forwardingPlanned, skipped: false })
            }
            label={t("step05.forwarding")}
          />
          <div className="text-xs text-text-muted font-light pl-8 leading-relaxed">
            {t("step05.forwardingDesc")}
          </div>
        </div>

        <div className="border-t border-border-warm pt-5">
          <Checkbox
            on={data.skipped}
            onClick={() => update({ skipped: !data.skipped })}
            label={t("step05.skipForNow")}
          />
        </div>
      </div>
    </StepCard>
  );
}
