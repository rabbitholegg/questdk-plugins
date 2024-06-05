import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  validate,
  validateCollect,
} from './Lens'

export const Lens: IActionPlugin = {
  pluginId: 'lens',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  validate,
  validateCollect,
}
