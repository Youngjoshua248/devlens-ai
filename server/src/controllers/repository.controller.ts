import { Request, Response } from "express";
import path from "path";
import { parseGithubUrl } from "../services/repository.service";
import { RepositoryScanner } from "../scanner/RepositoryScanner";

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
  const scanner = new RepositoryScanner();

  // Scan only the server/src folder for now
  const repoPath = path.resolve(process.cwd(), "src");

  const result = scanner.scan(repoPath);

  return res.status(200).json({
    message: "Repository scanned successfully.",
    scannedPath: repoPath,
    result,
  });
}
