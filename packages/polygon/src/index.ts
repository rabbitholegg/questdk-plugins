import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  bridge,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Polygon'

export const Polygon: IActionPlugin = {
  pluginId: 'polygon',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge,
  swap: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
}
