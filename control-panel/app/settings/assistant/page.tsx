"use client";

import { useLang } from "@/lib/i18n";
import { useConfig } from "@/lib/config";
import { Card, Checkbox, Field, PageHeader, TextInput } from "@/components/ui";

const EMOJI_PRESETS = ["🌙", "✨", "🦊", "🌊", "🪴", "🐚", "🍃", "🪄", "🌻", "☕"];

export default function AssistantPage() {
  const { t } = useLang();
  const { draft, update } = useConfig();

  const toggleLang = (l: "es" | "en") => {
    const has = draft.assistant.languages.includes(l);
    const next = has
      ? draft.assistant.languages.filter((x) => x !== l)
      : [...draft.assistant.languages, l];
    if (next.length === 0) return; // require at least one
    update("assistant", { languages: next });
  };

  return (
    <>
      <PageHeader
        kicker={t("assistant.kicker")}
        title={t("assistant.title")}
        subtitle={t("assistant.subtitle")}
      />

      <Card className="mb-5">
        <div className="flex items-center gap-4 p-4 mb-6 rounded-xl bg-ink/40 border border-border-warm">
          <div className="text-5xl">{draft.assistant.emoji || "🌙"}</div>
          <div>
            <div className="font-display text-2xl text-cream italic">
              {draft.assistant.name || "Ari"}
            </div>
            <div className="text-xs text-text-muted">
              {draft.assistant.languages.map((l) => l.toUpperCase()).join(" · ")} · vibe{" "}
              {draft.assistant.vibe}/10
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <Field label={t("assistant.name")}>
            <TextInput
              value={draft.assistant.name}
              onChange={(e) => update("assistant", { name: e.target.value })}
            />
          </Field>

          <Field label={t("assistant.emoji")}>
            <div className="flex flex-wrap gap-2 mb-2">
              {EMOJI_PRESETS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => update("assistant", { emoji: e })}
                  className={`w-12 h-12 rounded-lg text-2xl transition-all cursor-pointer ${
                    draft.assistant.emoji === e
                      ? "bg-amber/20 border border-amber/60 scale-105"
                      : "bg-ink/40 border border-border-warm hover:border-amber/30"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
            <TextInput
              value={draft.assistant.emoji}
              onChange={(e) => update("assistant", { emoji: e.target.value })}
              maxLength={4}
              className="!w-24 text-center"
            />
          </Field>

          <Field label={t("assistant.vibe")}>
            <input
              type="range"
              min={1}
              max={10}
              value={draft.assistant.vibe}
              onChange={(e) => update("assistant", { vibe: Number(e.target.value) })}
            />
            <div className="flex justify-between text-xs text-text-muted mt-2">
              <span>{t("assistant.vibeWarm")}</span>
              <span className="text-amber-warm font-medium">{draft.assistant.vibe}/10</span>
              <span>{t("assistant.vibeDirect")}</span>
            </div>
          </Field>

          <Field label={t("assistant.languages")} hint={t("assistant.languagesHint")}>
            <div className="flex gap-6 mt-1">
              <Checkbox
                on={draft.assistant.languages.includes("es")}
                onClick={() => toggleLang("es")}
                label={t("household.langEs")}
              />
              <Checkbox
                on={draft.assistant.languages.includes("en")}
                onClick={() => toggleLang("en")}
                label={t("household.langEn")}
              />
            </div>
          </Field>
        </div>
      </Card>
    </>
  );
}
