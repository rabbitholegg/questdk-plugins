import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  swap,
  stake,
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Vela.js'

export const Vela: IActionPlugin = {
  pluginId: 'vela',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  swap,
  stake,
  mint,
  bridge: async () => new PluginActionNotImplementedError(),
}
