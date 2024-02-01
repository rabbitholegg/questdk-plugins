import {
  type IActionPlugin,
  PluginActionNotImplementedError,
} from '@rabbitholegg/questdk'

import {
  {{#each actionTypes}}
  {{lowercase this}}, 
  {{/each}}
  getSupportedChainIds,
  getSupportedTokenAddresses,
} from './{{projectName}}.js'

// Replace *project* with the name of the project
export const {{projectName}} : IActionPlugin = {
  pluginId: "{{projectName}}",
  getSupportedTokenAddresses,
  getSupportedChainIds,
  {{#each actionTypes}}
  {{lowercase this}}, 
  {{/each}}


}
