import {
  type QuestActionParamsByType,
  type QuestDetails,
} from '@rabbitholegg/questdk-plugin-utils'
import axios from 'axios'
/**
 * Fetches quest data from RabbitHole API and extracts action parameters.
 * @param {string} uuid The UUID of the quest.
 * @returns {Promise<any>} The action parameters extracted from the quest data.
 */
export async function fetchQuestActionParams(
  uuid: string,
): Promise<QuestActionParamsByType> {
  const quest = await fetchQuestByUUID(uuid)
  if (!quest.actionParams)
    throw new Error('Quest does not have action parameters')
  return quest.actionParams
}

export async function fetchQuestByUUID(uuid: string): Promise<QuestDetails> {
  const endpoint = `https://api.boost.xyz/boosts/${uuid}`
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching quest data:', error)
    throw new Error('Failed to fetch quest data')
  }
}

export default fetchQuestActionParams
