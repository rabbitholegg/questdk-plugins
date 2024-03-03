import {
  type IActionPlugin,
} from '@rabbitholegg/questdk'

import {
  bridge,
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './Noconfig.js'

export const Noconfig: IActionPlugin = {
  pluginId: "noconfig",
  getSupportedTokenAddresses,
  getSupportedChainIds,
  bridge, 
}
