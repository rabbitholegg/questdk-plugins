import { executePlugin, getPlugin, plugins } from './index.js'
import {
  type ActionParams,
  ActionType,
  type IActionPlugin,
} from '@rabbitholegg/questdk'
import { Connext } from '@rabbitholegg/questdk-plugin-connext'
import { Uniswap } from '@rabbitholegg/questdk-plugin-uniswap'
import { describe, expect, test, vi } from 'vitest'

describe('plugins', () => {
  test('should contain Connext and Uniswap plugins', () => {
    expect(plugins[Connext.pluginId]).toBe(Connext)
    expect(plugins[Uniswap.pluginId]).toBe(Uniswap)
  })
})

describe('getPlugin', () => {
  test('should return the correct plugin', () => {
    expect(getPlugin(Connext.pluginId)).toBe(Connext)
    expect(getPlugin(Uniswap.pluginId)).toBe(Uniswap)
  })

  test('should throw an error for unknown plugin', () => {
    expect(() => getPlugin('unknown')).toThrow('Unknown plugin "unknown"')
  })
})

describe('executePlugin', () => {
  const mockParams = {} as ActionParams

  test('should execute the correct action', async () => {
    const mockPlugin = {
      bridge: vi.fn(),
      swap: vi.fn(),
      mint: vi.fn(),
      delegate: vi.fn(),
    } as unknown as IActionPlugin

    await executePlugin(mockPlugin, ActionType.Bridge, mockParams)
    expect(mockPlugin.bridge).toHaveBeenCalledWith(mockParams)

    await executePlugin(mockPlugin, ActionType.Swap, mockParams)
    expect(mockPlugin.swap).toHaveBeenCalledWith(mockParams)

    await executePlugin(mockPlugin, ActionType.Mint, mockParams)
    expect(mockPlugin.mint).toHaveBeenCalledWith(mockParams)

    await executePlugin(mockPlugin, ActionType.Delegate, mockParams)
    expect(mockPlugin.delegate).toHaveBeenCalledWith(mockParams)
  })

  test('should throw an error for unknown action type', () => {
    const mockPlugin = {
      bridge: vi.fn(),
      swap: vi.fn(),
      mint: vi.fn(),
    } as unknown as IActionPlugin

    expect(() =>
      executePlugin(mockPlugin, 'unknown' as ActionType, mockParams),
    ).toThrow('Unknown action type "unknown"')
  })
})
