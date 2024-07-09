import {
  ABI_MINT,
  ABI_MULTI,
  ERC721_CONTRACT,
  ERC1155_CONTRACT,
} from './constants'
import {
  type ManifoldInput,
  getInstanceId,
  shouldIncludeAbiMint,
} from './utils'
import {
  type MintActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import {
  Chains,
  DEFAULT_ACCOUNT,
  type MintIntentParams,
  chainIdToViemChain,
  formatAmount,
  getExitAddresses,
} from '@rabbitholegg/questdk-plugin-utils'
import axios from 'axios'
import {
  type Address,
  type PublicClient,
  type SimulateContractReturnType,
  type TransactionRequest,
  createPublicClient,
  encodeFunctionData,
  http,
  parseEther,
} from 'viem'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint

  let instanceId: number | undefined = undefined

  if (tokenId) {
    instanceId = await getInstanceId(chainId, contractAddress, tokenId)
  }

  const inputConditions: ManifoldInput[] = [
    {
      $abiAbstract: ABI_MULTI,
      creatorContractAddress: contractAddress,
      instanceId,
      mintCount: formatAmount(amount),
      mintFor: recipient,
    },
  ]

  if (shouldIncludeAbiMint(amount)) {
    inputConditions.push({
      $abiAbstract: ABI_MINT,
      creatorContractAddress: contractAddress,
      instanceId,
      mintFor: recipient,
    })
  }

  return compressJson({
    chainId,
    to: getExitAddresses(chainId, [ERC1155_CONTRACT, ERC721_CONTRACT]),
    input: {
      $or: inputConditions,
    },
  })
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint
  let data

  const instanceId = await getInstanceId(chainId, contractAddress, tokenId ?? 1)

  if (amount > 1) {
    const mintArgs = [contractAddress, instanceId, amount, [], [], recipient]
    data = encodeFunctionData({
      abi: ABI_MULTI,
      functionName: 'mintBatch',
      args: mintArgs,
    })
  } else {
    const mintArgs = [contractAddress, instanceId, 0, [], recipient]
    data = encodeFunctionData({
      abi: ABI_MINT,
      functionName: 'mint',
      args: mintArgs,
    })
  }

  return {
    from: recipient,
    to: contractAddress,
    data,
  }
}

export const simulateMint = async (
  mint: MintIntentParams,
  value: bigint,
  account?: Address,
  client?: PublicClient,
): Promise<SimulateContractReturnType> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint
  const _client =
    client ??
    createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    })
  const from = account ?? DEFAULT_ACCOUNT

  const instanceId = await getInstanceId(chainId, contractAddress, tokenId ?? 1)

  if (amount > 1) {
    const mintArgs = [contractAddress, instanceId, amount, [], [], recipient]
    try {
      const result = await _client.simulateContract({
        address: ERC1155_CONTRACT,
        value,
        abi: ABI_MULTI,
        functionName: 'mintBatch',
        args: mintArgs,
        account: from,
      })
      return result
    } catch {
      const result = await _client.simulateContract({
        address: ERC721_CONTRACT,
        value,
        abi: ABI_MULTI,
        functionName: 'mintBatch',
        args: mintArgs,
        account: from,
      })
      return result
    }
  }

  const mintArgs = [contractAddress, instanceId, 0, [], recipient]
  try {
    const result = await _client.simulateContract({
      address: ERC1155_CONTRACT,
      value,
      abi: ABI_MINT,
      functionName: 'mint',
      args: mintArgs,
      account: from,
    })
    return result
  } catch {
    const result = await _client.simulateContract({
      address: ERC721_CONTRACT,
      value,
      abi: ABI_MINT,
      functionName: 'mint',
      args: mintArgs,
      account: from,
    })
    return result
  }
}

export const getProjectFees = async (
  mint: MintActionParams,
): Promise<bigint> => {
  const fees = await getFees(mint)
  return fees.projectFee + fees.actionFee
}

export const getFees = async (
  mint: MintActionParams,
): Promise<{ actionFee: bigint; projectFee: bigint }> => {
  try {
    const { chainId, contractAddress, tokenId, amount } = mint

    const instanceId = await getInstanceId(
      chainId,
      contractAddress,
      tokenId ?? 1,
    )

    const quantityToMint =
      typeof amount === 'number' ? BigInt(amount) : BigInt(1)

    if (instanceId) {
      const response = await axios.get(
        `https://apps.api.manifoldxyz.dev/public/instance/data?id=${instanceId}`,
      )
      const data = response.data
      // determine project fee based on whether the project is exclusive or not
      const isExclusive = data.publicData.merkleTreeId !== undefined
      const projectFee =
        (isExclusive ? parseEther('0.00069') : parseEther('0.0005')) *
        quantityToMint

      const { value, currency } = data.publicData.mintPrice
      const mintPrice = currency === 'ETH' ? BigInt(value) : 0n
      const actionFee = mintPrice * quantityToMint
      return { actionFee, projectFee }
    }
    return { actionFee: 0n, projectFee: parseEther('0.0005') * quantityToMint }
  } catch (err) {
    // https://github.com/manifoldxyz/creator-core-extensions-solidity/blob/66b794ec164d7e81022d97287c8e8591777a6590/packages/manifold/contracts/lazyclaim/LazyPayableClaim.sol#L42
    return { actionFee: 0n, projectFee: parseEther('0.0005') }
  }
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return [Chains.OPTIMISM, Chains.BASE]
}
