"use client";

import { useLang } from "@/lib/i18n";
import { EnrollmentData, Member, newMember } from "@/lib/types";
import { Field, TextInput, Select, Button, StepCard, StepHeader } from "../ui";

export default function Step02Household({
  data,
  update,
}: {
  data: EnrollmentData["household"];
  update: (p: Partial<EnrollmentData["household"]>) => void;
}) {
  const { t } = useLang();

  const updateMember = (id: string, patch: Partial<Member>) => {
    update({
      members: data.members.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    });
  };

  const addMember = () => {
    const fresh = newMember();
    // first member defaults to owner role
    if (data.members.length === 0) fresh.role = "owner";
    update({ members: [...data.members, fresh] });
  };

  const removeMember = (id: string) => {
    update({ members: data.members.filter((m) => m.id !== id) });
  };

  return (
    <StepCard>
      <StepHeader
        kicker={t("step02.kicker")}
        title={t("step02.title")}
        subtitle={t("step02.subtitle")}
      />

      <div className="grid gap-6">
        <Field label={t("step02.familyName")} hint={t("step02.familyNameHint")} required>
          <TextInput
            value={data.familyName}
            onChange={(e) => update({ familyName: e.target.value })}
            placeholder={t("step02.familyNamePlaceholder")}
          />
        </Field>

        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="block text-sm font-medium text-cream">{t("step02.members")}</span>
            <Button variant="outline" onClick={addMember} className="!py-2 !px-4 !text-sm">
              + {t("step02.addMember")}
            </Button>
          </div>

          {data.members.length === 0 && (
            <div className="border border-dashed border-border-warm rounded-xl p-8 text-center text-text-muted text-sm font-light">
              {t("step02.noMembers" as never) || "No members yet."}
            </div>
          )}

          <div className="grid gap-4">
            {data.members.map((m, idx) => (
              <div
                key={m.id}
                className="bg-ink/50 border border-border-warm rounded-xl p-4 sm:p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-[0.7rem] tracking-[0.15em] uppercase text-text-muted font-medium">
                    #{idx + 1}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMember(m.id)}
                    className="text-xs text-text-muted hover:text-amber transition-colors cursor-pointer"
                  >
                    {t("step02.remove")}
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label={t("step02.memberName")} required>
                    <TextInput
                      value={m.name}
                      onChange={(e) => updateMember(m.id, { name: e.target.value })}
                    />
                  </Field>

                  <Field label={t("step02.memberNickname")}>
                    <TextInput
                      value={m.nickname ?? ""}
                      onChange={(e) => updateMember(m.id, { nickname: e.target.value })}
                    />
                  </Field>

                  <Field label={t("step02.memberPhone")}>
                    <TextInput
                      type="tel"
                      placeholder="+506 8xxx xxxx"
                      value={m.phone}
                      onChange={(e) => updateMember(m.id, { phone: e.target.value })}
                    />
                  </Field>

                  <Field label={t("step02.memberRole")}>
                    <Select
                      value={m.role}
                      onChange={(e) =>
                        updateMember(m.id, { role: e.target.value as Member["role"] })
                      }
                    >
                      <option value="owner">{t("step02.roleOwner")}</option>
                      <option value="adult">{t("step02.roleAdult")}</option>
                      <option value="child">{t("step02.roleChild")}</option>
                    </Select>
                  </Field>

                  <Field label={t("step02.memberLanguage")}>
                    <Select
                      value={m.language}
                      onChange={(e) =>
                        updateMember(m.id, { language: e.target.value as Member["language"] })
                      }
                    >
                      <option value="es">{t("step02.langEs")}</option>
                      <option value="en">{t("step02.langEn")}</option>
                      <option value="both">{t("step02.langBoth")}</option>
                    </Select>
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StepCard>
  );
}
