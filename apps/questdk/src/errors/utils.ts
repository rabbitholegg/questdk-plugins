import type { Address } from 'viem'

import { version } from './version.js'

export const getContractAddress = (address: Address) => address
export const getUrl = (url: string) => url
export const getVersion = () => `questdk@${version}`
