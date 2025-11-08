"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Beaker, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-white transition-colors hover:text-cyan-400"
          >
            <Beaker className="h-6 w-6 text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Physics Lab
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {!isHome && (
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded-xl border-2 border-cyan-400/50 bg-transparent px-4 py-2 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                ホームに戻る
              </Link>
            )}
            <a
              href="/#explore"
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300",
                isHome
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40"
                  : "border-2 border-slate-700 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300",
              )}
            >
              <Home className="h-4 w-4" />
              実験室一覧
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
