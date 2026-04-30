"use client";

import { useEffect, useState } from "react";
import { useConfig } from "@/lib/config";
import { useLang } from "@/lib/i18n";

export function SaveBar() {
  const { dirty, save, discard } = useConfig();
  const { t } = useLang();
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (justSaved) {
      const id = setTimeout(() => setJustSaved(false), 1800);
      return () => clearTimeout(id);
    }
  }, [justSaved]);

  if (!dirty && !justSaved) return null;

  return (
    <div
      className="fixed left-0 right-0 bottom-14 md:bottom-6 px-4 z-50 pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <div className="max-w-3xl mx-auto pointer-events-auto">
        <div
          className={`flex items-center justify-between gap-3 px-5 py-3 rounded-xl backdrop-blur-md border shadow-[0_12px_32px_rgba(0,0,0,0.3)] ${
            dirty
              ? "bg-ink/90 border-amber/40"
              : "bg-emerald-900/70 border-emerald-400/40"
          }`}
        >
          {dirty ? (
            <>
              <span className="text-sm text-cream font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
                {t("nav.unsaved")}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={discard}
                  className="px-3 py-1.5 text-sm text-text-muted hover:text-cream transition-colors cursor-pointer"
                >
                  {t("nav.discard")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    save();
                    setJustSaved(true);
                  }}
                  className="px-4 py-1.5 text-sm font-medium bg-amber text-midnight rounded-lg hover:bg-amber-warm transition-colors cursor-pointer"
                >
                  {t("nav.save")}
                </button>
              </div>
            </>
          ) : (
            <span className="text-sm text-emerald-200 font-medium flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t("nav.saved")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
