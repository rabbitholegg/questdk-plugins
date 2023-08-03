import { getAddress } from 'viem'

/**
 * Returns the quest factory address based on the chain ID.
 * @param {number} chainId - The ID of the blockchain network.
 * @returns {string} The quest factory address.
 */
export const QUEST_FACTORY_ADDRESS = (chainId: number) => {
  switch (chainId) {
    default:
      return getAddress('0x53431b13e9d353676658e6da81186301fee31526')
  }
}
