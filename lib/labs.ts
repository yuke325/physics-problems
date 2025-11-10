import { promises as fs } from "node:fs";
import path from "node:path";

const CONFIG_MODULE_BASENAME = "lab.config";

export type LabSummary = {
  slug: string;
  code: string;
  title: string;
  description: string;
  tags: readonly string[];
  accent: string;
  status: string;
  order: number;
  explanation?: string; // 追加
};

export type LabConfig = Partial<Omit<LabSummary, "slug" | "order" | "title" | "description" | "explanation">> & {
  slug?: string;
  order?: number;
  title: string;
  description: string;
  explanation: string;
};

type LabConfigModule = {
  labConfig?: LabConfig;
  default?: LabConfig;
};

export async function getLabSummaries(): Promise<readonly LabSummary[]> {
  const appDir = path.join(process.cwd(), "app");
  const entries = await fs.readdir(appDir, { withFileTypes: true });

  const labs: LabSummary[] = [];

  await Promise.all(
    entries.map(async (entry) => {
      if (!entry.isDirectory()) return;
      if (entry.name.startsWith("_")) return;

      const config = await loadLabConfig(entry.name);
      if (!config) return;

      labs.push({
        slug: config.slug ?? `/${entry.name}`,
        code: config.code ?? entry.name.toUpperCase(),
        title: config.title ?? entry.name,
        description: config.description ?? "",
        tags: config.tags ?? [],
        accent:
          config.accent ?? "from-slate-500/20 via-slate-700/10 to-transparent",
        status: config.status ?? "準備中",
        order: config.order ?? Number.MAX_SAFE_INTEGER,
      });
    }),
  );

  return labs.sort((a, b) => a.order - b.order);
}

async function loadLabConfig(directoryName: string): Promise<LabConfig | null> {
  try {
    const module = (await import(
      `@/app/${directoryName}/${CONFIG_MODULE_BASENAME}`
    )) as LabConfigModule;

    return module.labConfig ?? module.default ?? null;
  } catch (_error) {
    // configが存在しない場合はnullを返す
    return null;
  }
}
