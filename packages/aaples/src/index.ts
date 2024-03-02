import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  bridge,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Aaples.js'

export const Aaples: IActionPlugin = {
  pluginId: 'aaples',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge,
}
