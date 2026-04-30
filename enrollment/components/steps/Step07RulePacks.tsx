"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { EnrollmentData } from "@/lib/types";
import { Field, TextInput, Button, Chip, StepCard, StepHeader, Checkbox } from "../ui";

export default function Step07RulePacks({
  data,
  update,
}: {
  data: EnrollmentData["rulePacks"];
  update: (p: Partial<EnrollmentData["rulePacks"]>) => void;
}) {
  const { t } = useLang();
  const [bankInput, setBankInput] = useState("");
  const [vipInput, setVipInput] = useState("");

  const addBank = () => {
    const v = bankInput.trim();
    if (!v) return;
    if (data.banks.includes(v)) {
      setBankInput("");
      return;
    }
    update({ banks: [...data.banks, v] });
    setBankInput("");
  };

  const removeBank = (b: string) => update({ banks: data.banks.filter((x) => x !== b) });

  const addVip = () => {
    const v = vipInput.trim();
    if (!v) return;
    if (data.vipSenders.includes(v)) {
      setVipInput("");
      return;
    }
    update({ vipSenders: [...data.vipSenders, v] });
    setVipInput("");
  };

  const removeVip = (v: string) => update({ vipSenders: data.vipSenders.filter((x) => x !== v) });

  return (
    <StepCard>
      <StepHeader
        kicker={t("step07.kicker")}
        title={t("step07.title")}
        subtitle={t("step07.subtitle")}
      />

      <div className="grid gap-7">
        <div>
          <Field label={t("step07.banks")} hint={t("step07.banksHint")}>
            <div className="flex gap-2">
              <TextInput
                value={bankInput}
                onChange={(e) => setBankInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addBank();
                  }
                }}
                placeholder={t("step07.banksPlaceholder")}
              />
              <Button variant="outline" onClick={addBank} className="!py-2 !px-4 !text-sm shrink-0">
                {t("step07.addBank")}
              </Button>
            </div>
          </Field>
          {data.banks.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {data.banks.map((b) => (
                <Chip key={b} label={b} onRemove={() => removeBank(b)} />
              ))}
            </div>
          )}
        </div>

        <Field label={t("step07.school")} hint={t("step07.schoolHint")}>
          <TextInput
            value={data.school}
            onChange={(e) => update({ school: e.target.value })}
            placeholder={t("step07.schoolPlaceholder")}
          />
        </Field>

        <div>
          <Field label={t("step07.vipSenders")} hint={t("step07.vipHint")}>
            <div className="flex gap-2">
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
                placeholder={t("step07.vipPlaceholder")}
              />
              <Button variant="outline" onClick={addVip} className="!py-2 !px-4 !text-sm shrink-0">
                {t("step07.addVip")}
              </Button>
            </div>
          </Field>
          {data.vipSenders.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {data.vipSenders.map((v) => (
                <Chip key={v} label={v} onRemove={() => removeVip(v)} />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3 border-t border-border-warm pt-5">
          <Checkbox
            on={data.archiveNewsletters}
            onClick={() => update({ archiveNewsletters: !data.archiveNewsletters })}
            label={t("step07.newsletters")}
          />
          <Checkbox
            on={data.elevateUrgent}
            onClick={() => update({ elevateUrgent: !data.elevateUrgent })}
            label={t("step07.urgent")}
          />
        </div>
      </div>
    </StepCard>
  );
}
