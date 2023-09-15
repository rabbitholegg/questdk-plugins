import { getDeployedMultisendContract } from '@connext/nxtp-txservice'
import {
  type ChainData,
  MultisendAbi,
  chainIdToDomain,
  domainToChainId,
  getChainData,
} from '@connext/nxtp-utils'
import {
  type BridgeActionParams,
  type TransactionFilter,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { XCALL_ABI_FRAGMENTS } from './abi.js'
import { ConnextContract } from './contract-addresses.js'

let _chainDataCache: Map<string, ChainData> | null = null

const ETH_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000'

const _getChainData = async () => {
  if (!_chainDataCache) {
    const chainData = await getChainData()
    _chainDataCache = chainData
  }

  return _chainDataCache
}

export const getWETHAddress = async (chainId: number) => {
  const chains = await _getChainData()
  const domainId = chainIdToDomain(chainId)
  const chainData = chains?.get(String(domainId))
  const assets = Object.keys(chainData?.assetId || {})

  let wethAddress
  for (const address of assets) {
    if (chainData?.assetId[address].symbol === 'WETH') {
      wethAddress = address
      break
    }
  }
  return wethAddress
}

export const bridge = async (
  bridge: BridgeActionParams,
): Promise<TransactionFilter> => {
  const {
    sourceChainId,
    destinationChainId,
    contractAddress,
    tokenAddress,
    amount,
    recipient,
  } = bridge

  const defaultContractAddress = ConnextContract[sourceChainId]
  const destinationDomain = chainIdToDomain(destinationChainId)
  const requiresWrapperMultisend = tokenAddress === ETH_TOKEN_ADDRESS

  /* 
    Connext uses a MultiSend to wrap when briding ETH.
    https://github.com/connext/monorepo/issues/2905
    https://github.com/connext/monorepo/issues/4218
    Contract addresses: https://github.com/search?q=repo%3Aconnext%2Fmonorepo%20MultiSend.json&type=code
  */

  if (requiresWrapperMultisend) {
    const multiSendContract = getDeployedMultisendContract(sourceChainId)

    if (!multiSendContract) {
      throw new Error(
        `No multisend contract deployed on chain ${sourceChainId}`,
      )
    }

    const wethAddress = await getWETHAddress(sourceChainId)

    if (!wethAddress) {
      throw new Error(`No WETH address found on chain ${sourceChainId}`)
    }

    return compressJson({
      chainId: sourceChainId,
      to: multiSendContract.address,
      value: amount,
      input: {
        $abi: MultisendAbi,
        transactions: {
          $regex: wethAddress.slice(2),
        },
      },
    })
  }

  return compressJson({
    chainId: sourceChainId,
    to: contractAddress || defaultContractAddress,
    input: {
      $abi: XCALL_ABI_FRAGMENTS,
      _destination: Number(destinationDomain),
      _asset: tokenAddress,
      _amount: amount,
      _to: recipient,
    },
  })
}

export const getSupportedTokenAddresses = async (_chainId: number) => {
  const chains = await _getChainData()
  try {
    const domainId = chainIdToDomain(_chainId)
    const chainData = chains?.get(String(domainId))
    if (!chainData) {
      return []
    }
    return Object.keys(chainData.assetId).filter((addr) => !!addr) as Address[]
  } catch (_e) {
    return []
  }
}

export const getSupportedChainIds = async () => {
  const chains = await _getChainData()

  if (!chains || !(chains instanceof Map)) {
    return []
  }

  return Array.from(chains.keys())
    .map((domainId) => {
      try {
        return domainToChainId(Number(domainId))
      } catch (_e) {
        return undefined
      }
    })
    .filter((chain) => chain !== undefined) as number[]
}
