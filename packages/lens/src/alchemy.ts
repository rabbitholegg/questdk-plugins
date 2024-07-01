import { Alchemy, Network } from 'alchemy-sdk'

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
  requestTimeout: 2000,
}

export const alchemy = new Alchemy(settings)
