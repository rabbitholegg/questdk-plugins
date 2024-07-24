import {
  ActionParams,
  type IActionPlugin,
  MintActionParams,
} from '@rabbitholegg/questdk'

import {
  getExternalUrl,
  getFees,
  getMintIntent,
  getProjectFees,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
  simulateMint,
} from './Foundation'

export const Foundation: IActionPlugin = {
  pluginId: 'foundation',
  getExternalUrl,
  getFees: async (params: ActionParams) =>
    getFees(params as unknown as MintActionParams),
  getMintIntent,
  getProjectFees: async (params: ActionParams) =>
    getProjectFees(params as unknown as MintActionParams),
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
  simulateMint,
}
