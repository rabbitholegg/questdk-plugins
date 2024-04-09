import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  bridge,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Base.js'

export const Base: IActionPlugin = {
  pluginId: 'base',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge,
}
