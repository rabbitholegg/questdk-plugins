import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  stake,
} from './Orbit.js'

export const Orbit: IActionPlugin = {
  pluginId: 'orbit',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  stake,
}
