export type DependencyNode = {
  file: string;
  imports: string[];
};

export class DependencyGraph {
  build(parsedFiles: { path: string; imports: string[] }[]) {
    return parsedFiles.map((file) => ({
      file: file.path,
      imports: file.imports,
    }));
  }
}
