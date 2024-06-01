import { ApolloClient, InMemoryCache } from '@apollo/client'

const APIURL = 'https://api-v2.lens.dev/'

export const apolloClient= new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
})