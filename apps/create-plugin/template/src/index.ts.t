import {
  type IActionPlugin,
} from '@rabbitholegg/questdk'

import {
  {{lowercase actionType}},
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './{{capitalize projectName}}.js'

export const {{capitalize projectName}} : IActionPlugin = {
  pluginId: "{{projectName}}",
  getSupportedTokenAddresses,
  getSupportedChainIds,
  {{lowercase actionType}}, 
}
