import { type IActionPlugin } from '@rabbitholegg/questdk'

import { getSupportedChainIds, getSupportedTokenAddresses } from './Lens'

export const Lens: IActionPlugin = {
  pluginId: 'lens',
  getSupportedTokenAddresses,
  getSupportedChainIds,
}
