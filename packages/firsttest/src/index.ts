import {
  type IActionPlugin,
} from '@rabbitholegg/questdk'

import {
  mint,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './FirstTest.js'

export const FirstTest: IActionPlugin = {
  pluginId: "firsttest",
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint, 
}
