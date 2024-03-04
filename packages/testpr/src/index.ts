import {
  type IActionPlugin,
} from '@rabbitholegg/questdk'

import {
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './TestPr.js'

export const TestPr: IActionPlugin = {
  pluginId: "testpr",
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint, 
}
