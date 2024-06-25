import {
  LensClient,
  production,
  type SimpleCollectOpenActionSettingsFragment,
  type MultirecipientFeeCollectOpenActionSettingsFragment,
} from '@lens-protocol/client'
import axios from 'axios'
import dotenv from 'dotenv'
import { Address } from 'viem'

dotenv.config()

const lensClient = new LensClient({
  environment: production,
})

export async function hasAddressCollectedPost(
  postId: string,
  address: Address,
) {
  const collectAddress = await getCollectAddress(postId)
  if (collectAddress === null) {
    return false
  }
  return await checkAddressMintedCollect(address, collectAddress)
}

export async function getCollectAddress(postId: string) {
  const result = await lensClient.publication.fetch({
    forId: postId,
  })
  if (!result || result?.__typename === 'Mirror') {
    return null
  }
  const openActions = result.openActionModules
  if (!openActions || openActions.length === 0) {
    return null
  }
  const collectActions = openActions.filter(
    (action) =>
      action.__typename === 'SimpleCollectOpenActionSettings' ||
      action.__typename === 'MultirecipientFeeCollectOpenActionSettings',
  ) as Array<
    | MultirecipientFeeCollectOpenActionSettingsFragment
    | SimpleCollectOpenActionSettingsFragment
  >

  const collectNft = collectActions.find((action) => action.collectNft)
  const collectAddress = collectNft?.collectNft?.toLowerCase()
  return (collectAddress as Address) ?? null
}

export async function checkAddressMintedCollect(
  actor: Address,
  collectAddress: Address,
) {
  try {
    return await checkMintedUsingBlockspan(actor, collectAddress)
  } catch {
    return await checkMintedUsingReservoir(actor, collectAddress)
  }
}

async function checkMintedUsingBlockspan(
  actor: Address,
  collectAddress: Address,
) {
  const baseUrl = 'https://api.blockspan.com/v1/transfers/contract'
  const params = new URLSearchParams({
    chain: 'poly-main',
    transfer_type: 'mint',
    from_address: '0x0000000000000000000000000000000000000000',
    to_address: actor,
    page_size: '1',
  })

  const options = {
    method: 'GET',
    url: `${baseUrl}/${collectAddress}?${params.toString()}`,
    headers: {
      accept: 'application/json',
      'X-API-KEY': process.env.BLOCKSPAN_API_KEY,
    },
  }

  const response = await axios.request(options)
  return Boolean(response.data?.results?.length > 0)
}

async function checkMintedUsingReservoir(
  actor: Address,
  collectAddress: Address,
) {
  const baseUrl = 'https://api-polygon.reservoir.tools/users/activity/v6'
  const params = new URLSearchParams({
    users: actor,
    collection: collectAddress,
    limit: '1',
    types: 'mint',
  })

  const options = {
    method: 'GET',
    url: `${baseUrl}?${params.toString()}`,
    headers: {
      accept: '*/*',
    },
  }

  const response = await axios.request(options)
  return Boolean(response.data?.activities?.length > 0)
}
