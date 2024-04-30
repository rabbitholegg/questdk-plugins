import { describe, it, expect, beforeEach, vi, MockedFunction } from 'vitest'
import { validateFollow } from './Neynar'
import axios from 'axios'

vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          eject: vi.fn(),
        },
      },
    },
  }
})
describe('validateFollow function', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should return true if the actor is a follower of the target', async () => {
    ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      status: 200,
      data: {
        data: {
          users: [{ custody_address: 'actor_address' }],
          next: { cursor: null },
        },
      },
    })

    const result = await validateFollow(
      { target: 'target_fid' },
      { actor: 'actor_address' },
    )
    expect(result).toBe(true)
  })

  it('should return false if the actor is not a follower of the target', async () => {
    ;(axios.get as MockedFunction<typeof axios.get>).mockResolvedValue({
      status: 200,
      data: {
        data: {
          users: [{ custody_address: 'not_actor_address' }],
          next: { cursor: null },
        },
      },
    })

    const result = await validateFollow(
      { target: 'target_fid' },
      { actor: 'actor_address' },
    )
    expect(result).toBe(false)
  })

  it('should handle pagination correctly', async () => {
    ;(axios.get as MockedFunction<typeof axios.get>)
      .mockResolvedValueOnce({
        status: 200,
        data: {
          data: {
            users: [],
            next: { cursor: '100' },
          },
        },
      })
      .mockResolvedValueOnce({
        status: 200,
        data: {
          data: {
            users: [{ custody_address: 'actor_address' }],
            next: { cursor: null },
          },
        },
      })

    const result = await validateFollow(
      { target: 'target_fid' },
      { actor: 'actor_address' },
    )
    expect(result).toBe(true)
    expect(axios.get).toHaveBeenCalledTimes(2) // Ensure pagination was handled correctly
  })

  it('should return false on API failure', async () => {
    ;(axios.get as MockedFunction<typeof axios.get>).mockRejectedValue(
      new Error('API failure'),
    )

    const result = await validateFollow(
      { target: 'target_fid' },
      { actor: 'actor_address' },
    )
    expect(result).toBe(false)
  })
})
