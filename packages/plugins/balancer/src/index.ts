import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  swap,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Balancer.js'

export const Balancer: IActionPlugin = {
  pluginId: 'balancer',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  swap,
  bridge: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
}
