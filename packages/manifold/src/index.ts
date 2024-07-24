import type {
  ActionParams,
  IActionPlugin,
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
  getExternalUrl,
  getMintIntent,
  simulateMint,
}
