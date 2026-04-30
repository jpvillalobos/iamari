"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/session";
import { Sidebar, MobileTopBar, MobileBottomNav } from "./Sidebar";
import { SaveBar } from "./SaveBar";

export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const { session } = useSession();

  // Auth gate: anything not /login requires a session.
  useEffect(() => {
    if (pathname === "/login") return;
    if (typeof window === "undefined") return;
    // Check storage directly to avoid the SSR-empty initial render redirecting eagerly.
    const raw = localStorage.getItem("ari-session");
    if (!raw) router.replace("/login");
  }, [pathname, router, session]);

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
