import {
  type IActionPlugin,
} from '@rabbitholegg/questdk'

import {
  delegate,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Neynar'

export const Neynar: IActionPlugin = {
  pluginId: "neynar",
  getSupportedTokenAddresses,
  getSupportedChainIds,
  delegate, 
}
