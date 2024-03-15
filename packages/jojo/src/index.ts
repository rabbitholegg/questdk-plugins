import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  stake,
} from './JOJO'

export const JOJO: IActionPlugin = {
  pluginId: 'jojo',
  stake,
  getSupportedTokenAddresses,
  getSupportedChainIds,
}
