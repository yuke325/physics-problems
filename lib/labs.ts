import { promises as fs } from "node:fs";
import path from "node:path";

const CONFIG_FILENAME = "lab.config.json";

export type LabSummary = {
  slug: string;
  code: string;
  title: string;
  description: string;
  tags: readonly string[];
  accent: string;
  status: string;
  order: number;
};

type LabConfigFile = Partial<Omit<LabSummary, "slug" | "order">> & {
  slug?: string;
  order?: number;
};

export async function getLabSummaries(): Promise<readonly LabSummary[]> {
  const appDir = path.join(process.cwd(), "app");
  const entries = await fs.readdir(appDir, { withFileTypes: true });

  const labs: LabSummary[] = [];

  await Promise.all(
    entries.map(async (entry) => {
      if (!entry.isDirectory()) return;
      if (entry.name.startsWith("_")) return;

      const configPath = path.join(appDir, entry.name, CONFIG_FILENAME);

      try {
        const raw = await fs.readFile(configPath, "utf8");
        const parsed = JSON.parse(raw) as LabConfigFile;

        labs.push({
          slug: parsed.slug ?? `/${entry.name}`,
          code: parsed.code ?? entry.name.toUpperCase(),
          title: parsed.title ?? entry.name,
          description: parsed.description ?? "",
          tags: parsed.tags ?? [],
          accent:
            parsed.accent ??
            "from-slate-500/20 via-slate-700/10 to-transparent",
          status: parsed.status ?? "準備中",
          order: parsed.order ?? Number.MAX_SAFE_INTEGER,
        });
      } catch (_error) {
        // configが存在しない場合は無視
      }
    }),
  );

  return labs.sort((a, b) => a.order - b.order);
}
