import { ArrowRight, Star, Zap } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { LabSummary } from "@/lib/types";

interface ExperimentsSectionProps {
  labs: readonly LabSummary[];
}

export function ExperimentsSection({ labs }: ExperimentsSectionProps) {
  const labLength = labs.length;
  if (labLength === 0) {
    return (
      <section id="explore" className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400 font-semibold">
                Lab Archive
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              公開中の実験室
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-2xl leading-relaxed">
              現在、公開中の実験室はありません。近日中に新しい実験室が追加される予定ですので、お楽しみに！
            </p>
          </div>
        </div>
      </section>
    );
  }
  const randomIndex = Math.floor(Math.random() * labLength);
  const featuredLab = labs[randomIndex];

  return (
    <section id="explore" className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2">
            <div className="h-1 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 font-semibold">
              Lab Archive
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            公開中の実験室
          </h2>
          <p className="mt-3 text-sm text-slate-300 max-w-2xl leading-relaxed">
            すべて独立したテーマです。好奇心をくすぐる現象を選び、パラメータをいじりながら物理の表情を観測してください。
          </p>
        </div>
        {featuredLab ? (
          <Link
            href={featuredLab.slug}
            className="group inline-flex items-center gap-2 rounded-xl border border-yellow-400/30 bg-yellow-500/10 px-4 py-2.5 text-sm font-semibold text-yellow-300 backdrop-blur-sm transition-all hover:border-yellow-400/50 hover:bg-yellow-500/20"
          >
            <Star className="h-4 w-4" />
            今日のおすすめ: {featuredLab.title}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {labs.map((lab, idx) => (
          <Link
            key={lab.slug}
            href={lab.slug}
            className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-sm p-8 transition-all duration-500 hover:border-cyan-400/40 hover:bg-slate-900/60 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20"
          >
            <div
              className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${lab.accent}`}
            />
            <div className="relative space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-500">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.5em] text-slate-400">
                    {lab.code}
                  </p>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  {lab.status}
                </Badge>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {lab.title}
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {lab.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {lab.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400 pt-2">
                詳細を見る
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
