import type {
  IActionPlugin,
  ActionParams,
  MintActionParams,
} from '@rabbitholegg/questdk'

import {
  getMintIntent,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
  getProjectFees,
  getFees,
  simulateMint,
} from './Manifold.js'

export const Manifold: IActionPlugin = {
  pluginId: 'manifold',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
  getProjectFees: async (params: ActionParams) =>
    getProjectFees(params as unknown as MintActionParams),
  getFees: async (params: ActionParams) =>
    getFees(params as unknown as MintActionParams),
  getMintIntent,
  simulateMint,
}
