async function sendPluginDetailsToAPI(detailsPath: string): Promise<void> {
  try {
    const fileContents = await fs.readFile(detailsPath, "utf8");
    const details = yaml.load(fileContents);

    const { project, task } = details;

    // send details to staging API
    const stagingApiUrl = process.env.STAGING_API_URL;
    const { projectId: stagingProjectId } = await axios.post(`${stagingApiUrl}/plugins/add-project`, {
      ...project,
      approvedForTerminal: true,
    });
    await axios.post(`${stagingApiUrl}/plugins/add-task`, { 
      ...task,
      projectId: stagingProjectId, 
      approvedForTerminal: true 
    });

    // send details to production API
    const productionApiUrl = process.env.PRODUCTION_API_URL;
    const { projectId } = await axios.post(`${productionApiUrl}/plugins/add-project`, project);
    await axios.post(`${productionApiUrl}/plugins/add-task`, { 
      ...task,
      projectId,
    });
  } catch (error) {
    throw new Error(`Error sending plugin details to API: ${error}`);
  }
}
