
import { type TransactionFilter, type MintActionParams, compressJson } from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import { CHAIN_ID_ARRAY } from './chain-ids'
import { ZORA_MINTER_ABI } from './abi'


export const mint = async (mint: MintActionParams): Promise<TransactionFilter> => {
  const {
    chainId,
    contractAddress,
    tokenId,
    amount,
    recipient,
  } = mint

  return compressJson({
    chainId,
    to: contractAddress,
    input : {
      $abi: ZORA_MINTER_ABI,
      $and: [
        {
          quantity: amount,
          tokenId
        },
        {
          $or: [
            {recipient},
            {minter: recipient}
          ]
        }
      ]
    }
  })
}


export const getSupportedTokenAddresses = async (_chainId: number): Promise<Address[]> => {
  return [] /// Supported tokens don't apply for the mint action
}


export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY as number[]
}
