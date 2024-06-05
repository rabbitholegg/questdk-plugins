import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { Address } from 'viem'

const APIURL = 'https://api-v2.lens.dev/'

export const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
})

type Profile = {
  ownedBy: {
    address: Address
  }
}

type QueryResponse = {
  data: {
    whoActedOnPublication: {
      items: Profile[]
      pageInfo: {
        next: string | null
      }
    }
  }
}

export const WHO_ACTED_ON_PUBLICATION = gql`
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

export async function hasAddressCollectedPost(postId: string, address: string) {
  let cursor = null
  let hasNextPage = true

  while (hasNextPage) {
    const { data } = (await client.query({
      query: WHO_ACTED_ON_PUBLICATION,
      variables: {
        request: {
          on: postId,
          where: {
            anyOf: [
              {
                category: 'COLLECT',
              },
            ],
          },
          cursor: cursor,
        },
      },
    })) as QueryResponse
    const { items, pageInfo } = data.whoActedOnPublication
    const collected = items.find(
      (item: Profile) =>
        item.ownedBy.address.toLowerCase() === address.toLowerCase(),
    )
    if (collected) {
      return true
    }
    cursor = pageInfo.next
    hasNextPage = cursor !== null
  }
  return false
}
