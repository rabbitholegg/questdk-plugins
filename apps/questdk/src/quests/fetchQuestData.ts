import axios from 'axios'
import { type QuestActionParamsByType, type QuestDetails } from '@rabbitholegg/questdk-plugin-utils'
/**
 * Fetches quest data from RabbitHole API and extracts action parameters.
 * @param {string} uuid The UUID of the quest.
 * @returns {Promise<any>} The action parameters extracted from the quest data.
 */
export async function fetchQuestActionParams(uuid: string): Promise<QuestActionParamsByType> {
  const quest = await fetchQuestByUUID(uuid)
  if(!quest.actionParams) throw new Error('Quest does not have action parameters')
  return quest.actionParams
}

export async function fetchQuestByUUID(uuid: string): Promise<QuestDetails> {

  const endpoint = `https://api.rabbithole.gg/v1.2/quest/public/${uuid}`
  console.log('Fetching quest data from:', endpoint)
  try {
    const response = await axios.get(endpoint)
    return response.data
  } catch (error) {
    console.error('Error fetching quest data:', error)
    throw new Error('Failed to fetch quest data')
  }
}

export default fetchQuestActionParams
