import {
  compressJson,
  type MintActionParams,
  type TransactionFilter,
} from '@rabbitholegg/questdk'
import {
  type MintIntentParams,
  chainIdToViemChain,
  DEFAULT_ACCOUNT,
  Chains,
} from '@rabbitholegg/questdk-plugin-utils'
import {
  type Address,
  type TransactionRequest,
  encodeFunctionData,
  createPublicClient,
  http,
  type PublicClient,
  type SimulateContractReturnType,
  parseEther,
} from 'viem'
import {
  ABI_MINT,
  ABI_MULTI,
  ERC1155_CONTRACT,
  ERC721_CONTRACT,
} from './constants'
import {
  shouldIncludeAbiMint,
  getInstanceId,
  getExitAddresses,
  type ManifoldInput,
} from './utils'

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
      mintCount: amount,
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
    to: getExitAddresses(chainId, ERC1155_CONTRACT, ERC721_CONTRACT),
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
      const reponse = await fetch(
        `https://apps.api.manifoldxyz.dev/public/instance/data?id=${instanceId}`,
      )
      const data = await reponse.json()
      // determine project fee based on whether the project is exclusive or not
      const isExclusive = data.publicData.merkleTreeId !== undefined
      const projectFee =
        (isExclusive ? parseEther('0.00069') : parseEther('0.0005')) *
        quantityToMint

      // calculate action fee
      const mintPrice = data.mintPrice
      let actionFee = 0n
      if (mintPrice && typeof mintPrice === 'number') {
        actionFee = parseEther(mintPrice.toString()) * quantityToMint
      }
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
