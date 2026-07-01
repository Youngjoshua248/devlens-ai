import fs from "fs";
import path from "path";
import { IGNORE_DIRS, IGNORE_FILES } from "./IgnorePatterns";

type ScanResult = {
  totalFiles: number;
  totalFolders: number;
  extensions: Record<string, number>;
};

export class RepositoryScanner {
  scan(repoPath: string): ScanResult {
    const result: ScanResult = {
      totalFiles: 0,
      totalFolders: 0,
      extensions: {},
    };

    this.walk(repoPath, result);

    return result;
  }

  private walk(currentPath: string, result: ScanResult) {
    let entries: fs.Dirent[];

    try {
      entries = fs.readdirSync(currentPath, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (entry.isSymbolicLink()) continue;

      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        if (IGNORE_DIRS.has(entry.name)) continue;

        result.totalFolders += 1;
        this.walk(fullPath, result);
        continue;
      }

      if (entry.isFile()) {
        if (IGNORE_FILES.has(entry.name)) continue;

        result.totalFiles += 1;

        const ext = path.extname(entry.name) || "no_extension";
        result.extensions[ext] = (result.extensions[ext] || 0) + 1;
      }
    }
  }
}
