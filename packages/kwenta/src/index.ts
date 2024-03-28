import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  options,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Kwenta.js'

export const Kwenta: IActionPlugin = {
  pluginId: 'kwenta',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  options,
}
