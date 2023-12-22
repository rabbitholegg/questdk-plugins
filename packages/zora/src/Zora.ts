import {
  type TransactionFilter,
  type MintActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { zoraUniversalMinterAddress } from '@zoralabs/universal-minter'
import { type Address, getAddress } from 'viem'
import { CHAIN_ID_ARRAY } from './chain-ids'
import {
  UNIVERSAL_MINTER_ABI,
  ZORA_MINTER_ABI_1155,
  ZORA_MINTER_ABI_721,
} from './abi'
import type { Chains } from './utils'

export const mint = async (
  mint: MintActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, tokenId, amount, recipient } = mint

  const universalMinter = zoraUniversalMinterAddress[chainId as Chains]

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

  return compressJson({
    chainId,
    to: mintContract,
    input: {
      $or: [


        {
          $abiAbstract: UNIVERSAL_MINTER_ABI,

          // This only works if the contractAddress is the only one in the array. 
          // We need to find out if it is anywhere in the array.
          // Tried using $some, but I couldnt get it to work.
          _targets: [contractAddress],

          // Not sure if this also needs to use an array operator. It is an array of calldata (mintWithRewards function)
          _calldatas: [
            {
              $or: [
                {
                  $abiAbstract: ZORA_MINTER_ABI_1155,
                  quantity: amount,
                  tokenId
                },
                {
                  $abiAbstract: ZORA_MINTER_ABI_721,
                  quantity: amount,
                }
              ]
            }

          ]
        },


        {
          $abi: ZORA_MINTER_ABI_721,
          $and: andArray721.length !== 0 ? andArray721 : undefined,
        },
        {
          $abi: ZORA_MINTER_ABI_1155,
          $and: andArray1155.length !== 0 ? andArray1155 : undefined,
        },
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return [] /// Supported tokens don't apply for the mint action
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY as number[]
}
