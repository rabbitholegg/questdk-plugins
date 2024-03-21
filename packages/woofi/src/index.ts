import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import { swap, getSupportedChainIds, getSupportedTokenAddresses } from './WooFi'

export const WooFi: IActionPlugin = {
  pluginId: 'woofi',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  swap,
  bridge: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
}
