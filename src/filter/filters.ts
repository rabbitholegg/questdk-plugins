import type {
  AbiFilter,
  AbiParamFilter,
  AbstractAbiFilter,
  Filter,
  FilterObject,
  TransactionFilter,
} from './types.js'
import {
  type Abi,
  type Address,
  type TransactionEIP1559,
  decodeAbiParameters,
  decodeFunctionData,
  getAbiItem,
  getFunctionSelector,
  isAddress,
  parseAbiParameters,
  slice,
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
    if (!apply(context, filter[i] as FilterObject)) return false
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
    if (apply(context, filter[i] as FilterObject)) return true
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
 * Decodes ABI from the context using the filter.
 * @param context - The context to decode.
 * @param filter - The filter containing the ABI.
 * @returns The decoded ABI.
 */
export const handleAbiDecode = (context: any, filter: { $abi: Abi }) => {
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
    })

    const namedArgs = [...abiItem.inputs].reduce(
      (acc: Record<string, any>, input, index) => {
        acc[`${input.name || index}`] = args[index]
        return acc
      },
      {},
    )

    return { ...namedArgs, sighash, functionName }
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
  const contextMap = new Map<string, number>()
  for (let i = 0; i < context.length - 6; i++) {
    contextMap.set(context.substring(i, i + 6), i)
  }
  for (let i = 0; i < elementCount; i++) {
    const abiItem = filter.$abiAbstract![i]
    if (abiItem.type === 'function') {
      const functionSelector = getFunctionSelector(abiItem)
      const functionSelectorSubstring = functionSelector.substring(2)
      const index = contextMap.get(functionSelectorSubstring)
      if (index !== undefined) {
        decodedReturn.push(
          handleAbiDecode(`0x${context.substring(index)}`, { $abi: [abiItem] }),
        )
      }
    }
  }
  delete (filter as FilterObject).$abiAbstract
  const decodedReturnLength = decodedReturn.length
  for (let i = 0; i < decodedReturnLength; i++) {
    if (apply(decodedReturn[i] as Record<string, any>, filter)) {
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
export const handleAbiParamDecode = (
  context: any,
  filter: { $abiParams: string[] },
) => {
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

    return namedArgs
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

  // Numeric operators
  $lte: handleLessThanOrEqual,
  $lt: handleLessThan,
  $gte: handleGreaterThanOrEqual,
  $gt: handleGreaterThan,
  $regex: handleRegex,
}

const preprocessors = {
  $abi: handleAbiDecode,
  $abiAbstract: handleAbstractAbiDecode,
  $abiParams: handleAbiParamDecode,
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
  for (const key in filters) {
    // If the key is not a property of the filters object, skip it.
    if (!Object.hasOwnProperty.call(filters, key)) continue
    // If the key is a preprocessor, apply it.
    if (key in preprocessors) {
      if ('$abi' in Object.keys(filters)) {
        const processedContext = handleAbiDecode(context, filters as AbiFilter)
        if (processedContext === null) {
          return false
        }
      }

      if ('$abiAbstract' in Object.keys(filters)) {
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

      if ('$abiParams' in Object.keys(filters)) {
        const processedContext = handleAbiParamDecode(
          context,
          filters as AbiParamFilter,
        )
        if (processedContext === null) {
          return false
        }
        context = processedContext
      }
    } else {
      const filter = filters[key as keyof typeof filters]
      if (filter === undefined) {
        return false
      }
      const _context = context[key as keyof typeof context]
      if (key in Object.keys(operators)) {
        const operator = operators[key as OperatorKey]
        // Handle the operator cases with a switch to enforce casing
        // and type safety

        if (
          !operator(context, filter as Filter[] & string & TransactionFilter)
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
  }
  return true
}
