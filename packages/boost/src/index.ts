import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import { mint, getSupportedChainIds, getSupportedTokenAddresses } from './Boost'

export const Boost: IActionPlugin = {
  pluginId: 'boost',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  mint,
}
