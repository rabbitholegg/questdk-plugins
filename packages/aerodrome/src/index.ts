import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  swap,
} from './Aerodrome.js'

export const Aerodrome: IActionPlugin = {
  pluginId: 'aerodrome',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  swap,
}
