import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  bridge,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './BaseBridge.js'

export const BaseBridge: IActionPlugin = {
  pluginId: 'basebridge',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge,
}
