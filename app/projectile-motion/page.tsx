import ProjectileMotion from "./components/ProjectileMotion";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(110,231,183,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10">
        <ProjectileMotion title="物理シミュレーター - 投射運動と放物線" />
      </div>
    </main>
  );
}
