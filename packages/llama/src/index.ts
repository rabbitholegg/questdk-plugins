import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  vote,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Llama.js'


export const Llama: IActionPlugin = {
  pluginId: 'llama',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
  vote
}
