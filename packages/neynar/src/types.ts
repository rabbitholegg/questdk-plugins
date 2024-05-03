import { z } from 'zod'

export const FollowerSchema = z.object({
  object: z.string(),
  custody_address: z.string().optional(),
  fid: z.number(),
  username: z.string(),
  viewer_context: z.object({
    following: z.boolean().optional(),
  }),
}).passthrough()

export const FollowersResponseSchema = z.object({
  users: z.array(FollowerSchema),
})

export type FollowersResponse = z.infer<typeof FollowersResponseSchema>
export type Follower = z.infer<typeof FollowerSchema>
