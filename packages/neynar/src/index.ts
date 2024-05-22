import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  validate,
  validateFollow,
  validateRecast,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Neynar'

export const Neynar: IActionPlugin = {
  pluginId: 'neynar',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  validate,
  validateFollow,
  validateRecast,
}
