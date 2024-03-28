import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
} from './Fabric.js'

export const Fabric: IActionPlugin = {
  pluginId: 'fabric',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
}
