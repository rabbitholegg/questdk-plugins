import {
  type Abi,
  decodeAbiParameters,
  decodeFunctionData,
  getAbiItem,
  isAddress,
  parseAbiParameters,
  slice,
} from 'viem'

export const handleAnd = (context: any, filter: Filter[]): boolean => {
  for (let i = 0; i < filter.length; i++) {
    if (!apply(context, filter[i])) return false
  }
  return true
}

export const handleOr = (context: any, filter: Filter[]): boolean => {
  for (let i = 0; i < filter.length; i++) {
    if (apply(context, filter[i])) return true
  }
  return false
}

export const handleSome = (context: any, filter: FilterObject): boolean => {
  for (let i = 0; i < context.length; i++) {
    const result = apply(context[i], filter)
    if (result) return true
  }
  return false
}

export const handleLessThan = (
  context: any,
  filter: bigint | number | string,
): boolean => {
  return BigInt(context) < BigInt(filter)
}

export const handleLessThanOrEqual = (
  context: any,
  filter: bigint | number | string,
): boolean => {
  return BigInt(context) <= BigInt(filter)
}

export const handleGreaterThan = (
  context: any,
  filter: bigint | number | string,
): boolean => {
  return BigInt(context) > BigInt(filter)
}

export const handleGreaterThanOrEqual = (
  context: any,
  filter: bigint | number | string,
): boolean => {
  return BigInt(context) >= BigInt(filter)
}

export const handleFirst = (context: any, filter: FilterObject): boolean => {
  return apply(context[0], filter)
}

export const handleLast = (context: any, filter: FilterObject): boolean => {
  return apply(context[context.length - 1], filter)
}

export const handleRegex = (context: any, filter: string): boolean => {
  const re = new RegExp(filter)
  return re.test(context)
}

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

export function apply(
  originalContext: Record<string, any>,
  filters: any,
): boolean {
  let context = originalContext

  for (const key in filters) {
    if (!Object.hasOwnProperty.call(filters, key)) continue

    if (key in preprocessors) {
      context = preprocessors[key as PreprocessorKey](context, filters)
      continue
    }

    if (key in operators) {
      const operator = operators[key as OperatorKey]
      if (!operator(context, filters[key])) return false
      continue
    }

    if (typeof filters[key] === 'object') {
      if (!apply(context[key], filters[key])) return false
    } else if (isAddress(context[key])) {
      if (context[key].toLowerCase() !== filters[key].toLowerCase()) {
        return false
      }
    } else if (context[key] !== filters[key]) {
      return false
    }
  }

  return true
}
