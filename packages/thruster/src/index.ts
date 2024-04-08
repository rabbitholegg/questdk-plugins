import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  swap,
} from './Thruster.js'
import { type IActionPlugin } from '@rabbitholegg/questdk'

export const Thruster: IActionPlugin = {
  pluginId: 'thruster',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  swap,
}
