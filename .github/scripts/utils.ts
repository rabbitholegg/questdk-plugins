const path = require("path");
const { exec } = require("child_process");
const file = require("fs/promises");
const { promisify } = require("util");

const execAsync = promisify(exec);

async function getNewPackages(): Promise<string[]> {
  const { stdout, stderr } = await execAsync(
    "git diff --diff-filter=A --name-only main...HEAD packages/",
  );
  if (stderr) {
    throw new Error(`Error getting new packages: ${stderr}`);
  }

  // Split the output into lines, trim whitespace, and filter out empty lines
  const changedFiles = stdout
    .split("\n")
    .filter((path: string) => path.trim() !== "")
    .map((path: string) => path.trim());

  // Extract unique package directories
  const newPackageDirs = new Set<string>();
  changedFiles.forEach((file: string) => {
    // This regex matches 'packages/PackageName/' from the file path
    const match = file.match(/^(packages\/[^\/]+)\//);
    if (match) {
      newPackageDirs.add(match[1]);
    }
  });

  return Array.from(newPackageDirs);
}

async function validatePluginDetailsPaths(
  newPackagesPaths: string[],
): Promise<string[]> {
  const validDetailsPaths: string[] = [];

  for (const packageDir of newPackagesPaths) {
    const detailsPath = path.join(packageDir, "plugin-details.yml");
    try {
      await file.access(detailsPath);
      console.log(`Valid: ${detailsPath} exists.`);
      validDetailsPaths.push(detailsPath);
    } catch (error) {
      throw new Error(
        `Missing plugin-details.yml in new package: ${packageDir}`,
      );
    }
  }
  return validDetailsPaths;
}

module.exports = {
  getNewPackages,
  validatePluginDetailsPaths,
};
