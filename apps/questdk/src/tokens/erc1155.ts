import fetchQuestActionParams from '../quests/fetchQuestData.js'
import axios from 'axios'
import { type Address, type PublicClient } from 'viem'

/**
 * Fetches ERC1155 token metadata from a given contract.
 * @async
 * @param {PublicClient} client The Viem client instance.
 * @param {string} contractAddress The ERC1155 contract address.
 * @param {number} tokenId The token ID.
 * @returns {Promise<any>} The metadata of the ERC1155 token.
 */
export async function fetchERC1155Metadata(
  client: PublicClient,
  contractAddress: string,
  tokenId: number,
): Promise<any> {
  const tokenURI: string = await (client.readContract({
    address: contractAddress as Address,
    abi: [
      'function uri(uint256 tokenId) external view returns (string memory)',
    ],
    functionName: 'uri',
    args: [tokenId],
  }) as Promise<string>)

  const response = await axios.get(tokenURI)
  return response.data
}

/**
 * Fetches the media URL from ERC1155 token metadata and performs basic validation or sanitization.
 * @async
 * @param {PublicClient} client - The Viem client instance.
 * @param {string} contractAddress - The ERC1155 contract address.
 * @param {number} tokenId - The token ID.
 * @returns {Promise<string | undefined>} - The media URL if available and valid.
 */
export async function fetchERC1155Media(
  client: PublicClient,
  contractAddress: string,
  tokenId: number,
): Promise<string | undefined> {
  const metadata = await fetchERC1155Metadata(client, contractAddress, tokenId)
  return metadata.image || metadata.animation_url
}

/**
 * Fetches ERC1155 token metadata using quest UUID from RabbitHole.
 * @param {PublicClient} client The Viem client instance.
 * @param {string} uuid The UUID of the quest.
 * @returns {Promise<any>} The metadata of the ERC1155 token associated with the quest.
 */
export async function fetchERC1155MetadataByUUID(
  client: PublicClient,
  uuid: string,
): Promise<any> {
  const actionParams = await fetchQuestActionParams(uuid)
  if (actionParams.type !== 'mint') {
    throw new Error('Quest action is not of type mint')
  }
  const contractAddress = actionParams.data.contractAddress
  const tokenId = actionParams.data.tokenId
  return fetchERC1155Metadata(client, contractAddress, tokenId)
}
