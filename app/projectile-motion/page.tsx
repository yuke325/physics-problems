import ProjectileMotion from "./components/ProjectileMotion";
import labConfig from "./lab.config"; // lab.configをインポート

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(110,231,183,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10">
        <ProjectileMotion
          title={labConfig.title ?? "タイトルがありません"}
          description={labConfig.description ?? "実験の説明がありません"}
          explanation={labConfig.explanation ?? "解説がありません"}
        />
      </div>
    </main>
  );
}
