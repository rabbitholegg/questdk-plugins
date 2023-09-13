import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'
import {
  bridge,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Across.js'
export const Across: IActionPlugin = {
  pluginId: 'across',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge,
  swap: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
}
