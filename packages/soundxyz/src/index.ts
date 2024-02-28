import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  getDynamicNameParams,
} from './Soundxyz.js'

export const Soundxyz: IActionPlugin = {
  pluginId: 'soundxyz',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  getDynamicNameParams,
}
