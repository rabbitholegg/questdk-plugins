import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import { mint, getSupportedChainIds, getSupportedTokenAddresses } from './Kote'

export const Kote: IActionPlugin = {
  pluginId: 'kote',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  mint,
}
