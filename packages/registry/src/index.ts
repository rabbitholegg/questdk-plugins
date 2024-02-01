import {
  type ActionParams,
  ActionType,
  type BridgeActionParams,
  type DelegateActionParams,
  type IActionPlugin,
  type MintActionParams,
  type OptionsActionParams,
  PluginActionNotImplementedError,
  type QuestActionParams,
  type StakeActionParams,
  type SwapActionParams,
  type TransactionFilter,
} from '@rabbitholegg/questdk'

import { Across } from '@rabbitholegg/questdk-plugin-across'
import { Arbitrum } from '@rabbitholegg/questdk-plugin-arbitrum'
import { Balancer } from '@rabbitholegg/questdk-plugin-balancer'
import { BasePaint } from '@rabbitholegg/questdk-plugin-basepaint'
import { Camelot } from '@rabbitholegg/questdk-plugin-camelot'
import { Connext } from '@rabbitholegg/questdk-plugin-connext'
import { GMX } from '@rabbitholegg/questdk-plugin-gmx'
import { HandleFi } from '@rabbitholegg/questdk-plugin-handlefi'
import { Hop } from '@rabbitholegg/questdk-plugin-hop'
import { Hyphen } from '@rabbitholegg/questdk-plugin-hyphen'
import { Llama } from '@rabbitholegg/questdk-plugin-llama'
import { Mirror } from '@rabbitholegg/questdk-plugin-mirror'
import { Mux } from '@rabbitholegg/questdk-plugin-mux'
import { OkuTrade } from '@rabbitholegg/questdk-plugin-okutrade'
import { Optimism } from '@rabbitholegg/questdk-plugin-optimism'
import { Paraswap } from '@rabbitholegg/questdk-plugin-paraswap'
import { Pendle } from '@rabbitholegg/questdk-plugin-pendle'
import { Polygon } from '@rabbitholegg/questdk-plugin-polygon'
import { Rabbithole } from '@rabbitholegg/questdk-plugin-rabbithole'
import { Soundxyz } from '@rabbitholegg/questdk-plugin-soundxyz'
import { Stargate } from '@rabbitholegg/questdk-plugin-stargate'
import { Sushi } from '@rabbitholegg/questdk-plugin-sushi'
import { Symbiosis } from '@rabbitholegg/questdk-plugin-symbiosis'
import { Synapse } from '@rabbitholegg/questdk-plugin-synapse'
import { Tally } from '@rabbitholegg/questdk-plugin-tally'
import { TraderJoe } from '@rabbitholegg/questdk-plugin-traderjoe'
import { Treasure } from '@rabbitholegg/questdk-plugin-treasure'
import { Uniswap } from '@rabbitholegg/questdk-plugin-uniswap'
import { Vela } from '@rabbitholegg/questdk-plugin-vela'
import { WooFi } from '@rabbitholegg/questdk-plugin-woofi'
import { Zora } from '@rabbitholegg/questdk-plugin-zora'
import { Boost } from '@rabbitholegg/questdk-plugin-boost'
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
  [Pendle.pluginId]: Pendle,
  [HandleFi.pluginId]: HandleFi,
  [Mirror.pluginId]: Mirror,
  [Soundxyz.pluginId]: Soundxyz,
  [Mux.pluginId]: Mux,
  [Vela.pluginId]: Vela,
  [Boost.pluginId]: Boost,
  [Llama.pluginId]: Llama,
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
