import { z } from 'zod'

export const UserSchema = z
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

export const UsersResponseSchema = z.object({
  users: z.array(UserSchema),
})

export const UserSearchSchema = z.object({
  result: UsersResponseSchema,
})

export type UsersResponse = z.infer<typeof UsersResponseSchema>
export type User = z.infer<typeof UserSchema>
export type UserSearch = z.infer<typeof UserSearchSchema>

// this is a partial schema solely to support recasts
export const ConversationSchema = z.object({
  cast: z.object({
    reactions: z.object({
      recasts: z.array(
        z.object({
          fid: z.number(),
          fname: z.string(),
        }),
      ),
    }),
    viewer_context: z.object({
      liked: z.boolean().optional(),
      recasted: z.boolean().optional(),
    }),
  }),
}).passthrough()

// see https://github.com/neynarxyz/OAS/blob/4012289342260697c85dd373b7e459e76626b151/src/v2/spec.yaml#L714
export const ConversationResponseSchema = z.object({
  conversation: ConversationSchema,
})

export type ConversationResponse = z.infer<typeof ConversationResponseSchema>
export type Conversation = z.infer<typeof ConversationSchema>

// this is a partial schema solely to support following
// https://github.com/neynarxyz/OAS/blob/4012289342260697c85dd373b7e459e76626b151/src/v2/spec.yaml#L907
export const ChannelSchema = z.object({
  id: z.string(),
  name: z.string(),
  viewer_context: z.object({
    following: z.boolean().optional(),
  }),
}).passthrough()

// see https://github.com/neynarxyz/OAS/blob/4012289342260697c85dd373b7e459e76626b151/src/v2/spec.yaml#L964
export const ChannelsResponseSchema = z.object({
  channels: z.array(ChannelSchema),
}).passthrough()

export type ChannelsResponse = z.infer<typeof ChannelsResponseSchema>
export type Channel = z.infer<typeof ChannelSchema>
