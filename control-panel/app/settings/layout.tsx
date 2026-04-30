"use client";

import { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import { SettingsTabs } from "@/components/SettingsTabs";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell>
      <SettingsTabs />
      {children}
    </AppShell>
  );
}
