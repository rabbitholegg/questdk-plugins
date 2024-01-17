import {
  type ActionParams,
  ActionType,
  type BridgeActionParams,
  type IActionPlugin,
  PluginActionNotImplementedError,
  type MintActionParams,
  type OptionsActionParams,
  type SwapActionParams,
  type QuestActionParams,
  type DelegateActionParams,
  type TransactionFilter,
  type StakeActionParams,
} from '@rabbitholegg/questdk'

import { Connext } from '@rabbitholegg/questdk-plugin-connext'
import { Uniswap } from '@rabbitholegg/questdk-plugin-uniswap'
import { Stargate } from '@rabbitholegg/questdk-plugin-stargate'
import { Across } from '@rabbitholegg/questdk-plugin-across'
import { Polygon } from '@rabbitholegg/questdk-plugin-polygon'
import { Optimism } from '@rabbitholegg/questdk-plugin-optimism'
import { Hop } from '@rabbitholegg/questdk-plugin-hop'
import { Arbitrum } from '@rabbitholegg/questdk-plugin-arbitrum'
import { GMX } from '@rabbitholegg/questdk-plugin-gmx'
import { Camelot } from '@rabbitholegg/questdk-plugin-camelot'
import { Tally } from '@rabbitholegg/questdk-plugin-tally'
import { BasePaint } from '@rabbitholegg/questdk-plugin-basepaint'
import { Hyphen } from '@rabbitholegg/questdk-plugin-hyphen'
import { Paraswap } from '@rabbitholegg/questdk-plugin-paraswap'
import { Rabbithole } from '@rabbitholegg/questdk-plugin-rabbithole'
import { Symbiosis } from '@rabbitholegg/questdk-plugin-symbiosis'
import { OkuTrade } from '@rabbitholegg/questdk-plugin-okutrade'
import { Zora } from '@rabbitholegg/questdk-plugin-zora'
import { Balancer } from '@rabbitholegg/questdk-plugin-balancer'
import { TraderJoe } from '@rabbitholegg/questdk-plugin-traderjoe'
import { Synapse } from '@rabbitholegg/questdk-plugin-synapse'
import { WooFi } from '@rabbitholegg/questdk-plugin-woofi'
import { Sushi } from '@rabbitholegg/questdk-plugin-sushi'
import { Treasure } from '@rabbitholegg/questdk-plugin-treasure'
import { HandleFi } from '@rabbitholegg/questdk-plugin-handlefi'
import { Mirror } from '@rabbitholegg/questdk-plugin-mirror'
import { Soundxyz } from '@rabbitholegg/questdk-plugin-soundxyz'
import { Mux } from '@rabbitholegg/questdk-plugin-mux'
import { ENTRYPOINT } from './contract-addresses'

export const plugins: Record<string, IActionPlugin> = {
  [Connext.pluginId]: Connext,
  [Uniswap.pluginId]: Uniswap,
  [Stargate.pluginId]: Stargate,
  [Across.pluginId]: Across,
  [Polygon.pluginId]: Polygon,
  [Optimism.pluginId]: Optimism,
  [Hop.pluginId]: Hop,
  [Arbitrum.pluginId]: Arbitrum,
  [GMX.pluginId]: GMX,
  [Camelot.pluginId]: Camelot,
  [Tally.pluginId]: Tally,
  [BasePaint.pluginId]: BasePaint,
  [Hyphen.pluginId]: Hyphen,
  [Paraswap.pluginId]: Paraswap,
  [Rabbithole.pluginId]: Rabbithole,
  [Symbiosis.pluginId]: Symbiosis,
  [OkuTrade.pluginId]: OkuTrade,
  [Zora.pluginId]: Zora,
  [Balancer.pluginId]: Balancer,
  [TraderJoe.pluginId]: TraderJoe,
  [Synapse.pluginId]: Synapse,
  [WooFi.pluginId]: WooFi,
  [Sushi.pluginId]: Sushi,
  [Treasure.pluginId]: Treasure,
  [HandleFi.pluginId]: HandleFi,
  [Mirror.pluginId]: Mirror,
  [Soundxyz.pluginId]: Soundxyz,
  [Mux.pluginId]: Mux,
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
): Promise<TransactionFilter | PluginActionNotImplementedError> => {
  switch (actionType) {
    case ActionType.Bridge:
      return plugin.bridge(params as unknown as BridgeActionParams)
    case ActionType.Swap:
      return plugin.swap(params as unknown as SwapActionParams)
    case ActionType.Mint:
      return plugin.mint(params as unknown as MintActionParams)
    case ActionType.Delegate: {
      if (plugin.delegate === undefined) {
        return Promise.reject(new PluginActionNotImplementedError())
      } else return plugin.delegate(params as unknown as DelegateActionParams)
    }
    case ActionType.Quest: {
      if (plugin.quest === undefined) {
        return Promise.reject(new PluginActionNotImplementedError())
      } else return plugin.quest(params as unknown as QuestActionParams)
    }
    case ActionType.Stake: {
      if (plugin.stake === undefined) {
        return Promise.reject(new PluginActionNotImplementedError())
      } else return plugin.stake(params as unknown as StakeActionParams)
    }
    case ActionType.Options: {
      if (plugin.options === undefined) {
        return Promise.reject(new PluginActionNotImplementedError())
      } else return plugin.options(params as unknown as OptionsActionParams)
    }
    default:
      throw new Error(`Unknown action type "${actionType}"`)
  }
}

export const getIndexedContracts = (_chainId: number) => {
  return [ENTRYPOINT]
}
