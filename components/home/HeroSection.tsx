import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import type { Pathway } from "@/lib/pathways";

type HeroSectionProps = {
  pathways: readonly Pathway[];
};

export function HeroSection({ pathways }: HeroSectionProps) {
  return (
    <section className="grid items-center gap-12 md:grid-cols-[1.2fr,0.8fr]">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200 font-semibold">
            Physics Simulation Showcase
          </p>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text">
            身のまわりの物理を、
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              スタイリッシュなラボ
            </span>
            で観測しよう。
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
            物理現象を"面白さ"で語る Web
            サイト。ひとつずつ独立した実験室をのぞき込み、気になる設定だけを選んで実行。
            クイズでも講義でもない、体験主導の探究空間です。
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="#explore"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/60"
          >
            シミュレーション一覧を見る
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/rolling-material"
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-cyan-400/50 bg-transparent px-7 py-3.5 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10"
          >
            すぐ試す
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="group rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/30 hover:shadow-cyan-500/20">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <p className="text-sm font-semibold text-cyan-200 uppercase tracking-wider">
              Concept Log
            </p>
          </div>
          <div className="mt-6 space-y-6">
            {pathways.map((item, idx) => (
              <div key={item.title} className="group/item">
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-xs font-mono text-cyan-400/60">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover/item:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
                {idx < pathways.length - 1 && (
                  <div className="my-4 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
