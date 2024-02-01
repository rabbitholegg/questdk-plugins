import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  options,
  stake,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Vela.js'

export const Vela: IActionPlugin = {
  pluginId: 'vela',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  options,
  stake: stake,
  swap: async () => new PluginActionNotImplementedError(),
  bridge: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
}
