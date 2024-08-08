import { chainIdToViemChain } from '@rabbitholegg/questdk-plugin-utils'
import { FUNCTION_SELECTORS, ZORA_MINTER_ABI_1155 } from './abi'
import {
  type Address,
  PublicClient,
  createPublicClient,
  http,
  keccak256,
  stringToBytes,
  toHex,
  fromHex,
  pad,
} from 'viem'

/**
 * Checks if the bytecode of the implementation contract contains the correct function selectors.
 * This ensures we are interacting with the correct contract.
 *
 * @param client - The PublicClient used to interact with the blockchain.
 * @param contractAddress - The address of the proxy contract.
 * @throws {Error} If none of the specified function selectors are present in the contract bytecode.
 */
export const checkBytecode = async (
  client: PublicClient,
  contractAddress: Address,
) => {
  // find implementation address for EIP-1967 proxy
  const slot = keccak256(stringToBytes('eip1967.proxy.implementation'))
  const slotValue = toHex(fromHex(slot, 'bigint') - 1n)
  const slotForImplementation = pad(slotValue, { size: 32 })
  const implementationAddressRaw = await client.getStorageAt({
    address: contractAddress,
    slot: slotForImplementation,
  })
  const implementationAddress: Address = `0x${implementationAddressRaw?.slice(
    -40,
  )}`

  // Check if the implementation contracts bytecode contains valid function selectors
  const bytecode = await client.getBytecode({ address: implementationAddress })

  const containsSelector = FUNCTION_SELECTORS.find((selector) =>
    bytecode?.includes(selector),
  )

  if (!containsSelector) {
    throw new Error(
      'None of the specified function selectors are present in the contract bytecode.',
    )
  }
}

export const getNextTokenId = async (
  client: PublicClient,
  contractAddress: Address,
  tokenId?: bigint | number | string,
) => {
  let _tokenId = tokenId
  if (tokenId === null || tokenId === undefined) {
    const nextTokenId = (await client.readContract({
      address: contractAddress,
      abi: ZORA_MINTER_ABI_1155,
      functionName: 'nextTokenId',
    })) as bigint

    _tokenId = Number(nextTokenId) - 1
  }

  return _tokenId
}

export const getPublicClient = (chainId: number) => {
  return createPublicClient({
    chain: chainIdToViemChain(chainId),
    transport: http(),
  }) as PublicClient
}

/**
 * Determines the type of a contract (ERC-1155 or ERC-721) based on the supported interfaces.
 * 
 * @param client - The PublicClient used to interact with the blockchain.
 * @param contractAddress - The address of the contract to check.
 * @returns A promise that resolves to '1155' if the contract is ERC-1155, '721' if it is ERC-721, or null if neither.
 */
export async function getContractType(
  client: PublicClient,
  contractAddress: Address,
): Promise<'1155' | '721' | null> {
  const abi = [
    {
      inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
      name: 'supportsInterface',
      outputs: [{ internalType: 'bool', name: 'isSupported', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
  ]
  const interfaceIds = {
    '1155': '0xd9b67a26', // ERC-1155
    '721': '0x80ac58cd', // ERC-721
  }

  for (const [type, interfaceId] of Object.entries(interfaceIds)) {
    try {
      const supportsInterface = (await client.readContract({
        address: contractAddress,
        abi,
        functionName: 'supportsInterface',
        args: [interfaceId],
      })) as boolean

      if (supportsInterface) {
        return type as '1155' | '721'
      }
      // eslint-disable-next-line no-empty
    } catch {}
  }
  return null
}
