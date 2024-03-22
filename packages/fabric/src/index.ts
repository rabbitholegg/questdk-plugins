import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Fabric.js'

export const Fabric: IActionPlugin = {
  pluginId: 'fabric',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
}
