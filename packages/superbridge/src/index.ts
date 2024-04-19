import { type IActionPlugin } from '@rabbitholegg/questdk'

import {
  bridge,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Superbridge'

export const Superbridge: IActionPlugin = {
  pluginId: 'superbridge',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge,
}
