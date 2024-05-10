import { Chains } from '../constants/chain-ids'
import { RELAYER_ADDRESSES } from '../constants/layer-zero-relayer-addresses'
import { Address } from 'viem'

export function getExitAddresses(
  chainId: Chains,
  additionalAddresses?: Address | Address[],
): { $or: Address[] } {
  const relayerAddress = RELAYER_ADDRESSES[chainId]
  let addresses: Address[] = relayerAddress ? [relayerAddress] : []

  if (additionalAddresses) {
    if (typeof additionalAddresses === 'string') {
      addresses.push(additionalAddresses)
    } else {
      addresses.push(...additionalAddresses)
    }
  }

  addresses = addresses.map((address) => address.toLowerCase() as Address)

  return {
    $or: addresses,
  }
}
