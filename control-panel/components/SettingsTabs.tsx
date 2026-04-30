"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

const TABS: { href: string; key: string }[] = [
  { href: "/settings/household", key: "settings.household" },
  { href: "/settings/assistant", key: "settings.assistant" },
  { href: "/settings/whatsapp", key: "settings.whatsapp" },
  { href: "/settings/email", key: "settings.email" },
  { href: "/settings/skills", key: "settings.skills" },
  { href: "/settings/rules", key: "settings.rules" },
  { href: "/settings/routines", key: "settings.routines" },
  { href: "/settings/personality", key: "settings.personality" },
];

export function SettingsTabs() {
  const { t } = useLang();
  const pathname = usePathname() ?? "";
  return (
    <nav aria-label="Settings sections" className="-mx-1 mb-6 overflow-x-auto thin-scroll">
      <ol className="flex items-center gap-1 min-w-max px-1">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                  active
                    ? "bg-amber text-midnight font-medium"
                    : "text-text-muted hover:text-cream hover:bg-glow"
                }`}
              >
                {t(tab.key)}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
