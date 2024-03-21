import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import { getSupportedChainIds, getSupportedTokenAddresses, vote } from './Llama'

export const Llama: IActionPlugin = {
  pluginId: 'llama',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
  vote,
}
