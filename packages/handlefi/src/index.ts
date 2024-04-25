import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  swap,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './HandleFi'

export const HandleFi: IActionPlugin = {
  pluginId: 'handlefi',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  swap,
  bridge: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
}
