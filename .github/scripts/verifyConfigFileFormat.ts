const fs = require("fs/promises");
const path = require("path");
const zod = require("zod");
const yaml = require("js-yaml");
const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);
const { z } = zod;

// Define your Zod schemas as before
const ProjectConfigSchema = z.object({
  name: z.string(),
  iconOption: z.string().url().optional(),
  appLink: z.string().url().optional(),
});

const TaskConfigSchema = z.object({
  name: z.string(),
  link: z.string().url(),
  iconOption: z.string().url(),
  actionPluginId: z.string(),
});

const PluginConfigSchema = z.object({
  project: ProjectConfigSchema,
  task: TaskConfigSchema,
});

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

async function validateNewPackagePaths(
  newPackagesPaths: string[],
): Promise<string[]> {
  const newPackageDirs = newPackagesPaths.filter((path: string) =>
    /packages\/[^\/]+\/?$/.test(path),
  ); // Adjust regex as needed

  const validDetailsPaths: string[] = [];

  for (const packageDir of newPackageDirs) {
    const detailsPath = path.join(packageDir, "plugin-details.yml");
    try {
      await fs.access(detailsPath);
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

async function validateConfigFile(filePath: string): Promise<void> {
  try {
    const configFileContent = await fs.readFile(filePath, "utf8");
    const config = yaml.load(configFileContent); // Changed to use yaml.load for YAML content
    PluginConfigSchema.parse(config);
    console.log(`Config in ${filePath} is valid.`);
  } catch (error) {
    console.error(`Error validating config in ${filePath}:`, error);
    process.exit(1);
  }
}

async function main() {
  const newPackagesPaths = await getNewPackages();
  if (newPackagesPaths.length) {
    const paths = await validateNewPackagePaths(newPackagesPaths);
    for (const path of paths) {
      await validateConfigFile(path);
    }
  } else {
    console.log("No new packages found.");
  }
}

main();
