import { getAddress } from 'viem'

/**
 * Returns the quest factory address based on the chain ID.
 * @param {number} chainId - The ID of the blockchain network.
 * @returns {string} The quest factory address.
 */
export const QUEST_FACTORY_ADDRESS = (chainId: number) => {
  switch (chainId) {
    default:
      return getAddress('0x52629961F71C1C2564C5aa22372CB1b9fa9EBA3E')
  }
}
