import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Basepaint'

export const BasePaint: IActionPlugin = {
  pluginId: 'basepaint',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
}
