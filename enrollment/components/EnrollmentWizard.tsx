"use client";

import { useMemo, useState } from "react";
import { useLang, Lang } from "@/lib/i18n";
import { EnrollmentData, STEPS, StepKey, emptyEnrollment } from "@/lib/types";
import { Button } from "./ui";

import Step01Account from "./steps/Step01Account";
import Step02Household from "./steps/Step02Household";
import Step03AssistantIdentity from "./steps/Step03AssistantIdentity";
import Step04WhatsApp from "./steps/Step04WhatsApp";
import Step05Email from "./steps/Step05Email";
import Step06Skills from "./steps/Step06Skills";
import Step07RulePacks from "./steps/Step07RulePacks";
import Step08Routines from "./steps/Step08Routines";
import Step09Personality from "./steps/Step09Personality";
import StepReview from "./steps/StepReview";

type Phase = "intro" | "wizard" | "done";

export default function EnrollmentWizard() {
  const { t, lang, setLang } = useLang();
  const [phase, setPhase] = useState<Phase>("intro");
  const [stepIdx, setStepIdx] = useState(0);
  const [data, setData] = useState<EnrollmentData>(emptyEnrollment);

  const stepKey: StepKey = STEPS[stepIdx];

  const update = useMemo(() => {
    return <K extends keyof EnrollmentData>(section: K, patch: Partial<EnrollmentData[K]>) => {
      setData((prev) => ({ ...prev, [section]: { ...prev[section], ...patch } }));
    };
  }, []);

  const goTo = (idx: number) => {
    setStepIdx(Math.max(0, Math.min(STEPS.length - 1, idx)));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const next = () => goTo(stepIdx + 1);
  const back = () => goTo(stepIdx - 1);

  const submit = () => {
    console.log("[ARI enrollment payload]", data);
    setPhase("done");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header lang={lang} setLang={setLang} />

      <main className="flex-1 px-5 sm:px-8 pt-8 pb-16 max-w-3xl w-full mx-auto relative z-10">
        {phase === "intro" && (
          <Intro
            onBegin={() => setPhase("wizard")}
            kicker={t("intro.kicker")}
            title={t("intro.title")}
            subtitle={t("intro.subtitle")}
            cta={t("intro.begin")}
          />
        )}

        {phase === "wizard" && (
          <>
            <ProgressBar current={stepIdx} onJump={goTo} data={data} />
            <div className="mt-6">
              {stepKey === "01" && <Step01Account data={data.account} update={(p) => update("account", p)} />}
              {stepKey === "02" && (
                <Step02Household data={data.household} update={(p) => update("household", p)} />
              )}
              {stepKey === "03" && (
                <Step03AssistantIdentity
                  data={data.assistant}
                  update={(p) => update("assistant", p)}
                />
              )}
              {stepKey === "04" && (
                <Step04WhatsApp
                  whatsapp={data.whatsapp}
                  members={data.household.members}
                  update={(p) => update("whatsapp", p)}
                />
              )}
              {stepKey === "05" && (
                <Step05Email
                  data={data.email}
                  familyName={data.household.familyName}
                  update={(p) => update("email", p)}
                />
              )}
              {stepKey === "06" && (
                <Step06Skills data={data.skills} update={(p) => update("skills", p)} />
              )}
              {stepKey === "07" && (
                <Step07RulePacks data={data.rulePacks} update={(p) => update("rulePacks", p)} />
              )}
              {stepKey === "08" && (
                <Step08Routines data={data.routines} update={(p) => update("routines", p)} />
              )}
              {stepKey === "09" && (
                <Step09Personality
                  data={data.personality}
                  update={(p) => update("personality", p)}
                />
              )}
              {stepKey === "review" && (
                <StepReview data={data} onEdit={(idx) => goTo(idx)} />
              )}
            </div>

            <NavBar
              stepIdx={stepIdx}
              onBack={back}
              onNext={next}
              onSubmit={submit}
              backLabel={t("nav.back")}
              nextLabel={t("nav.next")}
              reviewLabel={t("nav.review")}
              enrollLabel={t("nav.enroll")}
            />
          </>
        )}

        {phase === "done" && (
          <DoneScreen
            data={data}
            onStartOver={() => {
              setData(emptyEnrollment());
              setStepIdx(0);
              setPhase("intro");
            }}
            title={t("done.title")}
            subtitle={t("done.subtitle")}
            startOver={t("done.startOver")}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

function Header({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const { t } = useLang();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-midnight/80 border-b border-border-warm">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-[10px] bg-amber text-midnight flex items-center justify-center font-display italic text-lg font-bold shrink-0">
            A
          </span>
          <div className="leading-tight">
            <div className="font-display text-cream text-lg">{t("brand.name")}</div>
            <div className="text-[0.65rem] tracking-[0.15em] uppercase text-text-muted">
              {t("header.enrollment")}
            </div>
          </div>
        </div>
        <LangToggle lang={lang} setLang={setLang} />
      </div>
    </header>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center gap-1 text-xs border border-border-warm rounded-lg p-1 bg-ink/40">
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1 rounded-md uppercase tracking-wider font-medium transition-colors cursor-pointer ${
            lang === l ? "bg-amber text-midnight" : "text-text-muted hover:text-cream"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function Intro({
  onBegin,
  kicker,
  title,
  subtitle,
  cta,
}: {
  onBegin: () => void;
  kicker: string;
  title: string;
  subtitle: string;
  cta: string;
}) {
  return (
    <div className="pt-12 sm:pt-20 pb-8 step-enter">
      <div className="text-[0.7rem] tracking-[0.18em] uppercase text-amber font-medium mb-4">
        {kicker}
      </div>
      <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] tracking-tight text-cream mb-5">
        {title.split(" ").slice(0, -1).join(" ")}{" "}
        <em className="text-amber italic">{title.split(" ").slice(-1)}</em>
      </h1>
      <p className="text-text-muted text-lg leading-relaxed font-light max-w-xl mb-10">{subtitle}</p>
      <Button onClick={onBegin}>
        {cta}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Button>
    </div>
  );
}

function ProgressBar({
  current,
  onJump,
  data,
}: {
  current: number;
  onJump: (idx: number) => void;
  data: EnrollmentData;
}) {
  const { t } = useLang();
  // a step counts as visited if we've passed it; allow clicking back
  return (
    <nav aria-label="Enrollment steps" className="-mx-1 overflow-x-auto">
      <ol className="flex items-center gap-1.5 min-w-max px-1">
        {STEPS.map((s, idx) => {
          const visited = idx <= current;
          const active = idx === current;
          const label = t(`steps.${s}`);
          return (
            <li key={s} className="flex items-center">
              <button
                type="button"
                onClick={() => visited && onJump(idx)}
                disabled={!visited}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                  active
                    ? "bg-amber text-midnight font-medium cursor-default"
                    : visited
                    ? "text-amber-warm hover:bg-glow cursor-pointer"
                    : "text-text-muted/60 cursor-not-allowed"
                }`}
              >
                <span
                  className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] font-bold ${
                    active
                      ? "bg-midnight text-amber"
                      : visited
                      ? "bg-amber/20 text-amber-warm"
                      : "bg-ink-light text-text-muted/60"
                  }`}
                >
                  {s === "review" ? "✓" : idx + 1}
                </span>
                <span>{label}</span>
              </button>
              {idx < STEPS.length - 1 && (
                <span
                  className={`w-3 h-px mx-0.5 ${visited && idx < current ? "bg-amber/40" : "bg-border-warm"}`}
                />
              )}
            </li>
          );
        })}
      </ol>
      <div className="text-text-muted text-xs mt-3 px-1 font-light">
        {t("header.step")} {current + 1} {t("header.of")} {STEPS.length}
        {/* keep `data` referenced so it stays validated by callers — no-op */}
        <span className="hidden">{data.account.email ? "" : ""}</span>
      </div>
    </nav>
  );
}

function NavBar({
  stepIdx,
  onBack,
  onNext,
  onSubmit,
  backLabel,
  nextLabel,
  reviewLabel,
  enrollLabel,
}: {
  stepIdx: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  backLabel: string;
  nextLabel: string;
  reviewLabel: string;
  enrollLabel: string;
}) {
  const isLast = stepIdx === STEPS.length - 1;
  const isSecondLast = stepIdx === STEPS.length - 2;
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      <Button variant="ghost" onClick={onBack} disabled={stepIdx === 0}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M11 7H3m0 0l4-4m-4 4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {backLabel}
      </Button>
      {isLast ? (
        <Button onClick={onSubmit}>
          {enrollLabel}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      ) : (
        <Button onClick={onNext}>
          {isSecondLast ? reviewLabel : nextLabel}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      )}
    </div>
  );
}

function DoneScreen({
  data,
  onStartOver,
  title,
  subtitle,
  startOver,
}: {
  data: EnrollmentData;
  onStartOver: () => void;
  title: string;
  subtitle: string;
  startOver: string;
}) {
  return (
    <div className="pt-12 sm:pt-16 step-enter">
      <div className="text-6xl mb-6">{data.assistant.emoji || "🌙"}</div>
      <h1 className="font-display text-4xl sm:text-5xl leading-[1.1] tracking-tight text-cream mb-4">
        {title}
      </h1>
      <p className="text-text-muted text-lg leading-relaxed font-light max-w-xl mb-8">{subtitle}</p>
      <pre className="json-preview bg-ink/80 border border-border-warm rounded-xl p-4 text-xs text-amber-warm/90 overflow-auto max-h-[400px] font-mono leading-relaxed">
        {JSON.stringify(data, null, 2)}
      </pre>
      <div className="mt-6">
        <Button variant="outline" onClick={onStartOver}>
          {startOver}
        </Button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border-warm bg-midnight/60 mt-auto">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-6 flex items-center justify-between flex-wrap gap-2">
        <span className="text-xs text-text-muted font-light">
          ARI © {new Date().getFullYear()} · Built by JP.
        </span>
        <span className="text-xs text-text-muted/70 font-light italic">Mockup — no real provisioning yet.</span>
      </div>
    </footer>
  );
}
