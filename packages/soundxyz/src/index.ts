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
  getDynamicNameParams,
  getMintIntent,
  getProjectFees,
  simulateMint,
} from './Soundxyz.js'

export const Soundxyz: IActionPlugin = {
  pluginId: 'soundxyz',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  getDynamicNameParams,
  getMintIntent,
  getProjectFees: async (params: ActionParams) =>
    getProjectFees(params as unknown as MintActionParams),
  simulateMint,
}
