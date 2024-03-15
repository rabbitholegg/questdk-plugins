import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Manifold.js'

export const Manifold: IActionPlugin = {
  pluginId: 'manifold',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
}
