import { type IActionPlugin } from '@rabbitholegg/questdk'

import { stake, getSupportedChainIds, getSupportedTokenAddresses } from './Hai'

export const Hai: IActionPlugin = {
  pluginId: 'hai',
  getSupportedTokenAddresses,
  getSupportedChainIds,
  stake,
}
