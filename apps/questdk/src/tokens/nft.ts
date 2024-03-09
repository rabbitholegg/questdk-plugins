import { type Address, type PublicClient, zeroAddress } from 'viem'
import { fetchERC1155Metadata } from './erc1155'
import { fetchERC721Metadata } from './erc721'
import fetchQuestActionParams from '../quests/fetchQuestData.js'

export async function fetchTokenMetadata(
  client: PublicClient,
  contractAddress: string,
  tokenId: number,
): Promise<any> {
  try {
    // Try to call the ERC721 balanceOf function
    await client.readContract({
      address: contractAddress as Address,
      abi: [
        'function balanceOf(address owner) external view returns (uint256)',
      ],
      functionName: 'balanceOf',
      args: [zeroAddress],
    })

    // If the call succeeds, it's an ERC721 contract
    return fetchERC721Metadata(client, contractAddress, tokenId)
  } catch (error) {
    // If the call fails, try to call the ERC1155 balanceOf function
    await client.readContract({
      address: contractAddress as Address,
      abi: [
        'function balanceOf(address account, uint256 id) external view returns (uint256)',
      ],
      functionName: 'balanceOf',
      args: [zeroAddress, tokenId],
    })

    // If this call succeeds, it's an ERC1155 contract
    return fetchERC1155Metadata(client, contractAddress, tokenId)
  }
}

/**
 * Fetches token metadata using quest UUID from RabbitHole.
 * @param {any} client The Viem client instance.
 * @param {string} uuid The UUID of the quest.
 * @returns {Promise<any>} The metadata of the token associated with the quest.
 */
export async function fetchTokenMetadataByUUID(
  client: PublicClient,
  uuid: string,
): Promise<any> {
  const actionParams = await fetchQuestActionParams(uuid)
  if (actionParams.type !== 'mint') {
    throw new Error('Quest action is not of type mint')
  }
  const contractAddress = actionParams.data.contractAddress
  const tokenId = actionParams.data.tokenId
  if (!contractAddress || !tokenId) {
    throw new Error('Invalid mint action params')
  }
  return fetchTokenMetadata(client, contractAddress, tokenId)
}
