import Link from "next/link";

const experiments = [
  {
    slug: "/rolling-material",
    code: "EX-01",
    title: "斜面ダイナミクス・スタジオ",
    description:
      "重力・摩擦・密度を自由に切り替えて、斜面上を転がる物体のエネルギーフローを可視化します。数値を触るたびに運動量の移ろいが鮮明に。",
    tags: ["重力", "摩擦", "エネルギー"],
    accent: "from-cyan-500/30 via-sky-500/10 to-transparent",
    status: "体験可能",
  },
  {
    slug: "/antigravity",
    code: "EX-02",
    title: "アンチグラビティ・インスタレーション",
    description:
      "逆重力や負の摩擦といった非直感的なパラメータを投入し、常識から外れた運動を味わう実験空間。思想実験をブラウザで。",
    tags: ["逆重力", "摩擦", "直感とのズレ"],
    accent: "from-purple-500/30 via-indigo-500/10 to-transparent",
    status: "体験可能",
  },
  {
    slug: "/hoge",
    code: "EX-03",
    title: "摩擦レス・カタパルト",
    description:
      "摩擦を極限まで下げたとき物体はどこまで加速できるのか。シンプルな設定で境界条件の本質だけを抽出するラボです。",
    tags: ["摩擦レス", "初期条件", "境界"],
    accent: "from-emerald-500/30 via-lime-500/10 to-transparent",
    status: "体験可能",
  },
] as const;

const pathways = [
  {
    title: "気になる現象だけを選択",
    body: "各テーマは独立したショーケース。連続クイズではなく、興味を惹かれた瞬間に飛び込み、すぐにブラウザで挙動を確かめられます。",
  },
  {
    title: "シミュレーションで“面白さ”を共有",
    body: "Matter.js を軸にした物理シミュレーションで、式よりもまず動きから驚きを掴む設計。設定値の変化が視覚的に伝わります。",
  },
  {
    title: "モダンな物理美術館のように",
    body: "ダークトーンとグラデーションを基調にしつつ、アクセントカラーで物理量を想起させる UI を構築。",
  },
] as const;

const heroStats = [
  { label: "公開中テーマ", value: "3", hint: "毎週追加予定" },
  { label: "平均滞在", value: "4.7min", hint: "1セッション" },
  { label: "調整可能パラメータ", value: "12", hint: "重力/摩擦/密度など" },
] as const;

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(45,212,191,0.18),_transparent_40%)]" />
        <div className="absolute inset-y-0 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent md:block" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-20 px-6 py-16 md:px-10 lg:py-24">
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
            <div className="grid gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-300">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-400">{stat.hint}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-[0_20px_80px_rgba(6,182,212,0.2)] backdrop-blur">
            <p className="text-sm font-semibold text-cyan-200">Concept Log</p>
            <div className="mt-6 space-y-6">
              {pathways.map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
            <Link
              href="/antigravity"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-white"
            >
              今日のおすすめ: 逆重力ピンボール →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {experiments.map((experiment) => (
              <Link
                key={experiment.slug}
                href={experiment.slug}
                className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/40"
              >
                <div
                  className={`pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-br ${experiment.accent}`}
                />
                <div className="relative flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.5em] text-slate-400">
                    {experiment.code}
                  </p>
                  <span className="text-xs text-cyan-200">
                    {experiment.status}
                  </span>
                </div>
                <h3 className="relative mt-4 text-2xl font-semibold text-white">
                  {experiment.title}
                </h3>
                <p className="relative mt-3 text-sm text-slate-200">
                  {experiment.description}
                </p>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {experiment.tags.map((tag) => (
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
                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
