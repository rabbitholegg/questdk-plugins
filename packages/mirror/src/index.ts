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
  getMintIntent,
  simulateMint,
} from './Mirror.js'

export const Mirror: IActionPlugin = {
  pluginId: 'mirror',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  getProjectFees: async (params: ActionParams) =>
    getProjectFees(params as unknown as MintActionParams),
  getMintIntent,
  simulateMint,
}
