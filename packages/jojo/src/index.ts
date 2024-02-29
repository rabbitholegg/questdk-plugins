import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  stake,
} from './JOJO.js'

// Replace *project* with the name of the project
export const JOJO: IActionPlugin = {
  pluginId: 'jojo',
  stake,
  getSupportedTokenAddresses,
  getSupportedChainIds,
}
