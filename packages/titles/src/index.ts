import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  create,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Titles'

export const Titles: IActionPlugin = {
  pluginId: 'titles',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  create,
}
