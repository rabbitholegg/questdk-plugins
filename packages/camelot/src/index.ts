import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  swap,
} from './Camelot'

export const Camelot: IActionPlugin = {
  pluginId: 'camelot',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge: async () => new PluginActionNotImplementedError(),
  swap,
  mint: async () => new PluginActionNotImplementedError(),
}
