import axios from 'axios'

/**
 * Fetches quest data from RabbitHole API and extracts action parameters.
 * @param {string} uuid The UUID of the quest.
 * @returns {Promise<any>} The action parameters extracted from the quest data.
 */
export async function fetchQuestActionParams(uuid: string): Promise<any> {
  const endpoint = `https://api.rabbithole.gg/v1.2/quest/public/${uuid}`

  try {
    const response = await axios.get(endpoint)
    const actionParams = response.data.actionParams
    return actionParams
  } catch (error) {
    console.error('Error fetching quest data:', error)
    throw new Error('Failed to fetch quest data')
  }
}

export default fetchQuestActionParams
