import { ActionVariables, PaginatedResponse, Profile } from './types'
import { ApolloClient, DocumentNode, InMemoryCache, gql } from '@apollo/client'

const APIURL = 'https://api-v2.lens.dev/'

export const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
})

const WHO_ACTED_ON_PUBLICATION = gql`
  query WhoActedOnPublication($request: WhoActedOnPublicationRequest!) {
    whoActedOnPublication(request: $request) {
      items {
        ownedBy {
          address
        }
      }
      pageInfo {
        next
      }
    }
  }
`

export async function hasAddressPerformedAction(
  address: string,
  actionQuery: DocumentNode,
  actionDataKey: string,
  actionVariables: ActionVariables,
) {
  let cursor = null
  let hasNextPage = true
  while (hasNextPage) {
    const { data } = (await client.query({
      query: actionQuery,
      variables: {
        request: {
          ...actionVariables,
          cursor: cursor,
        },
      },
    })) as PaginatedResponse<Profile>

    const { items, pageInfo } = data[actionDataKey]
    const found = items.find(
      (item: Profile) =>
        item.ownedBy.address.toLowerCase() === address.toLowerCase(),
    )
    if (found) {
      return true
    }
    cursor = pageInfo.next
    hasNextPage = cursor !== null
  }
  return false
}

export async function hasAddressCollectedPost(postId: string, address: string) {
  return hasAddressPerformedAction(
    address,
    WHO_ACTED_ON_PUBLICATION,
    'whoActedOnPublication',
    {
      on: postId,
      where: {
        anyOf: [{ category: 'COLLECT' }],
      },
    },
  )
}
