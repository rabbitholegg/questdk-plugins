import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk-plugin-utils'

import {
  getMintIntent,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
  getProjectFees,
} from './Zora.js'

export const Zora: IActionPlugin = {
  pluginId: 'zora',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  mint,
  getProjectFees,
  getMintIntent,
}
