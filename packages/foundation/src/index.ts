import {
  ActionParams,
  type IActionPlugin,
  MintActionParams,
} from '@rabbitholegg/questdk'

import {
  getFees,
  getProjectFees,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
} from './Foundation'

export const Foundation: IActionPlugin = {
  pluginId: 'foundation',
  getFees: async (params: ActionParams) =>
    getFees(params as unknown as MintActionParams),
  getProjectFees: async (params: ActionParams) =>
    getProjectFees(params as unknown as MintActionParams),
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
}
