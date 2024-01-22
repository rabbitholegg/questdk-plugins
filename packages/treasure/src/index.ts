import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  mint,
  swap,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Treasure.js'

export const Treasure: IActionPlugin = {
  pluginId: 'treasure',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
  swap,
  bridge: async () => new PluginActionNotImplementedError(),
}
