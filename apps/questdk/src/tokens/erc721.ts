import fetchQuestActionParams from '../quests/fetchQuestData'
import axios from 'axios'
import { type Address, type PublicClient } from 'viem'

/**
 * Fetches ERC721 token metadata from a given contract.
 * @async
 * @param {any} client The Viem client instance.
 * @param {string} contractAddress The ERC721 contract address.
 * @param {number} tokenId The token ID.
 * @returns {Promise<any>} The metadata of the ERC721 token.
 */
export async function fetchERC721Metadata(
  client: PublicClient,
  contractAddress: string,
  tokenId: number,
): Promise<any> {
  let tokenURI: string = await (client.readContract({
    address: contractAddress as Address,
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'tokenURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'tokenURI',
    args: [BigInt(tokenId)],
  }) as Promise<string>)

  if (tokenURI.startsWith('ipfs://')) {
    const ipfsIdentifier = tokenURI.split('/').slice(2).join('/')
    tokenURI = `https://ipfs.io/ipfs/${ipfsIdentifier}`
  }
  const response = await axios.get(tokenURI)
  return response.data
}

/**
 * Fetches the media URL from ERC721 token metadata and performs basic validation or sanitization.
 * @async
 * @param {any} client - The Viem client instance.
 * @param {string} contractAddress - The ERC721 contract address.
 * @param {number} tokenId - The token ID.
 * @returns {Promise<string | undefined>} - The media URL if available and valid.
 */
export async function fetchERC721Media(
  client: PublicClient,
  contractAddress: string,
  tokenId: number,
): Promise<string | undefined> {
  const metadata = await fetchERC721Metadata(client, contractAddress, tokenId)
  // Here, you'd add logic to sanitize or validate the URL?
  return metadata.image || metadata.animation_url
}

/**
 * Fetches ERC721 token metadata using quest UUID from RabbitHole.
 * @param {any} client The Viem client instance.
 * @param {string} uuid The UUID of the quest.
 * @returns {Promise<any>} The metadata of the ERC721 token associated with the quest.
 */
export async function fetchERC721MetadataByUUID(
  client: any,
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
  return fetchERC721Metadata(client, contractAddress, tokenId)
}
