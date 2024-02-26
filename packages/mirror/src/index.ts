import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  getProjectFees,
} from './Mirror.js'
import type {
  ActionParams,
  MintActionParams,
} from '@rabbitholegg/questdk-plugin-utils'

export const Mirror: IActionPlugin = {
  pluginId: 'mirror',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  getProjectFees: async (params: ActionParams) =>
    getProjectFees(params as unknown as MintActionParams),
}
