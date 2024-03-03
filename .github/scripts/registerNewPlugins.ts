const _axios = require("axios");
const _fs = require("fs/promises");
const _yaml = require("js-yaml");
const _utils = require("./utils");

async function sendPluginDetailsToAPI(detailsPath: string): Promise<void> {
  const fileContents = await _fs.readFile(detailsPath, "utf8");
  const details = _yaml.load(fileContents);
  const { project, task } = details;

  // send details to staging API
  const { data: stagingData } = await _axios.post(
    "https://api-staging.boost.xyz/plugins/add-project",
    {
      ...project,
      approvedForTerminal: true,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.BOOST_API_TOKEN}`,
      },
    },
  );
  await _axios.post(
    "https://api-staging.boost.xyz/plugins/add-task",
    {
      ...task,
      projectId: stagingData.projectId,
      approvedForTerminal: true,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.BOOST_API_TOKEN}`,
      },
    },
  );

  // send details to production API
  const { data } = await _axios.post(
    "https://api.boost.xyz/plugins/add-project",
    project,
    {
      headers: {
        Authorization: `Bearer ${process.env.BOOST_API_TOKEN}`,
      },
    },
  );
  await _axios.post(
    "https://api.boost.xyz/plugins/add-task",
    {
      ...task,
      projectId: data.projectId,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.BOOST_API_TOKEN}`,
      },
    },
  );

  console.log(`Successfully registered plugin details for ${project.name}`);
}

async function _main() {
  const newPackagesPaths = await _utils.getNewPackages();
  const updatedDetailsPaths = await _utils.getUpdatedPluginDetailsPaths();
  const uniqueDetailsPaths = Array.from(
    new Set([...newPackagesPaths, ...updatedDetailsPaths]),
  );
  if (uniqueDetailsPaths.length) {
    const validDetailsPaths = await _utils.validatePluginDetailsPaths(
      uniqueDetailsPaths,
    );
    for (const detailsPath of validDetailsPaths) {
      await sendPluginDetailsToAPI(detailsPath);
    }
  } else {
    console.log("No new packages found.");
  }
}

_main().catch((error) => {
  throw new Error(`Error registering plugin details: ${error}`);
});
