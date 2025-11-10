import { promises as fs } from "node:fs";
import path from "node:path";
import type { LabConfig, LabSummary } from "./types";

const CONFIG_MODULE_BASENAME = "lab.config";

interface LabConfigModule {
  labConfig?: LabConfig;
  default?: LabConfig;
}

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

      //  NOTE: codeとorderは自動で決めれるようにしてもいいかも
      //  code: `EX-$(order)`
      //  みたいな
      labs.push({
        slug: `/${entry.name}`,
        code: config.code,
        title: config.title,
        description: config.description,
        explanation: config.explanation,
        tags: config.tags,
        order: config.order,
        accent:
          config.accent ?? "from-slate-500/20 via-slate-700/10 to-transparent",
        status: config.status ?? "準備中",
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
