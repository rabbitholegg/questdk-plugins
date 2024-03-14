import { type FilterOperator, OrderType } from '@rabbitholegg/questdk'
import type { Address } from 'viem'
import { TOKEN_TO_ID } from './contract-addresses'
import { TOKENFARM_ABI, TOKENFARM_ABI2 } from './abi'
import type { BitmaskFilter } from '@rabbitholegg/questdk-plugin-utils'

type Amount = FilterOperator | BigInt | number | string | undefined

export function getTokenPacked(
  token: Address | undefined,
): { $bitmask: BitmaskFilter } | undefined {
  if (!token) return undefined
  const tokenId = TOKEN_TO_ID[token.toLowerCase()]
  if (!tokenId) {
    throw new Error('No tokenId found for the provided token address')
  }
  return {
    $bitmask: {
      bitmask:
        '0xFFFF000000000000000000000000000000000000000000000000000000000000',
      value: tokenId << 240n,
    },
  }
}

/**
 * This function repacks the given amount to match the format of the input data. Due to precision loss when packing the amount,
 * a range is added to the filter to account for this loss when using exact amounts.
 *
 * @param {Amount} amount - The amount to be converted. This can be a number or an object with a comparison operator.
 * @returns {FilterOperator | BitmaskFilter | undefined} A filter object, or undefined if the input is invalid.
 */
export function getAmountPacked(
  amount: Amount,
): FilterOperator | { $bitmask: BitmaskFilter } | undefined {
  if (amount === undefined) return undefined
  const multiplier = BigInt(2 ** 128) * BigInt(10 ** 12)
  if (typeof amount === 'object') {
    const [operator, value] = Object.entries(amount)[0]
    if (operator === '$lte' || operator === '$lt') {
      return { [operator]: (BigInt(value) + 1n) * multiplier }
    }
    return { [operator]: BigInt(value) * multiplier }
  }
  return {
    $bitmask: {
      bitmask:
        '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000000000000000000000000000',
      value: BigInt(amount) * multiplier,
    },
  }
}

export function getOrderTypePacked(
  orderType: OrderType | undefined,
): { $or: { $bitmask: BitmaskFilter }[] } | undefined {
  if (!orderType) return undefined
  const bitmask =
    '0xFF000000000000000000000000000000000000000000000000000000000'
  const orderTypeValues = {
    [OrderType.Market]: [0n, 2n], // market, stop-market
    [OrderType.Limit]: [1n, 3n], // limit, stop-limit
  }

  return {
    $or: orderTypeValues[orderType].map((value) => ({
      $bitmask: {
        bitmask,
        value: value << 232n,
      },
    })),
  }
}

export function getOrderType(
  orderType: OrderType | undefined,
): { _orderType: undefined } | { $or: { _orderType: number }[] } | undefined {
  if (!orderType) return { _orderType: undefined }
  const orderTypeValues = {
    [OrderType.Market]: {
      $or: [{ _orderType: 0 }, { _orderType: 2 }],
    },

    [OrderType.Limit]: {
      $or: [{ _orderType: 1 }, { _orderType: 3 }],
    },
  }
  return orderTypeValues[orderType]
}

export function getAmount(amount: Amount): FilterOperator | undefined {
  if (amount === undefined) return undefined
  const multiplier = BigInt(10 ** 12)
  if (typeof amount === 'object') {
    const [operator, value] = Object.entries(amount)[0]
    if (operator === '$lte' || operator === '$lt') {
      return { [operator]: (BigInt(value) + 1n) * multiplier }
    }
    return { [operator]: BigInt(value) * multiplier }
  }
  return BigInt(amount) * multiplier
}

export function getStakeInputs(token?: Address, amount?: FilterOperator) {
  if (!token)
    return {
      $or: [
        { $abi: TOKENFARM_ABI, _amount: amount },
        { $abi: TOKENFARM_ABI2, _amount: amount },
      ],
    }
  if (token?.toLowerCase() === '0xc5b2d9fda8a82e8dcecd5e9e6e99b78a9188eb05')
    return { $abi: TOKENFARM_ABI, _amount: amount }
  if (token?.toLowerCase() === '0x088cd8f5ef3652623c22d48b1605dcfe860cd704')
    return { $abi: TOKENFARM_ABI2, _amount: amount }
  return { $abi: null } // fail case. It should never reach this unless an invalid token is used.
}
