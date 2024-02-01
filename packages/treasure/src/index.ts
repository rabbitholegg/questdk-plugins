import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  mint,
  stake,
  swap,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Treasure.js'

export const Treasure: IActionPlugin = {
  pluginId: 'treasure',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
  stake,
  swap,
  bridge: async () => new PluginActionNotImplementedError(),
}
