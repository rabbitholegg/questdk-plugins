import {
  fetchERC721Media,
  fetchERC721Metadata,
  fetchERC721MetadataByUUID,
} from '../tokens/erc721.js'
import {
  fetchERC1155Media,
  fetchERC1155Metadata,
  fetchERC1155MetadataByUUID,
} from '../tokens/erc1155.js'
import { type PublicClient, createClient, http } from 'viem'
/**
 * Initializes an Ethereum client with the specified RPC URL and provides methods for ERC721 and ERC1155 token interactions.
 * @param {string} rpcUrl - The RPC URL for connecting to the Ethereum network.
 * @returns An object with methods for fetching token metadata and media.
 */
function createEthereumClient(rpcUrl: string) {
  const client = createClient({
    transport: http(rpcUrl),
  }) as PublicClient

  return {
    fetchERC721Metadata: (contractAddress: string, tokenId: number) =>
      fetchERC721Metadata(client, contractAddress, tokenId),
    fetchERC721Media: (contractAddress: string, tokenId: number) =>
      fetchERC721Media(client, contractAddress, tokenId),
    fetchERC1155Metadata: (contractAddress: string, tokenId: number) =>
      fetchERC1155Metadata(client, contractAddress, tokenId),
    fetchERC1155Media: (contractAddress: string, tokenId: number) =>
      fetchERC1155Media(client, contractAddress, tokenId),
    fetchERC721MetadataByUUID: (uuid: string) =>
      fetchERC721MetadataByUUID(client, uuid),
    fetchERC1155MetadataByUUID: (uuid: string) =>
      fetchERC1155MetadataByUUID(client, uuid),
  }
}

export default createEthereumClient
