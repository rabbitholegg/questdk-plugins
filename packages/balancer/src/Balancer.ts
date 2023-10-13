
import { type TransactionFilter, type SwapActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { BALANCER_ABI } from './abi'
import { FilterOperator } from '@rabbitholegg/questdk'


export const buildPathQuery = (In?: string, Out?: string) => {
  // v2 paths are formatted as [<token>, <token>]
  const conditions: FilterOperator[] = []

  if (In) {
    conditions.push({ $first: In })
  }

  if (Out) {
    conditions.push({ $last: Out })
  }

  return {
    $and: conditions,
  }
}

export const swap = async (swap: SwapActionParams): Promise<TransactionFilter> => {
  const {
    chainId,
    contractAddress,
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    recipient,
  } = swap

  // We always want to return a compressed JSON object which we'll transform into a TransactionFilter
  return compressJson({
    chainId: chainId, // The chainId of the source chain
    to:  0x0,   // The contract address of the bridge
    input: {
      $abiAbstract: BALANCER_ABI,
      $or: [
        {
          singleSwap: {
            assetIn: tokenIn,
            assetOut: tokenOut,
            amount: amountIn,
          },
          recipient: recipient,
        },
        {
          assets: buildPathQuery(tokenIn, tokenOut),
          recipient: recipient,
          limits: buildPathQuery(amountIn, amountOut),
        }
      ]
    },  // The input object is where we'll put the ABI and the parameters
  })
}

export const getSupportedTokenAddresses = async (_chainId: number): Promise<Address[]> => {
  // Given a specific chain we would expect this function to return a list of supported token addresses
}


export const getSupportedChainIds = async (): Promise<number[]> => {
  // This should return all of the ChainIds that are supported by the Project we're integrating

}
