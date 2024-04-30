import {
  bridge,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Across'
import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

export const Across: IActionPlugin = {
  pluginId: 'across',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge,
  swap: async () => new PluginActionNotImplementedError(),
  mint: async () => new PluginActionNotImplementedError(),
}
