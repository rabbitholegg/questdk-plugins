import { z } from 'zod'

export const FollowerSchema = z
  .object({
    object: z.string(),
    custody_address: z.string().optional(),
    fid: z.number(),
    username: z.string(),
    viewer_context: z.object({
      following: z.boolean().optional(),
    }),
  })
  .passthrough()

export const FollowersResponseSchema = z.object({
  users: z.array(FollowerSchema),
})

export type FollowersResponse = z.infer<typeof FollowersResponseSchema>
export type Follower = z.infer<typeof FollowerSchema>

// this is a partial schema solely to support recasts
export const ConversationSchema = z.object({
  cast: z.object({
    reactions: z.object({
      recasts: z.array(z.object({
        fid: z.number(),
        fname: z.string(),
      })),
    }),
  }),
})

// see https://github.com/neynarxyz/OAS/blob/4012289342260697c85dd373b7e459e76626b151/src/v2/spec.yaml#L714
export const ConversationResponseSchema = z.object({
  conversation: ConversationSchema,
})

export type ConversationResponse = z.infer<typeof ConversationResponseSchema>
export type Conversation = z.infer<typeof ConversationSchema>
