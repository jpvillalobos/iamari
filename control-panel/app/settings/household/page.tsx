"use client";

import { useLang } from "@/lib/i18n";
import { useConfig } from "@/lib/config";
import { Member, newMember, PLANS } from "@/lib/types";
import { Card, Field, PageHeader, Select, TextInput } from "@/components/ui";

export default function HouseholdPage() {
  const { t } = useLang();
  const { draft, update, replace } = useConfig();
  const plan = PLANS[draft.account.tier];

  const updateMember = (id: string, patch: Partial<Member>) => {
    replace(
      "household",
      {
        ...draft.household,
        members: draft.household.members.map((m) => (m.id === id ? { ...m, ...patch } : m)),
      },
    );
  };

  const addMember = () => {
    if (plan.maxMembers !== -1 && draft.household.members.length >= plan.maxMembers) return;
    replace("household", {
      ...draft.household,
      members: [...draft.household.members, newMember()],
    });
  };

  const removeMember = (id: string) => {
    replace("household", {
      ...draft.household,
      members: draft.household.members.filter((m) => m.id !== id),
    });
  };

  const atLimit = plan.maxMembers !== -1 && draft.household.members.length >= plan.maxMembers;

  return (
    <>
      <PageHeader
        kicker={t("household.kicker")}
        title={t("household.title")}
        subtitle={t("household.subtitle")}
      />

      <Card className="mb-5">
        <Field label={t("household.familyName")} hint={t("household.familyNameHint")}>
          <TextInput
            value={draft.household.familyName}
            onChange={(e) => update("household", { familyName: e.target.value })}
          />
        </Field>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h3 className="font-display text-xl text-cream">{t("household.members")}</h3>
            <p className="text-xs text-text-muted font-light mt-0.5">
              {plan.maxMembers === -1
                ? t("plan.membersUnlimited")
                : t("household.limitNote", { max: plan.maxMembers })}
            </p>
          </div>
          <button
            type="button"
            onClick={addMember}
            disabled={atLimit}
            className="px-4 py-2 text-sm rounded-lg border border-border-warm text-cream hover:border-amber/50 hover:bg-glow transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            + {t("household.addMember")}
          </button>
        </div>

        <div className="grid gap-3">
          {draft.household.members.map((m) => (
            <div
              key={m.id}
              className="bg-ink/50 border border-border-warm rounded-xl p-4 grid sm:grid-cols-2 gap-3"
            >
              <Field label={t("household.memberName")}>
                <TextInput
                  value={m.name}
                  onChange={(e) => updateMember(m.id, { name: e.target.value })}
                />
              </Field>
              <Field label={t("household.memberNickname")}>
                <TextInput
                  value={m.nickname ?? ""}
                  onChange={(e) => updateMember(m.id, { nickname: e.target.value })}
                />
              </Field>
              <Field label={t("household.memberPhone")}>
                <TextInput
                  type="tel"
                  value={m.phone}
                  onChange={(e) => updateMember(m.id, { phone: e.target.value })}
                  placeholder="+506…"
                />
              </Field>
              <Field label={t("household.memberRole")}>
                <Select
                  value={m.role}
                  onChange={(e) => updateMember(m.id, { role: e.target.value as Member["role"] })}
                >
                  <option value="owner">{t("household.roleOwner")}</option>
                  <option value="adult">{t("household.roleAdult")}</option>
                  <option value="child">{t("household.roleChild")}</option>
                </Select>
              </Field>
              <Field label={t("household.memberLanguage")}>
                <Select
                  value={m.language}
                  onChange={(e) =>
                    updateMember(m.id, { language: e.target.value as Member["language"] })
                  }
                >
                  <option value="es">{t("household.langEs")}</option>
                  <option value="en">{t("household.langEn")}</option>
                  <option value="both">{t("household.langBoth")}</option>
                </Select>
              </Field>
              <div className="flex items-end justify-end">
                <button
                  type="button"
                  onClick={() => removeMember(m.id)}
                  className="px-4 py-2 text-sm rounded-lg text-text-muted hover:text-rose-300 transition-colors cursor-pointer"
                >
                  {t("household.remove")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
