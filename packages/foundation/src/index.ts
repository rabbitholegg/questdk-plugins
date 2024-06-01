import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
} from './Foundation'

export const Foundation: IActionPlugin = {
  pluginId: 'foundation',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
}
