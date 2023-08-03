import {
  type ActionParams,
  ActionType,
  type BridgeActionParams,
  type IActionPlugin,
  type MintActionParams,
  type SwapActionParams,
} from '@rabbitholegg/questdk'

import { Connext } from '@rabbitholegg/questdk-plugin-connext'
import { Uniswap } from '@rabbitholegg/questdk-plugin-uniswap'

export const plugins: Record<string, IActionPlugin> = {
  [Connext.pluginId]: Connext,
  [Uniswap.pluginId]: Uniswap,
}

export const getPlugin = (pluginId: string) => {
  const plugin = plugins[pluginId]
  if (!plugin) {
    throw new Error(`Unknown plugin "${pluginId}"`)
  }
  return plugin
}

export const executePlugin = (
  plugin: IActionPlugin,
  actionType: ActionType,
  params: ActionParams,
) => {
  switch (actionType) {
    case ActionType.Bridge:
      return plugin.bridge(params as unknown as BridgeActionParams)
    case ActionType.Swap:
      return plugin.swap(params as unknown as SwapActionParams)
    case ActionType.Mint:
      return plugin.mint(params as unknown as MintActionParams)
    default:
      throw new Error(`Unknown action type "${actionType}"`)
  }
}
