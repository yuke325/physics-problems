import Link from "next/link";

import type { LabSummary } from "@/lib/labs";

type ExperimentsSectionProps = {
  labs: readonly LabSummary[];
};

export function ExperimentsSection({ labs }: ExperimentsSectionProps) {
  const featuredLab = labs[0];

  return (
    <section id="explore" className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            Lab Archive
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            公開中の実験室
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            すべて独立したテーマです。好奇心をくすぐる現象を選び、パラメータをいじりながら物理の表情を観測してください。
          </p>
        </div>
        {featuredLab ? (
          <Link
            href={featuredLab.slug}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-white"
          >
            今日のおすすめ: {featuredLab.title} →
          </Link>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {labs.map((lab) => (
          <Link
            key={lab.slug}
            href={lab.slug}
            className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/40"
          >
            <div
              className={`pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-br ${lab.accent}`}
            />
            <div className="relative flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.5em] text-slate-400">
                {lab.code}
              </p>
              <span className="text-xs text-cyan-200">{lab.status}</span>
            </div>
            <h3 className="relative mt-4 text-2xl font-semibold text-white">
              {lab.title}
            </h3>
            <p className="relative mt-3 text-sm text-slate-200">
              {lab.description}
            </p>
            <div className="relative mt-5 flex flex-wrap gap-2">
              {lab.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-slate-100"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
              詳細を見る
              <span className="transition group-hover:translate-x-1">→</span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
