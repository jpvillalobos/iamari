"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useConfig } from "@/lib/config";
import { Card, Checkbox, Chip, Field, PageHeader, TextInput } from "@/components/ui";

export default function RulesPage() {
  const { t } = useLang();
  const { draft, update } = useConfig();
  const [bankInput, setBankInput] = useState("");
  const [vipInput, setVipInput] = useState("");

  const addBank = () => {
    const v = bankInput.trim();
    if (!v || draft.rulePacks.banks.includes(v)) return;
    update("rulePacks", { banks: [...draft.rulePacks.banks, v] });
    setBankInput("");
  };

  const removeBank = (b: string) =>
    update("rulePacks", { banks: draft.rulePacks.banks.filter((x) => x !== b) });

  const addVip = () => {
    const v = vipInput.trim();
    if (!v || draft.rulePacks.vipSenders.includes(v)) return;
    update("rulePacks", { vipSenders: [...draft.rulePacks.vipSenders, v] });
    setVipInput("");
  };

  const removeVip = (v: string) =>
    update("rulePacks", { vipSenders: draft.rulePacks.vipSenders.filter((x) => x !== v) });

  return (
    <>
      <PageHeader
        kicker={t("rules.kicker")}
        title={t("rules.title")}
        subtitle={t("rules.subtitle")}
      />

      <Card className="mb-5">
        <Field label={t("rules.banks")}>
          <div className="flex gap-2 mb-3">
            <TextInput
              value={bankInput}
              onChange={(e) => setBankInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addBank();
                }
              }}
              placeholder={t("rules.banksPlaceholder")}
            />
            <button
              type="button"
              onClick={addBank}
              className="shrink-0 px-4 py-2 text-sm rounded-lg border border-border-warm text-cream hover:border-amber/50 hover:bg-glow transition-colors cursor-pointer"
            >
              {t("rules.addBank")}
            </button>
          </div>
          {draft.rulePacks.banks.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {draft.rulePacks.banks.map((b) => (
                <Chip key={b} label={b} onRemove={() => removeBank(b)} />
              ))}
            </div>
          )}
        </Field>
      </Card>

      <Card className="mb-5">
        <Field label={t("rules.school")}>
          <TextInput
            value={draft.rulePacks.school}
            onChange={(e) => update("rulePacks", { school: e.target.value })}
            placeholder={t("rules.schoolPlaceholder")}
          />
        </Field>
      </Card>

      <Card className="mb-5">
        <Field label={t("rules.vipSenders")}>
          <div className="flex gap-2 mb-3">
            <TextInput
              type="email"
              value={vipInput}
              onChange={(e) => setVipInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addVip();
                }
              }}
              placeholder={t("rules.vipPlaceholder")}
            />
            <button
              type="button"
              onClick={addVip}
              className="shrink-0 px-4 py-2 text-sm rounded-lg border border-border-warm text-cream hover:border-amber/50 hover:bg-glow transition-colors cursor-pointer"
            >
              {t("rules.addVip")}
            </button>
          </div>
          {draft.rulePacks.vipSenders.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {draft.rulePacks.vipSenders.map((v) => (
                <Chip key={v} label={v} onRemove={() => removeVip(v)} />
              ))}
            </div>
          )}
        </Field>
      </Card>

      <Card>
        <div className="grid gap-4">
          <Checkbox
            on={draft.rulePacks.archiveNewsletters}
            onClick={() =>
              update("rulePacks", { archiveNewsletters: !draft.rulePacks.archiveNewsletters })
            }
            label={t("rules.newsletters")}
          />
          <Checkbox
            on={draft.rulePacks.elevateUrgent}
            onClick={() => update("rulePacks", { elevateUrgent: !draft.rulePacks.elevateUrgent })}
            label={t("rules.urgent")}
          />
        </div>
      </Card>
    </>
  );
}
