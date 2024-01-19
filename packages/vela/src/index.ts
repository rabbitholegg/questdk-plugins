import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  options,
  stake,
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Vela.js'

export const Vela: IActionPlugin = {
  pluginId: 'vela',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  options,
  swap: async () => new PluginActionNotImplementedError(),
  bridge: async () => new PluginActionNotImplementedError(),
  mint: mint,
  stake: stake,
}
