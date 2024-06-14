import { Address } from 'viem'

export type Profile = {
  ownedBy: {
    address: Address
  }
}

export interface PaginatedResponse<T> {
  data: {
    [key: string]: {
      items: T[]
      pageInfo: {
        next: string | null
      }
    }
  }
}

export interface ActionVariables {
  on?: string
  where: {
    anyOf?: Array<{ category: string }>
    whoMirroredPublication?: string
  }
  cursor?: string | null
}
