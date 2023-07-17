import { getAddress } from 'viem'

export const QUEST_FACTORY_ADDRESS = (chainId: number) => {
  switch (chainId) {
    default:
      return getAddress('0x53431b13e9d353676658e6da81186301fee31526')
  }
}
