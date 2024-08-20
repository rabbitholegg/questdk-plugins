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
      $some?: FilterOperator[]
    }
  | {
      $first?: FilterOperator
    }
  | {
      $last?: FilterOperator
    }
  | {
      $nth?: NthFilter
    }

export const ArrayOperatorSchema: z.ZodType<ArrayOperator> = z.union([
  z.object({
    $some: z
      .lazy(() => FilterOperatorSchema)
      .array()
      .optional(),
  }),
  z.object({ $first: z.lazy(() => FilterOperatorSchema).optional() }),
  z.object({ $last: z.lazy(() => FilterOperatorSchema).optional() }),
  z.object({ $nth: z.lazy(() => NthFilterSchema).optional() }),
])

export type LogicalOperator =
  | {
      $and?: FilterOperator[]
    }
  | {
      $or?: FilterOperator[]
    }

export const LogicalOperatorSchema: z.ZodType<LogicalOperator> = z.union([
  z.object({
    $and: z
      .lazy(() => FilterOperatorSchema)
      .array()
      .optional(),
  }),
  z.object({
    $or: z
      .lazy(() => FilterOperatorSchema)
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
  [K in keyof Transaction]: FilterOperator
}

export const TransactionFilterSchema = z.record(
  z.string(),
  FilterOperatorSchema,
)

type Primitive = string | number | boolean
export const PrimitiveSchema = z.union([z.string(), z.number(), z.boolean()])

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
  | FilterObject
  | FilterArray
  | FilterOperator
  | Abi
export const FilterSchema = z.union([
  PrimitiveSchema,
  FilterObjectSchema,
  FilterOperatorSchema,
  z.lazy(() => FilterSchema.array()),
  AbiSchema,
])

export type FilterArray = Filter[]
export const FilterArraySchema = FilterSchema.array()

export type NthFilter = {
  index: bigint | number | string
  value: TransactionFilter | FilterObject
}
export const NthFilterSchema = z.object({
  index: z.union([z.bigint(), z.number(), z.string()]),
  value: z.union([TransactionFilterSchema, FilterObjectSchema]),
})
