import { z } from 'zod'

export const FollowerSchema = z.object({
  fid: z.number(),
  username: z.string(),
  display_name: z.string(),
  custody_address: z.string(),
  pfp_url: z.string().optional(),
  profile: z.object({
    follower_count: z.number(),
    following_count: z.number(),
    verifications: z.array(z.string()),
    verified_addresses: z.record(z.unknown()),
    active_status: z.union([z.literal('active'), z.literal('inactive')]),
    power_badge: z.boolean(),
    viewer_context: z.record(z.unknown()).optional(),
  }),
})

export const FollowersResponseSchema = z.object({
  users: z.array(FollowerSchema),
  next: z.object({
    cursor: z.union([z.string(), z.null()]),
  }),
})

export type FollowersResponse = z.infer<typeof FollowersResponseSchema>
export type Follower = z.infer<typeof FollowerSchema>