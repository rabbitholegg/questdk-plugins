import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  options,
} from './Kwenta.js'

export const Kwenta: IActionPlugin = {
  pluginId: 'kwenta',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  options,
}
