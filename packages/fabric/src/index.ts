import type {
  ActionParams,
  IActionPlugin,
  MintActionParams,
} from '@rabbitholegg/questdk-plugin-utils'

import {
  getFees,
  getProjectFees,
  getMintIntent,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
  simulateMint,
} from './Fabric.js'

export const Fabric: IActionPlugin = {
  pluginId: 'fabric',
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
