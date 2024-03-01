import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Apples.js'

export const Apples: IActionPlugin = {
  pluginId: 'apples',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
}
