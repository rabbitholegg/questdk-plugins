import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'
import type { ActionParams, MintActionParams } from '@rabbitholegg/questdk-plugin-utils'

import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
  getProjectFees,
} from './Zora.js'

export const Zora: IActionPlugin = {
  pluginId: 'zora',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  mint,
  getProjectFees: async (params: ActionParams) => getProjectFees(params as unknown as MintActionParams),
}
