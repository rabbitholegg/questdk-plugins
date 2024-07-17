import {
  type ActionParams,
  type IActionPlugin,
  type MintActionParams,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk-plugin-utils'

import {
  create,
  getDynamicNameParams,
  getExternalUrl,
  getFees,
  getMintIntent,
  getProjectFees,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
  simulateMint,
  validate,
} from './Zora'
import { validatePremint } from './validate'

export const Zora: IActionPlugin = {
  pluginId: 'zora',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge: async () => new PluginActionNotImplementedError(),
  create,
  swap: async () => new PluginActionNotImplementedError(),
  mint,
  getDynamicNameParams,
  getExternalUrl: async (params: ActionParams) =>
    getExternalUrl(params as unknown as MintActionParams),
  getProjectFees: async (params: ActionParams) =>
    getProjectFees(params as unknown as MintActionParams),
  getFees: async (params: ActionParams) =>
    getFees(params as unknown as MintActionParams),
  getMintIntent,
  simulateMint,
  validate,
  validatePremint,
}
