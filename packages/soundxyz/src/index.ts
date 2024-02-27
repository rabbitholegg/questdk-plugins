import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk-plugin-utils'

import {
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  getMintIntent,
} from './Soundxyz.js'

export const Soundxyz: IActionPlugin = {
  pluginId: 'soundxyz',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  getMintIntent,
}
