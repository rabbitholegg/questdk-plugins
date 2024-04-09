import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  stake,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Orbit.js'

export const Orbit: IActionPlugin = {
  pluginId: 'orbit',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  stake,
}
