import RollingMaterial from "./components/RollingMaterial";
import labConfig from "./lab.config"; // lab.configをインポート

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10">
        <RollingMaterial
          title={labConfig.title ?? "タイトルがありません"}
          description={labConfig.description ?? "実験の説明がありません"}
          explanation={labConfig.explanation ?? "解説がありません"}
        />
      </div>
    </main>
  );
}
