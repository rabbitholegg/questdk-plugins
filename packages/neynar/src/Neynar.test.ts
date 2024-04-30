import { describe, it, expect, beforeEach } from 'vitest'
import { validateFollow } from './Neynar'

// Build out Axios mock
const mockedAxios = {}

describe('validateFollow function', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset()
  })

  it('should return true if the actor is a follower of the target', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        users: [{ custody_address: 'actor_address' }],
        next: { cursor: null },
      },
    })

    const result = await validateFollow({ target: 'target_fid' }, { actor: 'actor_address' })
    expect(result).toBe(true)
  })

  it('should return false if the actor is not a follower of the target', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        users: [{ custody_address: 'different_address' }],
        next: { cursor: null },
      },
    })

    const result = await validateFollow({ target: 'target_fid' }, { actor: 'actor_address' })
    expect(result).toBe(false)
  })

  it('should handle pagination correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        users: [{ custody_address: 'different_address' }],
        next: { cursor: 'next_cursor' },
      },
    }).mockResolvedValueOnce({
      data: {
        users: [{ custody_address: 'actor_address' }],
        next: { cursor: null },
      },
    })

    const result = await validateFollow({ target: 'target_fid' }, { actor: 'actor_address' })
    expect(result).toBe(true)
    expect(mockedAxios.get).toHaveBeenCalledTimes(2) // Ensure pagination was handled
  })

  it('should return false on API failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('API failure'))

    const result = await validateFollow({ target: 'target_fid' }, { actor: 'actor_address' })
    expect(result).toBe(false)
  })
})