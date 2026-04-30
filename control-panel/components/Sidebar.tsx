"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useLang, Lang } from "@/lib/i18n";
import { useSession } from "@/lib/session";

type NavItem = {
  href: string;
  labelKey: string;
  icon: ReactNode;
};

const NAV: NavItem[] = [
  {
    href: "/dashboard",
    labelKey: "nav.dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 10l7-7 7 7M5 8v9h4v-5h2v5h4V8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/settings/household",
    labelKey: "nav.settings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="2.5" />
        <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.5 4.5l1.5 1.5M14 14l1.5 1.5M4.5 15.5L6 14M14 6l1.5-1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/plan",
    labelKey: "nav.plan",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2.5" y="5" width="15" height="11" rx="2" />
        <path d="M2.5 9h15" strokeLinecap="round" />
      </svg>
    ),
  },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";
  if (href.startsWith("/settings")) return pathname.startsWith("/settings");
  if (href === "/plan") return pathname === "/plan";
  return pathname === href;
}

export function Sidebar() {
  const { t, lang, setLang } = useLang();
  const pathname = usePathname();
  const { session, logout } = useSession();

  return (
    <aside className="hidden md:flex md:w-60 lg:w-64 shrink-0 flex-col border-r border-border-warm bg-midnight/60 backdrop-blur-md sticky top-0 h-screen z-30">
      <div className="px-5 py-5 border-b border-border-warm">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-[10px] bg-amber text-midnight flex items-center justify-center font-display italic text-lg font-bold shrink-0">
            A
          </span>
          <div className="leading-tight min-w-0">
            <div className="font-display text-cream text-lg">{t("brand.name")}</div>
            <div className="text-[0.6rem] tracking-[0.15em] uppercase text-text-muted truncate">
              {t("header.controlPanel")}
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {NAV.map((item) => {
            const active = isActive(pathname ?? "", item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[0.95rem] transition-colors ${
                    active
                      ? "bg-glow text-amber border border-border-warm"
                      : "text-text-muted hover:text-cream hover:bg-white/[0.02]"
                  }`}
                >
                  <span className={active ? "text-amber" : "text-text-muted"}>{item.icon}</span>
                  <span>{t(item.labelKey)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 py-4 border-t border-border-warm space-y-3">
        <LangToggle lang={lang} setLang={setLang} />
        {session && (
          <div className="text-xs text-text-muted font-light">
            <div className="uppercase tracking-[0.12em] text-[0.6rem] mb-0.5">
              {t("header.loggedInAs")}
            </div>
            <div className="text-cream truncate" title={session.email}>
              {session.email}
            </div>
            <button
              type="button"
              onClick={logout}
              className="text-text-muted hover:text-amber transition-colors mt-2 cursor-pointer"
            >
              {t("nav.logout")} →
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export function MobileTopBar() {
  const { t, lang, setLang } = useLang();
  return (
    <div className="md:hidden sticky top-0 z-40 backdrop-blur-md bg-midnight/85 border-b border-border-warm">
      <div className="px-5 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-[10px] bg-amber text-midnight flex items-center justify-center font-display italic text-base font-bold">
            A
          </span>
          <div className="font-display text-cream text-base">{t("brand.name")}</div>
        </Link>
        <LangToggle lang={lang} setLang={setLang} compact />
      </div>
    </div>
  );
}

export function MobileBottomNav() {
  const { t } = useLang();
  const pathname = usePathname();
  return (
    <nav className="md:hidden sticky bottom-0 z-40 backdrop-blur-md bg-midnight/85 border-t border-border-warm">
      <ul className="grid grid-cols-3">
        {NAV.map((item) => {
          const active = isActive(pathname ?? "", item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[0.65rem] tracking-wider uppercase font-medium transition-colors ${
                  active ? "text-amber" : "text-text-muted"
                }`}
              >
                {item.icon}
                <span>{t(item.labelKey)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function LangToggle({
  lang,
  setLang,
  compact,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1 text-xs border border-border-warm rounded-lg p-1 bg-ink/40 ${
        compact ? "" : "w-fit"
      }`}
    >
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
