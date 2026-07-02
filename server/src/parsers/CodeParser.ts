import fs from "fs";

export type ParsedCodeFile = {
  path: string;
  imports: string[];
  exports: string[];
  functions: string[];
  reactComponents: string[];
  expressRoutes: string[];
};

export class CodeParser {
  parseFile(filePath: string): ParsedCodeFile {
    const content = fs.readFileSync(filePath, "utf8");

    return {
      path: filePath,
      imports: this.extractImports(content),
      exports: this.extractExports(content),
      functions: this.extractFunctions(content),
      reactComponents: this.extractReactComponents(content),
      expressRoutes: this.extractExpressRoutes(content),
    };
  }

  private extractImports(content: string): string[] {
    return [...content.matchAll(/import\s+.*?from\s+["'](.+?)["']/g)].map(
      (match) => match[1],
    );
  }

  private extractExports(content: string): string[] {
    return [
      ...content.matchAll(
        /export\s+(?:default\s+)?(?:function|class|const|let|var)\s+(\w+)/g,
      ),
    ].map((match) => match[1]);
  }

  private extractFunctions(content: string): string[] {
    return [...content.matchAll(/function\s+(\w+)\s*\(/g)].map(
      (match) => match[1],
    );
  }

  private extractReactComponents(content: string): string[] {
    return [...content.matchAll(/(?:function|const)\s+([A-Z]\w+)/g)].map(
      (match) => match[1],
    );
  }

  private extractExpressRoutes(content: string): string[] {
    return [
      ...content.matchAll(
        /router\.(get|post|put|patch|delete)\(["'](.+?)["']/g,
      ),
    ].map((match) => `${match[1].toUpperCase()} ${match[2]}`);
  }
}
