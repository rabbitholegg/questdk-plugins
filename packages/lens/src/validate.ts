import { alchemy } from './alchemy'
import {
  LensClient,
  type MultirecipientFeeCollectOpenActionSettingsFragment,
  type SimpleCollectOpenActionSettingsFragment,
  production,
} from '@lens-protocol/client'
import { GetTransfersForOwnerTransferType } from 'alchemy-sdk'
import axios from 'axios'
import { Address, zeroAddress } from 'viem'

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
  try {
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
  } catch (error) {
    console.error('Error fetching collect contract address', error)
    return null
  }
}

export async function checkAddressMintedCollect(
  actor: Address,
  collectAddress: Address,
) {
  try {
    return await checkMintedUsingAlchemy(actor, collectAddress)
  } catch (err) {
    console.error('Error while using alchemy api', err)
    return await checkMintedUsingReservoir(actor, collectAddress)
  }
}

async function checkMintedUsingAlchemy(
  actor: Address,
  collectAddress: Address,
) {
  // alchemy will work without an api key, but we risk being rate-limited
  if (!process.env.ALCHEMY_API_KEY) {
    console.error('Alchemy API key not found')
  }

  const options = {
    contractAddresses: [collectAddress],
  }

  const transfers = await alchemy.nft.getTransfersForOwner(
    actor,
    GetTransfersForOwnerTransferType.TO,
    options,
  )

  // only count nfts that originate from zeroAddress
  const mintedNfts = transfers.nfts.filter((nft) => nft.from === zeroAddress)

  return Boolean(mintedNfts.length > 0)
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
