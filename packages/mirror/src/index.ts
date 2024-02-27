import {
  type IActionPlugin,
  PluginActionNotImplementedError,
  ActionParams,
  MintActionParams
} from '@rabbitholegg/questdk-plugin-utils'

import {
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  getProjectFees,
  getMintIntent,
} from './Mirror.js'

export const Mirror: IActionPlugin = {
  pluginId: 'mirror',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
  bridge: async () => new PluginActionNotImplementedError(),
  swap: async () => new PluginActionNotImplementedError(),
  getProjectFees: async (params: ActionParams) =>
  getProjectFees(params as unknown as MintActionParams),
  getMintIntent,
}
