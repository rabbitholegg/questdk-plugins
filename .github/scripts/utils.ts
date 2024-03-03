const path = require("path");
const { exec } = require("child_process");
const file = require("fs/promises");
const { promisify } = require("util");

const execAsync = promisify(exec);

async function getNewPackages(): Promise<string[]> {
  // Get list of all directories in packages/ on main
  const { stdout: mainDirs } = await execAsync(
    "git ls-tree -d --name-only main:packages/",
  );
  const mainPackagesSet = new Set(
    mainDirs.split("\n").filter((name: string) => name.trim() !== ""),
  );

  // Get list of all directories in packages/ in the current HEAD
  const { stdout: headDirs } = await execAsync(
    "git ls-tree -d --name-only HEAD:packages/",
  );
  const headPackages = headDirs
    .split("\n")
    .filter((name: string) => name.trim() !== "");

  // Filter out directories that are also present on main
  const newPackageDirs = headPackages
    .filter((pkg: string) => !mainPackagesSet.has(pkg))
    .map((pkg: string) => path.join("packages", pkg));

  return newPackageDirs;
}

async function getUpdatedPluginDetailsPaths(): Promise<string[]> {
  const { stdout, stderr } = await execAsync(
    "git diff --diff-filter=AM --name-only main...HEAD packages/",
  );
  if (stderr) {
    throw new Error(`Error getting updated plugin details: ${stderr}`);
  }

  // Filter for changes specifically in plugin-details.yml files and format paths
  const updatedDetailsPaths = stdout
    .split("\n")
    .filter((path: string) => path.trim().endsWith("plugin-details.yml"))
    .map((path: string) => path.replace("/plugin-details.yml", ""));

  return updatedDetailsPaths;
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
      throw new Error(`Missing plugin-details.yml in package: ${packageDir}`);
    }
  }
  return validDetailsPaths;
}

module.exports = {
  getNewPackages,
  getUpdatedPluginDetailsPaths,
  validatePluginDetailsPaths,
};
