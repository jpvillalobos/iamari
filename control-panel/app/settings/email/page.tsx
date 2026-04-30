"use client";

import { useLang } from "@/lib/i18n";
import { useConfig } from "@/lib/config";
import { Card, Checkbox, Field, PageHeader, TextInput } from "@/components/ui";

export default function EmailPage() {
  const { t } = useLang();
  const { draft, update } = useConfig();

  return (
    <>
      <PageHeader
        kicker={t("email.kicker")}
        title={t("email.title")}
        subtitle={t("email.subtitle")}
      />

      <Card>
        <div className="grid gap-6">
          <Field label={t("email.address")} hint={t("email.addressHint")}>
            <div className="flex items-center gap-2">
              <TextInput
                value={draft.email.agentMailAddress.replace(/@agentmail\.to$/, "")}
                onChange={(e) =>
                  update("email", {
                    agentMailAddress: `${e.target.value.replace(/[^a-z0-9.-]/gi, "")}@agentmail.to`,
                  })
                }
                disabled={draft.email.skipped}
                className="flex-1"
              />
              <span className="text-text-muted text-sm">@agentmail.to</span>
            </div>
          </Field>

          <div className="border-t border-border-warm pt-5 grid gap-3">
            <Checkbox
              on={!draft.email.skipped && draft.email.forwardingPlanned}
              onClick={() =>
                update("email", { forwardingPlanned: !draft.email.forwardingPlanned })
              }
              label={t("email.forwarding")}
            />
            <p className="text-xs text-text-muted font-light pl-8 -mt-1">
              {t("email.forwardingDesc")}
            </p>

            <div className="border-t border-border-warm pt-4 mt-2">
              <Checkbox
                on={draft.email.skipped}
                onClick={() => update("email", { skipped: !draft.email.skipped })}
                label={t("email.skipped")}
              />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
