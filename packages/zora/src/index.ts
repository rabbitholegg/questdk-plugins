import {
  type IActionPlugin,
  PluginActionNotImplementedError,
  type ActionParams,
  type MintActionParams,
} from '@rabbitholegg/questdk-plugin-utils'

import {
  getMintIntent,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
  getProjectFees,
  simulateMint,
} from './Zora.js'

export const Zora: IActionPlugin = {
  pluginId: 'zora',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  mint,
  getProjectFees: async (params: ActionParams) =>
    getProjectFees(params as unknown as MintActionParams),
  getMintIntent,
  simulateMint,
}
