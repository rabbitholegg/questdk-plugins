import {
  type IActionPlugin,
  PluginActionNotImplementedError,
  type ActionParams,
  type MintActionParams,
} from '@rabbitholegg/questdk-plugin-utils'

import {
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  getProjectFees,
  getFees,
  simulateMint,
} from './Kote'

export const Kote: IActionPlugin = {
  pluginId: 'kote',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  mint,
  getProjectFees: async (params: ActionParams) =>
    getProjectFees(params as MintActionParams),
  getFees: async (params: ActionParams) => getFees(params as MintActionParams),
  simulateMint,
}
