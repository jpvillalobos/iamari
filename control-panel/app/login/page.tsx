"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { useSession } from "@/lib/session";
import { Button, Field, TextInput, Card, Checkbox } from "@/components/ui";

export default function LoginPage() {
  const { t, lang, setLang } = useLang();
  const router = useRouter();
  const { session, login } = useSession();
  const [email, setEmail] = useState("jp@iamari.co");
  const [password, setPassword] = useState("demo");
  const [remember, setRemember] = useState(true);

  // If already logged in, bounce to dashboard.
  useEffect(() => {
    if (session) router.replace("/dashboard");
  }, [session, router]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    login(email.trim());
    router.replace("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      <header className="px-5 sm:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-[10px] bg-amber text-midnight flex items-center justify-center font-display italic text-lg font-bold">
            A
          </span>
          <div className="leading-tight">
            <div className="font-display text-cream text-lg">{t("brand.name")}</div>
            <div className="text-[0.6rem] tracking-[0.15em] uppercase text-text-muted">
              {t("header.controlPanel")}
            </div>
          </div>
        </div>
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
      </header>

      <main className="flex-1 flex items-center justify-center px-5 pb-12">
        <div className="w-full max-w-md">
          <Card className="page-enter">
            <div className="text-[0.7rem] tracking-[0.18em] uppercase text-amber font-medium mb-3">
              {t("login.kicker")}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl leading-[1.15] tracking-tight text-cream mb-3">
              {t("login.title")}
            </h1>
            <p className="text-text-muted leading-relaxed font-light mb-8">
              {t("login.subtitle")}
            </p>

            <form onSubmit={onSubmit} className="grid gap-5">
              <Field label={t("login.email")}>
                <TextInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("login.emailPlaceholder")}
                  autoComplete="email"
                  required
                />
              </Field>

              <Field label={t("login.password")}>
                <TextInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("login.passwordPlaceholder")}
                  autoComplete="current-password"
                />
              </Field>

              <div className="flex items-center justify-between">
                <Checkbox
                  on={remember}
                  onClick={() => setRemember((s) => !s)}
                  label={t("login.remember")}
                />
                <button
                  type="button"
                  className="text-xs text-text-muted hover:text-amber transition-colors cursor-pointer"
                >
                  {t("login.forgot")}
                </button>
              </div>

              <Button type="submit" className="w-full">
                {t("login.submit")}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8m0 0L7 3m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            </form>

            <p className="text-xs text-text-muted/80 italic mt-6 text-center font-light">
              {t("login.demoNote")}
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
