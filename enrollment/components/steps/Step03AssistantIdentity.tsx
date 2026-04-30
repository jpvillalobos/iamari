"use client";

import { useLang } from "@/lib/i18n";
import { EnrollmentData } from "@/lib/types";
import { Field, TextInput, StepCard, StepHeader, Checkbox } from "../ui";

const EMOJI_PRESETS = ["🌙", "✨", "🦉", "🐺", "🪐", "🔮", "🌿", "☕", "🐉", "🦊"];

export default function Step03AssistantIdentity({
  data,
  update,
}: {
  data: EnrollmentData["assistant"];
  update: (p: Partial<EnrollmentData["assistant"]>) => void;
}) {
  const { t } = useLang();

  const toggleLang = (l: "es" | "en") => {
    const has = data.languages.includes(l);
    let next = has ? data.languages.filter((x) => x !== l) : [...data.languages, l];
    if (next.length === 0) next = [l]; // never empty
    update({ languages: next });
  };

  return (
    <StepCard>
      <StepHeader
        kicker={t("step03.kicker")}
        title={t("step03.title")}
        subtitle={t("step03.subtitle")}
      />

      <div className="grid gap-6">
        <div className="flex items-center gap-4 p-5 rounded-xl bg-glow border border-border-warm">
          <div className="text-5xl">{data.emoji || "🌙"}</div>
          <div>
            <div className="font-display text-cream text-xl">{data.name || "Ari"}</div>
            <div className="text-xs text-text-muted font-light mt-0.5">
              {data.languages.join(" · ").toUpperCase()}
            </div>
          </div>
        </div>

        <Field label={t("step03.name")} hint={t("step03.nameHint")} required>
          <TextInput
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder={t("step03.namePlaceholder")}
          />
        </Field>

        <div>
          <span className="block text-sm font-medium text-cream mb-1.5">{t("step03.emoji")}</span>
          <div className="flex flex-wrap gap-2 mb-2">
            {EMOJI_PRESETS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => update({ emoji: e })}
                className={`w-12 h-12 text-2xl rounded-lg border transition-all cursor-pointer ${
                  data.emoji === e
                    ? "border-amber bg-glow"
                    : "border-border-warm bg-ink/40 hover:border-amber/30 hover:bg-ink/60"
                }`}
              >
                {e}
              </button>
            ))}
            <TextInput
              value={data.emoji}
              onChange={(e) => update({ emoji: e.target.value })}
              maxLength={4}
              className="!w-16 text-center !px-2 text-2xl"
              aria-label="Custom emoji"
            />
          </div>
          <span className="block text-xs text-text-muted font-light leading-relaxed">
            {t("step03.emojiHint")}
          </span>
        </div>

        <div>
          <span className="block text-sm font-medium text-cream mb-3">{t("step03.vibe")}</span>
          <div className="px-1">
            <input
              type="range"
              min={1}
              max={10}
              value={data.vibe}
              onChange={(e) => update({ vibe: Number(e.target.value) })}
            />
            <div className="flex justify-between mt-2 text-xs text-text-muted font-light">
              <span>{t("step03.vibeWarm")}</span>
              <span className="text-amber-warm font-medium">{data.vibe}/10</span>
              <span>{t("step03.vibeDirect")}</span>
            </div>
            <div className="text-xs text-text-muted font-light italic mt-2">{t("step03.vibeHint")}</div>
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium text-cream mb-3">{t("step03.languages")}</span>
          <div className="flex flex-col gap-3">
            <Checkbox
              on={data.languages.includes("es")}
              onClick={() => toggleLang("es")}
              label="Español"
            />
            <Checkbox
              on={data.languages.includes("en")}
              onClick={() => toggleLang("en")}
              label="English"
            />
          </div>
          <div className="text-xs text-text-muted font-light mt-2 leading-relaxed">
            {t("step03.languagesHint")}
          </div>
        </div>
      </div>
    </StepCard>
  );
}
