import { Chains } from '../constants/chain-ids';
import { RELAYER_ADDRESSES } from '../constants/layer-zero-relayer-addresses';

export function getExitAddresses(chainId: Chains): string[] {
  const relayerAddress = RELAYER_ADDRESSES[chainId];
  if (relayerAddress) {
      return [relayerAddress];
  } else {
      return [];
  }
}