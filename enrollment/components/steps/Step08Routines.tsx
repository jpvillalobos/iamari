"use client";

import { useLang } from "@/lib/i18n";
import { Birthday, EnrollmentData, newBirthday } from "@/lib/types";
import { Field, TextInput, Button, StepCard, StepHeader, Toggle } from "../ui";

const ROUTINE_KEYS: {
  id: keyof Omit<EnrollmentData["routines"], "birthdays">;
  labelKey: string;
  descKey: string;
}[] = [
  { id: "morningCheckin", labelKey: "step08.morningCheckin", descKey: "step08.morningCheckinDesc" },
  { id: "afternoonPause", labelKey: "step08.afternoonPause", descKey: "step08.afternoonPauseDesc" },
  { id: "nightDisconnect", labelKey: "step08.nightDisconnect", descKey: "step08.nightDisconnectDesc" },
  { id: "examReminders", labelKey: "step08.examReminders", descKey: "step08.examRemindersDesc" },
  {
    id: "birthdayReminders",
    labelKey: "step08.birthdayReminders",
    descKey: "step08.birthdayRemindersDesc",
  },
  { id: "monthlyBills", labelKey: "step08.monthlyBills", descKey: "step08.monthlyBillsDesc" },
];

export default function Step08Routines({
  data,
  update,
}: {
  data: EnrollmentData["routines"];
  update: (p: Partial<EnrollmentData["routines"]>) => void;
}) {
  const { t } = useLang();

  const updateBirthday = (id: string, patch: Partial<Birthday>) => {
    update({
      birthdays: data.birthdays.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    });
  };

  const addBirthday = () => update({ birthdays: [...data.birthdays, newBirthday()] });
  const removeBirthday = (id: string) =>
    update({ birthdays: data.birthdays.filter((b) => b.id !== id) });

  return (
    <StepCard>
      <StepHeader
        kicker={t("step08.kicker")}
        title={t("step08.title")}
        subtitle={t("step08.subtitle")}
      />

      <div className="grid sm:grid-cols-2 gap-3 mb-7">
        {ROUTINE_KEYS.map((r) => (
          <Toggle
            key={r.id}
            on={data[r.id]}
            onClick={() =>
              update({ [r.id]: !data[r.id] } as Partial<EnrollmentData["routines"]>)
            }
            label={t(r.labelKey)}
            description={t(r.descKey)}
          />
        ))}
      </div>

      {data.birthdayReminders && (
        <div className="border-t border-border-warm pt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="block text-sm font-medium text-cream">{t("step08.birthdays")}</span>
            <Button variant="outline" onClick={addBirthday} className="!py-2 !px-4 !text-sm">
              + {t("step08.addBirthday")}
            </Button>
          </div>
          <div className="grid gap-3">
            {data.birthdays.map((b) => (
              <div
                key={b.id}
                className="bg-ink/50 border border-border-warm rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end"
              >
                <div className="flex-1">
                  <Field label={t("step08.birthdayName")}>
                    <TextInput
                      value={b.name}
                      onChange={(e) => updateBirthday(b.id, { name: e.target.value })}
                    />
                  </Field>
                </div>
                <div className="flex-1">
                  <Field label={t("step08.birthdayDate")}>
                    <TextInput
                      type="date"
                      value={b.date}
                      onChange={(e) => updateBirthday(b.id, { date: e.target.value })}
                    />
                  </Field>
                </div>
                <button
                  type="button"
                  onClick={() => removeBirthday(b.id)}
                  className="text-text-muted hover:text-amber transition-colors text-sm self-end sm:self-auto sm:mb-3 cursor-pointer px-2"
                  aria-label="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </StepCard>
  );
}
