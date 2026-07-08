import { Request, Response } from "express";
import path from "path";
import { parseGithubUrl } from "../services/repository.service";
import { RepositoryScanner } from "../scanner/RepositoryScanner";
import { ProjectAnalyzer } from "../analyzer/ProjectAnalyzer";

const repositories: {
  id: number;
  githubUrl: string;
  owner: string;
  repo: string;
  fullName: string;
  status: string;
  createdAt: string;
}[] = [];

export function createRepository(req: Request, res: Response) {
  try {
    const { githubUrl } = req.body;

    if (!githubUrl) {
      return res.status(400).json({
        message: "GitHub URL is required.",
      });
    }

    const parsed = parseGithubUrl(githubUrl);

    const repository = {
      id: repositories.length + 1,
      githubUrl,
      owner: parsed.owner,
      repo: parsed.repo,
      fullName: parsed.fullName,
      status: "queued",
      createdAt: new Date().toISOString(),
    };

    repositories.push(repository);

    return res.status(201).json({
      message: "Repository queued for analysis.",
      repository,
    });
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid request.",
    });
  }
}

export function getRepositories(_req: Request, res: Response) {
  return res.status(200).json({
    repositories,
  });
}

export function scanLocalRepository(_req: Request, res: Response) {
  console.log("🚀 Scan endpoint called");

  const scanner = new RepositoryScanner();
  const repoPath = path.resolve(process.cwd(), "src");

  console.log("📁 Repository path:", repoPath);

  const result = scanner.scan(repoPath);

  console.log("✅ Repository scan completed!");

  return res.status(200).json({
    message: "Repository scanned successfully.",
    scannedPath: repoPath,
    result,
  });
}

export function summarizeLocalRepository(_req: Request, res: Response) {
  console.log("📊 Summary endpoint called");

  const scanner = new RepositoryScanner();
  const analyzer = new ProjectAnalyzer();

  const repoPath = path.resolve(process.cwd(), "src");

  console.log("📁 Repository path:", repoPath);

  const scanResult = scanner.scan(repoPath);

  console.log("✅ Scan completed");

  const summary = analyzer.summarize(scanResult);

  console.log("🧠 Summary generated");

  const dashboard = analyzer.createDashboardSummary(summary);

  console.log("🎯 Dashboard summary generated");

  return res.status(200).json({
    message: "Repository dashboard summary generated successfully.",
    scannedPath: repoPath,
    dashboard,
    rawSummary: summary,
  });
}
