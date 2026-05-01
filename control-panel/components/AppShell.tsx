"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar, MobileTopBar, MobileBottomNav } from "./Sidebar";
import { SaveBar } from "./SaveBar";

export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Auth gate runs only after client mount to avoid SSR hydration mismatches.
  useEffect(() => {
    if (!mounted) return;
    if (pathname === "/login") return;
    const raw = localStorage.getItem("ari-session");
    if (!raw) router.replace("/login");
  }, [mounted, pathname, router]);

  return (
    <div className="flex min-h-screen relative z-10">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileTopBar />
        <main className="flex-1 px-5 sm:px-8 lg:px-12 py-6 sm:py-10 max-w-5xl w-full mx-auto pb-28 md:pb-32">
          <div className="page-enter">{children}</div>
        </main>
        <MobileBottomNav />
        <SaveBar />
      </div>
    </div>
  );
}
