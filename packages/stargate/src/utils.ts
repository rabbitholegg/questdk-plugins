import { getSupportedChainIds, getSupportedTokenAddresses } from './Stargate'

/**
 * Grabs chain IDs from chains that have supported tokens based on the output
 * of `getSupportedTokenAddresses`.
 *
 * @returns A promise that resolves to an array of filtered chain IDs (numbers).
 */
export async function getFilteredChainIds(): Promise<number[]> {
  const chainIds = await getSupportedChainIds()
  const filteredChainIds = await Promise.all(
    chainIds.map(async (chainId) => {
      const tokens = await getSupportedTokenAddresses(chainId)
      return tokens.length !== 0 ? chainId : null
    }),
  )
  return filteredChainIds.filter((id) => id !== null) as number[]
}

export function shortenAddress(address: string): string {
  const prefix = address.slice(0, 6)
  const suffix = address.slice(-4)
  return `${prefix}...${suffix}`
}
