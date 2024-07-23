import { type IActionPlugin } from '@rabbitholegg/questdk'
import {
  type ActionParams,
  type MintActionParams,
} from '@rabbitholegg/questdk-plugin-utils'

import {
  create,
  getExternalUrl,
  getFees,
  getMintIntent,
  getProjectFees,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
  simulateMint,
} from './Titles'

export const Titles: IActionPlugin = {
  pluginId: 'titles',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  create,
  getMintIntent,
  mint,
  simulateMint,
  getExternalUrl: async (params: ActionParams) =>
    getExternalUrl(params as unknown as MintActionParams),
  getProjectFees: async (params: ActionParams) =>
    getProjectFees(params as unknown as MintActionParams),
  getFees: async (params: ActionParams) =>
    getFees(params as unknown as MintActionParams),
}
