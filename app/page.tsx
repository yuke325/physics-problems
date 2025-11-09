import { ExperimentsSection } from "@/components/home/ExperimentsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { getLabSummaries } from "@/lib/labs";
import { pathways } from "@/lib/pathways";

export default async function Home() {
  const labs = await getLabSummaries();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.18),transparent_40%)]" />
        <div className="absolute inset-y-0 left-1/2 hidden w-px bg-linear-to-b from-transparent via-cyan-400/40 to-transparent md:block" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-20 px-6 py-16 md:px-10 lg:py-24">
        <HeroSection pathways={pathways} />
        <ExperimentsSection labs={labs} />
      </main>
    </div>
  );
}
