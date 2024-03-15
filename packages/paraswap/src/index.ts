
import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  stake,
  swap,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Paraswap'

// Replace *project* with the name of the project
export const Paraswap: IActionPlugin = {
  pluginId: 'paraswap',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge: async () => new PluginActionNotImplementedError(),
  swap,
  mint: async () => new PluginActionNotImplementedError(),
  stake,
}
