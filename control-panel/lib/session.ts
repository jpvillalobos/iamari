"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Session } from "./types";

const STORAGE_KEY = "ari-session";
const CHANGE_EVENT = "ari-session-change";

function read(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
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

const getServerSnapshot = (): Session | null => null;

export function useSession() {
  const session = useSyncExternalStore(subscribe, read, getServerSnapshot);

  const login = useCallback((email: string) => {
    if (typeof window === "undefined") return;
    const s: Session = { email, loggedInAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const logout = useCallback(() => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { session, login, logout };
}
