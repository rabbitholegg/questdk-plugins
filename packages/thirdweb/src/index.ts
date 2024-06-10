import { type IActionPlugin } from '@rabbitholegg/questdk'
import {
  type ActionParams,
  type MintActionParams,
} from '@rabbitholegg/questdk-plugin-utils'

import {
  getFees,
  getProjectFees,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
} from './ThirdWeb'

export const ThirdWeb: IActionPlugin = {
  pluginId: 'thirdweb',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  getFees: async (params: ActionParams) =>
    getFees(params as unknown as MintActionParams),
  getProjectFees: async (params: ActionParams) =>
    getProjectFees(params as unknown as MintActionParams),
  mint,
}
