import { SUBSCRIPTION_ABI } from './abi'
import { chainIdToViemChain } from '@rabbitholegg/questdk-plugin-utils'
import { type Address, type PublicClient, createPublicClient, http } from 'viem'

export async function getContractData(
  chainId: number,
  contractAddress: Address,
  _client?: PublicClient,
) {
  const client =
    _client ??
    createPublicClient({
      chain: chainIdToViemChain(chainId),
      transport: http(),
    })

  const contract = {
    address: contractAddress,
    abi: SUBSCRIPTION_ABI,
  }

  const [erc20Address, minPurchaseSeconds, tps] = (
    await client.multicall({
      contracts: [
        { ...contract, functionName: 'erc20Address' },
        { ...contract, functionName: 'minPurchaseSeconds' },
        { ...contract, functionName: 'tps' },
      ],
    })
  ).map((v) => v.result)

  return {
    erc20Address,
    minPurchaseSeconds,
    tps,
    client,
  }
}
