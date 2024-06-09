import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  getSupportedChainIds,
  getSupportedTokenAddresses,
  mint,
} from './ThirdWeb'

export const ThirdWeb: IActionPlugin = {
  pluginId: 'thirdweb',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  mint,
}
