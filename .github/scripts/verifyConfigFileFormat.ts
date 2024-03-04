const axios = require("axios");
const fs = require("fs/promises");
const zod = require("zod");
const yaml = require("js-yaml");
const utils = require("./utils");
const { z } = zod;

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
  tasks: z.array(TaskConfigSchema).nonempty(),
});

async function validateConfigFile(filePath: string): Promise<void> {
  try {
    const configFileContent = await fs.readFile(filePath, "utf8");
    const config = yaml.load(configFileContent);
    PluginConfigSchema.parse(config);
    const { project, tasks } = config;

    for (const task of tasks) {
      // validate each unique icon option url
      const uniqueIconOptions = new Set(
        [project.iconOption, task.iconOption].filter(Boolean),
      );
      for (const iconOption of uniqueIconOptions) {
        await validateIcon(iconOption);
      }
    }
    console.log(`Config in ${filePath} is valid.`);
  } catch (error) {
    console.error(`Error validating config in ${filePath}:`, error);
    process.exit(1);
  }
}

async function validateIcon(iconUrl: string) {
  const response = await axios.post(
    "https://api.boost.xyz/plugins/validate-icon",
    {
      iconOption: iconUrl,
    },
  );
  if (response.status === 200) {
    console.log("Icon is valid:", iconUrl);
  } else {
    throw new Error(`Icon validation failed for ${iconUrl}`);
  }
}

async function main() {
  const newPackagesPaths = await utils.getNewPackages();
  const updatedDetailsPaths = await utils.getUpdatedPluginDetailsPaths();
  const uniqueDetailsPaths = Array.from(
    new Set([...newPackagesPaths, ...updatedDetailsPaths]),
  );
  if (uniqueDetailsPaths.length) {
    const paths = await utils.validatePluginDetailsPaths(uniqueDetailsPaths);
    for (const path of paths) {
      await validateConfigFile(path);
    }
  } else {
    console.log("No new packages found.");
  }
}

main();
