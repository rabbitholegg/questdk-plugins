import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  stake,
} from './JOJO.js'

export const JOJO: IActionPlugin = {
  pluginId: 'jojo',
  stake,
  getSupportedTokenAddresses,
  getSupportedChainIds,
}
