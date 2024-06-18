import {
  LensClient,
  production,
  SimpleCollectOpenActionSettingsFragment,
  MultirecipientFeeCollectOpenActionSettingsFragment,
} from '@lens-protocol/client'
import { getClient } from './client'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { Address } from 'viem'

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
  const amountOwned = await checkAddressOwnsCollect(address, collectAddress)
  return amountOwned > 0n
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

export async function checkAddressOwnsCollect(
  actor: Address,
  collectAddress: Address,
) {
  const client = getClient(Chains.POLYGON_POS)
  const result = await client.readContract({
    address: collectAddress as Address,
    abi: [
      {
        inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'balanceOf',
    args: [actor],
  })
  return result
}
