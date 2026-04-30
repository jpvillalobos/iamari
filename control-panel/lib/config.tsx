"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { AriConfig, demoConfig } from "./types";

const STORAGE_KEY = "ari-config";
const CHANGE_EVENT = "ari-config-change";

function readSaved(): AriConfig {
  if (typeof window === "undefined") return demoConfig();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return demoConfig();
    return JSON.parse(raw) as AriConfig;
  } catch {
    return demoConfig();
  }
}

function subscribe(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb();
  };
  const onCustom = () => cb();
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, onCustom);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, onCustom);
  };
}

const getServerSnapshot = (): AriConfig => demoConfig();

type Ctx = {
  /** Live, edit-aware config — what the UI should display. */
  draft: AriConfig;
  /** Last persisted config from localStorage. */
  saved: AriConfig;
  /** True if draft differs from saved. */
  dirty: boolean;
  /** Update one section of the draft. */
  update<K extends keyof AriConfig>(section: K, patch: Partial<AriConfig[K]>): void;
  /** Replace a section entirely (useful for arrays like members). */
  replace<K extends keyof AriConfig>(section: K, value: AriConfig[K]): void;
  /** Persist draft → localStorage. */
  save(): void;
  /** Throw away draft, revert to saved. */
  discard(): void;
  /** Wipe localStorage and reset to demo data. */
  resetToDemo(): void;
};

const ConfigContext = createContext<Ctx | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const saved = useSyncExternalStore(subscribe, readSaved, getServerSnapshot);
  // Draft is null when the user hasn't started editing — in that state we just
  // surface `saved`. Once they edit, we hold a local copy until save/discard.
  const [draft, setDraft] = useState<AriConfig | null>(null);

  const effective = draft ?? saved;

  const dirty = useMemo(() => {
    if (!draft) return false;
    return JSON.stringify(draft) !== JSON.stringify(saved);
  }, [draft, saved]);

  const update = useCallback<Ctx["update"]>((section, patch) => {
    setDraft((prev) => {
      const base = prev ?? readSaved();
      return { ...base, [section]: { ...base[section], ...patch } };
    });
  }, []);

  const replace = useCallback<Ctx["replace"]>((section, value) => {
    setDraft((prev) => {
      const base = prev ?? readSaved();
      return { ...base, [section]: value };
    });
  }, []);

  const save = useCallback(() => {
    if (typeof window === "undefined") return;
    setDraft((prev) => {
      if (!prev) return null;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prev));
      window.dispatchEvent(new Event(CHANGE_EVENT));
      return null; // clear draft so we follow saved again
    });
  }, []);

  const discard = useCallback(() => setDraft(null), []);

  const resetToDemo = useCallback(() => {
    if (typeof window === "undefined") return;
    const fresh = demoConfig();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    window.dispatchEvent(new Event(CHANGE_EVENT));
    setDraft(null);
  }, []);

  const value = useMemo<Ctx>(
    () => ({ draft: effective, saved, dirty, update, replace, save, discard, resetToDemo }),
    [effective, saved, dirty, update, replace, save, discard, resetToDemo],
  );

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

export function useConfig(): Ctx {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error("useConfig must be used inside ConfigProvider");
  return ctx;
}
