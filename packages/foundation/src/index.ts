import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Foundation'

export const Foundation: IActionPlugin = {
  pluginId: 'foundation',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
}
