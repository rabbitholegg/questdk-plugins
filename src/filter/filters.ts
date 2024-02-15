import type {
  AbiFilter,
  AbiParamFilter,
  AbstractAbiFilter,
  BitmaskFilter,
  Filter,
  FilterObject,
  NthFilter,
  TransactionFilter,
} from './types.js'
import {
  type AbiFunction,
  type Address,
  type TransactionEIP1559,
  decodeAbiParameters,
  decodeFunctionData,
  getAbiItem,
  isAddress,
  parseAbiParameters,
  slice,
  toFunctionSelector,
} from 'viem'
type OperatorKey = keyof typeof operators

/**
 * Applies the AND operator to a set of filters.
 * @param context - The context to apply the filters to.
 * @param filter - The set of filters to apply.
 * @returns True if all filters pass, false otherwise.
 */
export const handleAnd = (context: any, filter: Filter[]): boolean => {
  for (let i = 0; i < filter.length; i++) {
    if (!apply(context, filter[i] as FilterObject)) {
      return false
    }
  }
  return true
}

/**
 * Applies the OR operator to a set of filters.
 * @param context - The context to apply the filters to.
 * @param filter - The set of filters to apply.
 * @returns True if any filter passes, false otherwise.
 */
export const handleOr = (context: any, filter: Filter[]): boolean => {
  for (let i = 0; i < filter.length; i++) {
    if (apply(context, filter[i] as FilterObject)) {
      return true
    }
  }
  return false
}

/**
 * Applies the SOME operator to a set of filters.
 * @param context - The context to apply the filters to.
 * @param filter - The set of filters to apply.
 * @returns True if any filter passes, false otherwise.
 */
export const handleSome = (
  context: any,
  filter: TransactionFilter | FilterObject,
): boolean => {
  for (let i = 0; i < context.length; i++) {
    const result = apply(context[i], filter)
    if (result) return true
  }
  return false
}

/**
 * Checks if the context is less than the filter.
 * @param context - The context to compare.
 * @param filter - The value to compare against.
 * @returns True if context is less than filter, false otherwise.
 */
export const handleLessThan = (
  context: any,
  filter: bigint | number | string,
): boolean => {
  return BigInt(context) < BigInt(filter)
}

/**
 * Checks if the context is less than or equal to the filter.
 * @param context - The context to compare.
 * @param filter - The value to compare against.
 * @returns True if context is less than or equal to filter, false otherwise.
 */
export const handleLessThanOrEqual = (
  context: any,
  filter: bigint | number | string,
): boolean => {
  return BigInt(context) <= BigInt(filter)
}

/**
 * Checks if the context is equal to the filter.
 * @param context - The context to compare.
 * @param filter - The value to compare against.
 * @returns True if context is equal to filter, false otherwise.
 */
export const handleEqual = (
  context: any,
  filter: bigint | number | string,
): boolean => {
  return BigInt(context) === BigInt(filter)
}

/**
 * Checks if the context is greater than the filter.
 * @param context - The context to compare.
 * @param filter - The value to compare against.
 * @returns True if context is greater than filter, false otherwise.
 */
export const handleGreaterThan = (
  context: any,
  filter: bigint | number | string,
): boolean => {
  return BigInt(context) > BigInt(filter)
}

/**
 * Checks if the context is greater than or equal to the filter.
 * @param context - The context to compare.
 * @param filter - The value to compare against.
 * @returns True if context is greater than or equal to filter, false otherwise.
 */
export const handleGreaterThanOrEqual = (
  context: any,
  filter: bigint | number | string,
): boolean => {
  return BigInt(context) >= BigInt(filter)
}

/**
 * Applies the filter to the first element of the context.
 * @param context - The context to apply the filter to.
 * @param filter - The filter to apply.
 * @returns The result of applying the filter.
 */
export const handleFirst = (
  context: any,
  filter: TransactionFilter | FilterObject,
): boolean => {
  return apply(context[0], filter)
}

/**
 * Applies the filter to the last element of the context.
 * @param context - The context to apply the filter to.
 * @param filter - The filter to apply.
 * @returns The result of applying the filter.
 */
export const handleLast = (
  context: any,
  filter: TransactionFilter | FilterObject,
): boolean => {
  return apply(context[context.length - 1], filter)
}

/**
 * Checks if the value at the nth index meets the specified condition.
 * @param context - The context to apply the check to.
 * @param filter - An object containing the index and the condition to check.
 * @returns True if the value at the nth index meets the condition, false otherwise.
 */
export const handleNth = (context: any, filter: NthFilter): boolean => {
  const { index, value } = filter

  if (Number(index) < 0 || index >= context.length) {
    return false // index out of bounds
  }
  return apply(context[Number(index)], value as FilterObject)
}

/**
 * Checks if the context matches the regular expression filter.
 * @param context - The context to check.
 * @param filter - The regular expression to match against.
 * @returns True if the context matches the filter, false otherwise.
 */
export const handleRegex = (context: any, filter: string): boolean => {
  const re = new RegExp(filter)
  return re.test(context)
}

/**
 * Applies a bitmask to the context and compares the result to a value.
 * @param context - The context to apply the bitmask to.
 * @param filter - An object containing the bitmask and the value to compare against.
 * @returns True if the masked context is equal to the value, false otherwise.
 */
export const handleBitmask = (context: any, filter: BitmaskFilter): boolean => {
  const maskedContext = BigInt(context) & BigInt(filter.bitmask)
  if (typeof filter.value === 'object') {
    return apply(maskedContext as any, filter.value as FilterObject)
  }
  return maskedContext === BigInt(filter.value)
}

/**
 * Decodes ABI from the context using the filter.
 * @param context - The context to decode.
 * @param filter - The filter containing the ABI.
 * @returns The decoded ABI.
 */
export const handleAbiDecode = (context: any, filter: AbiFilter) => {
  try {
    const sighash = slice(context, 0, 4)
    const { functionName, args = [] } = decodeFunctionData({
      abi: filter.$abi,
      data: context,
    })

    const abiItem = getAbiItem({
      abi: filter.$abi,
      name: functionName,
      args,
    }) as AbiFunction

    const namedArgs = [...abiItem.inputs].reduce(
      (acc: Record<string, any>, input, index) => {
        acc[`${input.name || index}`] = args[index]
        return acc
      },
      {},
    )
    const { $abi: _, ...newFilter } = filter
    if (apply({ ...namedArgs, sighash, functionName }, newFilter)) {
      return true
    }
    return null
  } catch (_e) {
    return null
  }
}

export const handleAbstractAbiDecode = (
  context: any,
  filter: AbstractAbiFilter,
) => {
  const decodedReturn: ReturnType<typeof handleAbiDecode>[] = []
  const elementCount = filter.$abiAbstract!.length
  const $abiAbstract = filter.$abiAbstract
  const { $abiAbstract: _, ...newFilter } = filter

  const contextMap = new Map<string, number>()
  // Function selectors are 4 bytes long - 8 characters
  for (let i = 2; i < context.length - 8; i++) {
    contextMap.set(context.substring(i, i + 8), i)
  }
  for (let i = 0; i < elementCount; i++) {
    const abiItem = $abiAbstract![i]
    if (abiItem.type === 'function') {
      const functionSelector = toFunctionSelector(abiItem)
      // We want to omit the leading 0x from the function selector
      const functionSelectorSubstring = functionSelector.substring(2)
      const index = contextMap.get(functionSelectorSubstring)
      if (index !== undefined) {
        decodedReturn.push(
          handleAbiDecode(`0x${context.substring(index)}`, {
            ...newFilter,
            $abi: [abiItem],
          }),
        )
      }
    }
  }
  const decodedReturnLength = decodedReturn.length
  for (let i = 0; i < decodedReturnLength; i++) {
    if (decodedReturn[i]) {
      return true
    }
  }
  return null
}

/**
 * Decodes ABI parameters from the context using the filter.
 * @param context - The context to decode.
 * @param filter - The filter containing the ABI parameters.
 * @returns The decoded ABI parameters.
 */
export const handleAbiParamDecode = (context: any, filter: AbiParamFilter) => {
  try {
    const params = parseAbiParameters(filter.$abiParams.join(', '))
    const args = decodeAbiParameters(params, context)
    const namedArgs = params.reduce(
      (acc: Record<string, any>, param, index) => {
        acc[`${param.name || index}`] = args[index]
        return acc
      },
      {},
    )
    const { $abiParams: _, ...newFilter } = filter
    if (apply(namedArgs, newFilter)) {
      return true
    }
    return null
  } catch (_e) {
    return null
  }
}

const operators = {
  // Logical operators
  $and: handleAnd,
  $or: handleOr,

  // Array operators
  $some: handleSome,
  $first: handleFirst,
  $last: handleLast,
  $nth: handleNth,

  // Numeric operators
  $lte: handleLessThanOrEqual,
  $lt: handleLessThan,
  $eq: handleEqual,
  $gte: handleGreaterThanOrEqual,
  $gt: handleGreaterThan,
  $regex: handleRegex,

  // Bitmask operator
  $bitmask: handleBitmask,
}

/**
 * Applies a set of filters to a context.
 * @param originalContext - The original context to apply the filters to.
 * @param filters - The set of filters to apply.
 * @returns True if all filters pass, false otherwise.
 */
export function apply(
  originalContext: TransactionEIP1559 | Record<string, any>,
  filters: TransactionFilter | FilterObject,
): boolean {
  let context: TransactionEIP1559 | Record<string, any> = originalContext
  if (typeof filters === 'object') {
    if ('$abi' in filters) {
      const processedContext = handleAbiDecode(context, filters as AbiFilter)
      if (processedContext === true) {
        return true
      }
      if (processedContext === null) {
        return false
      }
      context = processedContext
    }

    if ('$abiAbstract' in filters) {
      const processedContext = handleAbstractAbiDecode(
        context,
        filters as AbstractAbiFilter,
      )
      if (processedContext === true) {
        return true
      }
      if (processedContext === null) {
        return false
      }
      context = processedContext
    }

    if ('$abiParams' in filters) {
      const processedContext = handleAbiParamDecode(
        context,
        filters as AbiParamFilter,
      )
      if (processedContext === true) {
        return true
      }
      if (processedContext === null) {
        return false
      }
      context = processedContext
    }
  }
  for (const key in filters) {
    // If the key is not a property of the filters object, skip it.
    if (!Object.hasOwnProperty.call(filters, key)) continue
    const filter = filters[key as keyof typeof filters]
    if (filter === undefined) {
      return false
    }
    const _context = context[key as keyof typeof context]
    if (key in operators) {
      const operator = operators[key as OperatorKey]
      // Handle the operator cases with a switch to enforce casing
      // and type safety

      if (
        !operator(
          context,
          filter as Filter[] &
            string &
            TransactionFilter &
            BitmaskFilter &
            NthFilter,
        )
      ) {
        return false
      }
      continue
    }
    if (typeof filter === 'object') {
      if (!(key in context)) {
        return false
      }
      if (!apply(_context, filter as FilterObject | TransactionFilter)) {
        return false
      }
    } else if (isAddress(_context as string)) {
      if (
        typeof filter === 'string' &&
        (_context as Address).toLowerCase() !== filter.toLowerCase()
      ) {
        return false
      }
    } else if (
      typeof filter === 'bigint' ||
      typeof filter === 'number' ||
      typeof _context === 'bigint' ||
      typeof _context === 'number'
    ) {
      if (
        _context === undefined ||
        BigInt(_context) !== BigInt(filter as bigint | number | string)
      ) {
        return false
      }
    } else if (_context !== filter) {
      return false
    }
  }
  return true
}
