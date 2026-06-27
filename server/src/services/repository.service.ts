export function parseGithubUrl(githubUrl: string) {
  const regex = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/?$/;
  const match = githubUrl.match(regex);

  if (!match) {
    throw new Error("Invalid GitHub repository URL.");
  }

  const owner = match[1];
  const repo = match[2].replace(".git", "");

  return {
    owner,
    repo,
    fullName: `${owner}/${repo}`,
  };
}
