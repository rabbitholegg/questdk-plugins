import {
  type TransactionFilter,
  type OptionsActionParams,
  compressJson,
} from '@rabbitholegg/questdk'
import { type Address } from 'viem'
import {
  VAULT_CONTRACT,
  CHAIN_TO_TOKENS,
  TOKEN_TO_ID,
} from './contract-addresses'
import { CHAIN_ID_ARRAY } from './chain-ids'
import {
  getTokenPacked,
  getAmountPacked,
  getOrderTypePacked,
  getOrderType,
  getAmount,
} from './utils'
import { ORDER_PACKED_ABI, TPSL_ORDER_ABI } from './abi'

export const options = async (
  trade: OptionsActionParams,
): Promise<TransactionFilter> => {
  const { chainId, contractAddress, token, amount, recipient, orderType } =
    trade

  const a =
    token && orderType
      ? { $and: [getTokenPacked(token), getOrderTypePacked(orderType)] }
      : getTokenPacked(token) || getOrderTypePacked(orderType)

  return compressJson({
    chainId,
    to: contractAddress ?? VAULT_CONTRACT,
    from: recipient,
    input: {
      $or: [
        {
          $abi: ORDER_PACKED_ABI,
          a,
          c: getAmountPacked(amount),
        },
        {
          $abi: TPSL_ORDER_ABI,
          _tokenId: token ? TOKEN_TO_ID[token.toLowerCase()] : undefined,
          ...getOrderType(orderType),
          _params: amount
            ? { $nth: { index: 2, value: getAmount(amount) } }
            : undefined,
        },
      ],
    },
  })
}

export const getSupportedTokenAddresses = async (
  _chainId: number,
): Promise<Address[]> => {
  return CHAIN_TO_TOKENS[_chainId] ?? []
}

export const getSupportedChainIds = async (): Promise<number[]> => {
  return CHAIN_ID_ARRAY
}
