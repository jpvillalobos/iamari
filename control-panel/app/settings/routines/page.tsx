"use client";

import { useLang } from "@/lib/i18n";
import { useConfig } from "@/lib/config";
import { AriConfig, Birthday, newBirthday } from "@/lib/types";
import { Card, Field, PageHeader, TextInput, Toggle } from "@/components/ui";

const ROUTINES: { id: keyof Omit<AriConfig["routines"], "birthdays">; labelKey: string; descKey: string }[] = [
  { id: "morningCheckin", labelKey: "routines.morningCheckin", descKey: "routines.morningCheckinDesc" },
  { id: "afternoonPause", labelKey: "routines.afternoonPause", descKey: "routines.afternoonPauseDesc" },
  { id: "nightDisconnect", labelKey: "routines.nightDisconnect", descKey: "routines.nightDisconnectDesc" },
  { id: "examReminders", labelKey: "routines.examReminders", descKey: "routines.examRemindersDesc" },
  { id: "birthdayReminders", labelKey: "routines.birthdayReminders", descKey: "routines.birthdayRemindersDesc" },
  { id: "monthlyBills", labelKey: "routines.monthlyBills", descKey: "routines.monthlyBillsDesc" },
];

export default function RoutinesPage() {
  const { t } = useLang();
  const { draft, update, replace } = useConfig();

  const updateBirthday = (id: string, patch: Partial<Birthday>) => {
    replace("routines", {
      ...draft.routines,
      birthdays: draft.routines.birthdays.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    });
  };

  const addBirthday = () =>
    replace("routines", {
      ...draft.routines,
      birthdays: [...draft.routines.birthdays, newBirthday()],
    });

  const removeBirthday = (id: string) =>
    replace("routines", {
      ...draft.routines,
      birthdays: draft.routines.birthdays.filter((b) => b.id !== id),
    });

  return (
    <>
      <PageHeader
        kicker={t("routines.kicker")}
        title={t("routines.title")}
        subtitle={t("routines.subtitle")}
      />

      <div className="grid sm:grid-cols-2 gap-3 mb-5">
        {ROUTINES.map((r) => (
          <Toggle
            key={r.id}
            on={draft.routines[r.id]}
            onClick={() =>
              update("routines", { [r.id]: !draft.routines[r.id] } as Partial<AriConfig["routines"]>)
            }
            label={t(r.labelKey)}
            description={t(r.descKey)}
          />
        ))}
      </div>

      {draft.routines.birthdayReminders && (
        <Card>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h3 className="font-display text-xl text-cream">{t("routines.birthdays")}</h3>
            <button
              type="button"
              onClick={addBirthday}
              className="px-4 py-2 text-sm rounded-lg border border-border-warm text-cream hover:border-amber/50 hover:bg-glow transition-colors cursor-pointer"
            >
              + {t("routines.addBirthday")}
            </button>
          </div>
          <div className="grid gap-3">
            {draft.routines.birthdays.map((b) => (
              <div
                key={b.id}
                className="bg-ink/50 border border-border-warm rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end"
              >
                <div className="flex-1">
                  <Field label={t("routines.birthdayName")}>
                    <TextInput
                      value={b.name}
                      onChange={(e) => updateBirthday(b.id, { name: e.target.value })}
                    />
                  </Field>
                </div>
                <div className="flex-1">
                  <Field label={t("routines.birthdayDate")}>
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
                  className="text-text-muted hover:text-rose-300 transition-colors text-sm self-end sm:self-auto sm:mb-3 cursor-pointer px-2"
                  aria-label="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}
