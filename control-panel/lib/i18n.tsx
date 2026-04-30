"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, ReactNode } from "react";
import en from "@/locales/en.json";
import es from "@/locales/es.json";

export type Lang = "es" | "en";

const dictionaries = { es, en } as const;

type Dict = typeof en;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "ari-lang";
const CHANGE_EVENT = "ari-lang-change";

function lookup(dict: Dict, key: string): string | undefined {
  return key.split(".").reduce<unknown>((acc, k) => {
    if (acc && typeof acc === "object" && k in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[k];
    }
    return undefined;
  }, dict) as string | undefined;
}

function interpolate(s: string, vars?: Record<string, string | number>): string {
  if (!vars) return s;
  return s.replace(/\{\{(\w+)\}\}/g, (_, k) => String(vars[k] ?? `{{${k}}}`));
}

function readLang(): Lang {
  if (typeof window === "undefined") return "es";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "es" || stored === "en") return stored;
  const nav = navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("en") ? "en" : "es";
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  const onCustom = () => callback();
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, onCustom);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, onCustom);
  };
}

const getServerSnapshot = (): Lang => "es";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLang, getServerSnapshot);

  const setLang = useCallback((l: Lang) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, l);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      if (vars && typeof vars.count === "number") {
        const pluralKey = vars.count === 1 ? `${key}_one` : `${key}_other`;
        const found = lookup(dictionaries[lang], pluralKey) ?? lookup(dictionaries.en, pluralKey);
        if (found) return interpolate(found, vars);
      }
      const found = lookup(dictionaries[lang], key) ?? lookup(dictionaries.en, key);
      return interpolate(found ?? key, vars);
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
