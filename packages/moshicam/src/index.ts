import {
  type ActionParams,
  type IActionPlugin,
  type MintActionParams,
} from '@rabbitholegg/questdk'

import {
  getFees,
  getMintIntent,
  getProjectFees,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
  simulateMint,
} from './Moshicam'

export const Moshicam: IActionPlugin = {
  pluginId: 'moshicam',
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
  getProjectFees: async (params: ActionParams) =>
    getProjectFees(params as unknown as MintActionParams),
  getFees: async (params: ActionParams) =>
    getFees(params as unknown as MintActionParams),
  getMintIntent,
  simulateMint,
}
