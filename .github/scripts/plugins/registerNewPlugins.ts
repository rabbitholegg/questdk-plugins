const _axios = require("axios");
const _fs = require("fs/promises");
const _yaml = require("js-yaml");
const _utils = require("./utils");

async function sendPluginDetailsToAPI(detailsPath: string): Promise<void> {
  try {
    const fileContents = await _fs.readFile(detailsPath, "utf8");
    const details = _yaml.load(fileContents);


    const { project, task } = details;

    // send details to staging API
    const stagingApiUrl = process.env.STAGING_API_URL;
    const { projectId: stagingProjectId } = await _axios.post(`${stagingApiUrl}/plugins/add-project`, {
      ...project,
      approvedForTerminal: true,
    });
    await _axios.post(`${stagingApiUrl}/plugins/add-task`, { 
      ...task,
      projectId: stagingProjectId, 
      approvedForTerminal: true 
    });

    // send details to production API
    const productionApiUrl = process.env.PRODUCTION_API_URL;
    const { projectId } = await _axios.post(`${productionApiUrl}/plugins/add-project`, project);
    await _axios.post(`${productionApiUrl}/plugins/add-task`, { 
      ...task,
      projectId,
    });
  } catch (error) {
    console.error(error.data);
    throw new Error(`Error sending plugin details to API: ${error}`);
  }
}

async function _main() {
  try {
    const newPackagesPaths = await _utils.getNewPackages();
    const validDetailsPaths = await _utils.validateNewPackagePaths(newPackagesPaths);
    for (const detailsPath of validDetailsPaths) {
      await sendPluginDetailsToAPI(detailsPath);
    }
  } catch (error) {
    console.error("Error registering new plugins:", error);
    process.exit(1);
  }
}

_main();
