import { FrameworkDetector } from "./FrameworkDetector";
import { DependencyGraph } from "../graph/DependencyGraph";

type ParsedFile = {
  path: string;
  imports: string[];
  exports: string[];
  functions: string[];
  reactComponents: string[];
  expressRoutes: string[];
};

type ScanResult = {
  totalFiles: number;
  totalFolders: number;
  extensions: Record<string, number>;
  parsedFiles: ParsedFile[];
};

export class ProjectAnalyzer {
  private frameworkDetector = new FrameworkDetector();
  private dependencyGraph = new DependencyGraph();

  summarize(scanResult: ScanResult) {
    const allRoutes = scanResult.parsedFiles.flatMap(
      (file) => file.expressRoutes,
    );

    const allComponents = scanResult.parsedFiles.flatMap(
      (file) => file.reactComponents,
    );

    const allFunctions = scanResult.parsedFiles.flatMap(
      (file) => file.functions,
    );

    const allImports = scanResult.parsedFiles.flatMap((file) => file.imports);

    const baseSummary = {
      overview: {
        totalFiles: scanResult.totalFiles,
        totalFolders: scanResult.totalFolders,
        parsedSourceFiles: scanResult.parsedFiles.length,
      },
      languages: scanResult.extensions,
      detected: {
        expressRoutes: allRoutes,
        reactComponents: allComponents,
        functions: allFunctions,
        topImports: this.getTopImports(allImports),
      },
    };

    return {
      ...baseSummary,
      stack: this.frameworkDetector.detect(baseSummary),
      dependencyGraph: this.dependencyGraph.build(scanResult.parsedFiles),
    };
  }

  createDashboardSummary(summary: any) {
    return {
      projectType: this.detectProjectType(summary),
      language: summary.stack.language,
      frontend: summary.stack.frontend,
      backend: summary.stack.backend,
      database: summary.stack.database,
      ai: summary.stack.ai,
      packageManager: summary.stack.packageManager,
      stats: {
        files: summary.overview.totalFiles,
        folders: summary.overview.totalFolders,
        sourceFiles: summary.overview.parsedSourceFiles,
        routes: summary.detected.expressRoutes.length,
        components: summary.detected.reactComponents.length,
        functions: summary.detected.functions.length,
        dependencies: summary.dependencyGraph.length,
      },
      highlights: {
        expressRoutes: summary.detected.expressRoutes,
        reactComponents: summary.detected.reactComponents,
        topImports: summary.detected.topImports,
      },
    };
  }

  private detectProjectType(summary: any) {
    if (summary.stack.frontend && summary.stack.backend) {
      return "Full-Stack App";
    }

    if (summary.stack.frontend) return "Frontend App";
    if (summary.stack.backend) return "Backend API";

    return "Unknown Project";
  }

  private getTopImports(imports: string[]) {
    return Object.entries(
      imports.reduce<Record<string, number>>((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {}),
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({
        name,
        count,
      }));
  }
}
