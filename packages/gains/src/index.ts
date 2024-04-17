import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  options,
} from './Gains.js'

export const Gains: IActionPlugin = {
  pluginId: 'gains',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  options,
}
