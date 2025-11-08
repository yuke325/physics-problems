import PendulumMotion from "./components/PendulumMotion";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10">
        <PendulumMotion title="物理シミュレーター - 単振り子と周期運動" />
      </div>
    </main>
  );
}
