// eslint-disable-next-line import/no-internal-modules
import { Abi as AbiSchema } from 'abitype/zod'
import type { Abi, Transaction } from 'viem'
import { z } from 'zod'

export const NumericSchema = z.union([z.bigint(), z.string(), z.number()])

export type NumericOperator =
  | bigint
  | number
  | string
  | {
      $gt?: bigint | string | number
    }
  | {
      $gte?: bigint | string | number
    }
  | {
      $lt?: bigint | string | number
    }
  | {
      $lte?: bigint | string | number
    }

export const NumericOperatorSchema = z.union([
  z.bigint(),
  z.number(),
  z.string(),
  z.object({
    $gt: NumericSchema.optional(),
  }),
  z.object({
    $gte: NumericSchema.optional(),
  }),
  z.object({
    $lt: NumericSchema.optional(),
  }),
  z.object({
    $lte: NumericSchema.optional(),
  }),
])

export type BitmaskFilter = {
  bitmask: bigint | number | string
  value: bigint | number | string | NumericOperator
}

export const BitmaskFilterSchema = z.object({
  bitmask: z.union([z.bigint(), z.number(), z.string()]),
  value: z.union([z.bigint(), z.number(), z.string(), NumericOperatorSchema]),
})

export type StringOperator = {
  $regex?: string
}

export const StringOperatorSchema = z.object({
  $regex: z.string().optional(),
})

export type FilterOperator =
  | LogicalOperator
  | NumericOperator
  | ArrayOperator
  | StringOperator

export type ArrayOperator =
  | {
      $some?: Filter[]
    }
  | {
      $first?: Filter
    }
  | {
      $last?: Filter
    }
  | {
      $nth?: NthFilter
    }

export const ArrayOperatorSchema: z.ZodType<ArrayOperator> = z.union([
  z.object({
    $some: z
      .lazy(() => FilterSchema)
      .array()
      .optional(),
  }),
  z.object({ $first: z.lazy(() => FilterSchema).optional() }),
  z.object({ $last: z.lazy(() => FilterSchema).optional() }),
  z.object({ $nth: z.lazy(() => FilterSchema).optional() }),
])

export type LogicalOperator =
  | {
      $and?: Filter[]
    }
  | {
      $or?: Filter[]
    }

export const LogicalOperatorSchema: z.ZodType<LogicalOperator> = z.union([
  z.object({
    $and: z
      .lazy(() => FilterSchema)
      .array()
      .optional(),
  }),
  z.object({
    $or: z
      .lazy(() => FilterSchema)
      .array()
      .optional(),
  }),
])

export const FilterOperatorSchema = z.union([
  LogicalOperatorSchema,
  NumericOperatorSchema,
  ArrayOperatorSchema,
  StringOperatorSchema,
])

export type TransactionFilter = {
  [K in keyof Partial<Transaction>]: Filter
}

export const TransactionFilterSchema: z.ZodType<TransactionFilter> = z.record(
  z.string(),
  z.lazy(() => FilterSchema),
)

export type Primitive = string | number | boolean | bigint
export const PrimitiveSchema = z.union([z.string(), z.number(), z.boolean(), z.bigint()])

export type FilterObject = {
  [key: string]: Filter
}

export const FilterObjectSchema: z.ZodType<FilterObject> = z.record(
  z.string(),
  z.lazy(() => FilterSchema),
)

export interface AbiFilter extends FilterObject {
  $abi: Abi
}
export const AbiFilterSchema = z
  .object({
    $abi: AbiSchema,
  })
  .catchall(z.lazy(() => FilterSchema))

export interface AbstractAbiFilter extends FilterObject {
  $abiAbstract: Abi
}
export const AbstractAbiFilterSchema = z
  .object({
    $abiAbstract: AbiSchema,
  })
  .catchall(z.lazy(() => FilterSchema))

export interface AbiParamFilter extends FilterObject {
  $abiParams: string[]
}

export const AbiParamFilterSchema = z
  .object({
    $abiParams: AbiSchema,
  })
  .catchall(z.lazy(() => FilterSchema))

export type Filter =
  | Primitive
  | Array<Primitive>
  | FilterObject
  | FilterArray
  | FilterOperator
  | Abi
export const FilterSchema = z.union([
  PrimitiveSchema,
  PrimitiveSchema.array(),
  FilterObjectSchema,
  FilterOperatorSchema,
  z.lazy(() => FilterSchema.array()),
  AbiSchema,
])

export type FilterArray = Filter[]
export const FilterArraySchema = FilterSchema.array()

export type NthFilter = {
  index: bigint | number | string
  value: TransactionFilter | Filter
}
export const NthFilterSchema = z.object({
  index: z.union([z.bigint(), z.number(), z.string()]),
  value: z.union([TransactionFilterSchema, FilterObjectSchema]),
})
