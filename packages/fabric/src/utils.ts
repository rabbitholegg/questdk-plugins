import { SUBSCRIPTION_ABI } from './abi'
import { chainIdToViemChain } from '@rabbitholegg/questdk-plugin-utils'
import { type Address, type PublicClient, createPublicClient, http } from 'viem'

interface ContractData {
  erc20Address: Address
  minPurchaseSeconds: bigint | undefined
  tps: bigint | undefined
}

export async function getContractData(
  chainId: number,
  contractAddress: Address,
  _client?: PublicClient,
): Promise<ContractData> {
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
    erc20Address: erc20Address as Address,
    minPurchaseSeconds: minPurchaseSeconds as bigint | undefined,
    tps: tps as bigint | undefined,
  }
}
