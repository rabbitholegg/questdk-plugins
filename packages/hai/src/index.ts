import { type IActionPlugin } from '@rabbitholegg/questdk'

import { getSupportedChainIds, getSupportedTokenAddresses, stake } from './Hai'

export const Hai: IActionPlugin = {
  pluginId: 'hai',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  stake,
}
