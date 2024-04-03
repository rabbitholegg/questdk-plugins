import {
  type ActionParams,
  type IActionPlugin,
  type MintActionParams,
} from '@rabbitholegg/questdk-plugin-utils'

import {
  getFees,
  getMintIntent,
  getProjectFees,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
  simulateMint,
} from './Paragraph.js'

export const Paragraph: IActionPlugin = {
  pluginId: 'paragraph',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
  getProjectFees: async (params: ActionParams) =>
    getProjectFees(params as unknown as MintActionParams),
  getFees: async (params: ActionParams) =>
    getFees(params as unknown as MintActionParams),
  getMintIntent,
  simulateMint,
}
