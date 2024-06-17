import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Moshicam'

export const Moshicam: IActionPlugin = {
  pluginId: 'moshicam',
  getMintIntent,
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
}
