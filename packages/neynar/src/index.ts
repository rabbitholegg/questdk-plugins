import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  validate,
  validateFollow,
  getSupportedChainIds,
  getSupportedTokenAddresses,
  canValidate,
} from './Neynar'

export const Neynar: IActionPlugin = {
  pluginId: 'neynar',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  validate,
  validateFollow,
  canValidate,
}
