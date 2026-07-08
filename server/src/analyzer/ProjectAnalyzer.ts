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

    return {
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
      .map(([name, count]) => ({ name, count }));
  }
}
