import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { zoraUniversalMinterAddress } from '@zoralabs/universal-minter'
import {
  type Address,
  getAddress,
  type TransactionRequest,
  encodeFunctionData,
  createPublicClient,
  http,
  type PublicClient,
  type SimulateContractReturnType,
  pad,
} from 'viem'
import { CHAIN_ID_ARRAY } from './chain-ids'
import {
  UNIVERSAL_MINTER_ABI,
  ZORA_MINTER_ABI_721,
  ZORA_MINTER_ABI_1155,
  ZORA_MINTER_ABI_1155_LEGACY,
} from './abi'
import {
  type MintIntentParams,
  chainIdToViemChain,
  DEFAULT_ACCOUNT,
  BOOST_TREASURY_ADDRESS,
} from '@rabbitholegg/questdk-plugin-utils'
import { FIXED_PRICE_SALE_STRATS } from './contract-addresses'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint

  const universalMinter =
    zoraUniversalMinterAddress[
      chainId as keyof typeof zoraUniversalMinterAddress
    ]

  const mintContract = universalMinter
    ? { $or: [contractAddress.toLowerCase(), universalMinter.toLowerCase()] }
    : contractAddress

  const andArray721 = []
  const andArray1155 = []
  if (recipient) {
    andArray721.push({
      $or: [{ recipient }, { tokenRecipient: recipient }, { to: recipient }],
    })
    andArray1155.push({
      $or: [{ recipient }, { tokenRecipient: recipient }, { to: recipient }],
    })
  }
  if (tokenId || amount) {
    andArray721.push({
      quantity: amount,
    })
    andArray1155.push({
      quantity: amount,
      tokenId,
    })
  }

  const ERC721_FILTER = {
    $abi: ZORA_MINTER_ABI_721,
    $and: andArray721.length !== 0 ? andArray721 : undefined,
  }

  const ERC1155_FILTER = {
    $abi: ZORA_MINTER_ABI_1155,
    $and: andArray1155.length !== 0 ? andArray1155 : undefined,
  }

  return compressJson({
    chainId,
    to: mintContract,
    input: {
      $or: [
        {
          // batchmint function
          $abiAbstract: UNIVERSAL_MINTER_ABI,
          _targets: { $some: getAddress(contractAddress) },
          _calldatas: {
            $some: {
              $or: [ERC721_FILTER, ERC1155_FILTER],
            },
          },
        },
        ERC721_FILTER,
        ERC1155_FILTER,
      ],
    },
  })
}

export const getMintIntent = async (
  mint: MintIntentParams,
): Promise<TransactionRequest> => {
  const { contractAddress, tokenId, amount, recipient } = mint
  let data
  if (tokenId !== null && tokenId !== undefined) {
    const mintArgs = [
      FIXED_PRICE_SALE_STRATS[mint.chainId],
      tokenId,
      amount,
      [BOOST_TREASURY_ADDRESS],
      pad(recipient),
    ]
    // Assume it's an 1155 mint
    data = encodeFunctionData({
      abi: ZORA_MINTER_ABI_1155,
      functionName: 'mint',
      args: mintArgs,
    })
  } else {
    // Assume it's a 721 mint
    data = encodeFunctionData({
      abi: ZORA_MINTER_ABI_721,
      functionName: 'purchase',
      args: [amount],
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
  const { contractAddress, tokenId, amount, recipient } = mint
  const _client =
    client ??
    createPublicClient({
      chain: chainIdToViemChain(mint.chainId),
      transport: http(),
    })
  const from = account ?? DEFAULT_ACCOUNT

  if (tokenId !== null && tokenId !== undefined) {
    try {
      const mintArgs = [
        FIXED_PRICE_SALE_STRATS[mint.chainId],
        tokenId,
        amount,
        [BOOST_TREASURY_ADDRESS],
        pad(recipient),
      ]
      const result = await _client.simulateContract({
        address: contractAddress,
        value,
        abi: ZORA_MINTER_ABI_1155,
        functionName: 'mint',
        args: mintArgs,
        account: from,
      })
      return result
    } catch {
      const mintArgs = [
        FIXED_PRICE_SALE_STRATS[mint.chainId],
        tokenId,
        amount,
        pad(recipient),
      ]
      const result = await _client.simulateContract({
        address: contractAddress,
        value,
        abi: ZORA_MINTER_ABI_1155_LEGACY,
        functionName: 'mint',
        args: mintArgs,
        account: from,
        // TODO: There's a bug in Viem preventing this behavior; log issue with them
        // stateOverride: [{
        //   address: from,
        //   balance: BigInt("0x56bc75e2d63100000")
        // }],
      })
      return result
    }
  } else {
    // Assume it's a 721 mint
    const result = await _client.simulateContract({
      address: contractAddress,
      value,
      abi: ZORA_MINTER_ABI_721,
      functionName: 'purchase',
      args: [amount],
      account: from,
    })
    return result
  }
}

export const getProjectFees = async (
  mint: MintActionParams,
): Promise<bigint> => {
  const { chainId, contractAddress, tokenId, amount } = mint

  const { getMintCosts, MintAPIClient } = await import('@zoralabs/protocol-sdk')

  const client = new MintAPIClient(chainId)

  const args: { tokenAddress: Address; tokenId?: number } = {
    tokenAddress: contractAddress,
  }

  if (tokenId) {
    args.tokenId = tokenId
  }

  const salesConfigAndTokenInfo = await client.getSalesConfigAndTokenInfo(args)
  const quantityToMint = typeof amount === 'number' ? BigInt(amount) : BigInt(1)
  const fee = await getMintCosts({ salesConfigAndTokenInfo, quantityToMint })

  return fee.totalCost
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [] /// Supported tokens don't apply for the mint action
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY as number[]
}
