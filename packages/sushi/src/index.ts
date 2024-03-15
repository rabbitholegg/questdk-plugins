import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  swap,
} from './Sushi'

export const Sushi: IActionPlugin = {
  pluginId: 'sushi',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  swap,
  bridge: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
}
