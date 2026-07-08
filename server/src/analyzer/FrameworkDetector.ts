type SummaryInput = {
  languages: Record<string, number>;
  detected: {
    topImports: {
      name: string;
      count: number;
    }[];
  };
};

export class FrameworkDetector {
  detect(summary: SummaryInput) {
    const imports = summary.detected.topImports.map((item) => item.name);

    return {
      language: this.detectLanguage(summary.languages),
      frontend: this.hasImport(imports, "react") ? "React" : null,
      backend: this.hasImport(imports, "express") ? "Express" : null,
      database: this.hasAnyImport(imports, ["pg", "knex"])
        ? "PostgreSQL/Knex"
        : null,
      ai: this.hasImport(imports, "openai") ? "OpenAI" : null,
      packageManager: "npm",
    };
  }

  private detectLanguage(languages: Record<string, number>) {
    if (languages[".ts"] || languages[".tsx"]) return "TypeScript";
    if (languages[".js"] || languages[".jsx"]) return "JavaScript";
    return "Unknown";
  }

  private hasImport(imports: string[], target: string) {
    return imports.includes(target);
  }

  private hasAnyImport(imports: string[], targets: string[]) {
    return targets.some((target) => imports.includes(target));
  }
}
