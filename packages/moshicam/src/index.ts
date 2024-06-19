import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  getMintIntent,
  getFees,
  getProjectFees,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
  simulateMint,
} from './Moshicam'

export const Moshicam: IActionPlugin = {
  pluginId: 'moshicam',
  getFees,
  getMintIntent,
  getProjectFees
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
  simulateMint,
}
