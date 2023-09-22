import {
  type Abi,
  decodeAbiParameters,
  decodeFunctionData,
  getAbiItem,
  isAddress,
  parseAbiParameters,
  slice,
} from 'viem'

/**
 * Applies the AND operator to a set of filters.
 * @param context - The context to apply the filters to.
 * @param filter - The set of filters to apply.
 * @returns True if all filters pass, false otherwise.
 */
export const handleAnd = (context: any, filter: Filter[]): boolean => {
  for (let i = 0; i < filter.length; i++) {
    if (!apply(context, filter[i])) return false
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
    if (apply(context, filter[i])) return true
  }
  return false
}

/**
 * Applies the SOME operator to a set of filters.
 * @param context - The context to apply the filters to.
 * @param filter - The set of filters to apply.
 * @returns True if any filter passes, false otherwise.
 */
export const handleSome = (context: any, filter: FilterObject): boolean => {
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
export const handleFirst = (context: any, filter: FilterObject): boolean => {
  return apply(context[0], filter)
}

/**
 * Applies the filter to the last element of the context.
 * @param context - The context to apply the filter to.
 * @param filter - The filter to apply.
 * @returns The result of applying the filter.
 */
export const handleLast = (context: any, filter: FilterObject): boolean => {
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
  const params = parseAbiParameters(filter.$abiParams.join(', '))
  const args = decodeAbiParameters(params, context)
  const namedArgs = params.reduce((acc: Record<string, any>, param, index) => {
    acc[`${param.name || index}`] = args[index]
    return acc
  }, {})

  return namedArgs
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
  $abiParams: handleAbiParamDecode,
}

type OperatorKey = keyof typeof operators
type PreprocessorKey = keyof typeof preprocessors

type Primitive = string | number | boolean

type FilterObject = {
  [K in string]?: Filter
}

export type Filter = Primitive | FilterObject | Filter[]

/**
 * Applies a set of filters to a context.
 * @param originalContext - The original context to apply the filters to.
 * @param filters - The set of filters to apply.
 * @returns True if all filters pass, false otherwise.
 */
export function apply(
  originalContext: Record<string, any>,
  filters: any,
): boolean {
  let context = originalContext

  for (const key in filters) {
    if (!Object.hasOwnProperty.call(filters, key)) continue
    if (key in preprocessors) {
      if (!context) return false
      context = preprocessors[key as PreprocessorKey](context, filters)
      continue
    }

    if (key in operators) {
      const operator = operators[key as OperatorKey]
      if (!operator(context, filters[key])) {
        return false
      }
      continue
    }

    if (typeof filters[key] === 'object') {
      if (!(key in context)) {
        return false
      }
      if (!apply(context[key], filters[key])) {
        return false
      }
    } else if (isAddress(context[key])) {
      if (context[key].toLowerCase() !== filters[key].toLowerCase()) {
        return false
      }
    } else if (
      typeof filters[key] === 'bigint' ||
      typeof filters[key] === 'number' ||
      typeof context[key] === 'bigint' ||
      typeof context[key] === 'number'
    ) {
      if (
        context[key] === undefined ||
        BigInt(context[key]) !== BigInt(filters[key])
      ) {
        return false
      }
    } else if (context[key] !== filters[key]) {
      return false
    }
  }
  return true
}
