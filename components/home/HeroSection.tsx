import Link from "next/link";

import type { Pathway } from "@/lib/pathways";

type HeroSectionProps = {
  pathways: readonly Pathway[];
};

export function HeroSection({ pathways }: HeroSectionProps) {
  return (
    <section className="grid items-center gap-12 md:grid-cols-[1.2fr,0.8fr]">
      <div className="space-y-8">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-200">
          Physics Simulation Showcase
        </p>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            身のまわりの物理を、
            <span className="text-cyan-300"> スタイリッシュなラボ</span>
            で観測しよう。
          </h1>
          <p className="text-lg text-slate-200">
            物理現象を“面白さ”で語る Web
            サイト。ひとつずつ独立した実験室をのぞき込み、気になる設定だけを選んで実行。
            クイズでも講義でもない、体験主導の探究空間です。
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="#explore"
            className="rounded-full bg-cyan-400/90 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            シミュレーション一覧を見る
          </Link>
          <Link
            href="/rolling-material"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/80 hover:text-cyan-200"
          >
            すぐ試す
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-[0_20px_80px_rgba(6,182,212,0.2)] backdrop-blur">
        <p className="text-sm font-semibold text-cyan-200">Concept Log</p>
        <div className="mt-6 space-y-6">
          {pathways.map((item) => (
            <div key={item.title}>
              <h3 className="text-lg font-medium text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
