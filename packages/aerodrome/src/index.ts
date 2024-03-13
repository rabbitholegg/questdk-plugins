import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  swap,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Aerodrome.js'

export const Aerodrome: IActionPlugin = {
  pluginId: 'aerodrome',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  swap,
}
