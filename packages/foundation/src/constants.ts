import { DROP_FACTORY_ABI, MULTI_TOKEN_ABI } from './abi'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type AbiFunction, type Address, getAbiItem } from 'viem'

// ERC-721
const DROP_FACTORY_ETHEREUM = '0x53f451165ba6fdbe39a134673d13948261b2334a'
const DROP_FACTORY_BASE = '0x62037b26fff91929655aa3a060f327b47d1e2b3e'

export const CHAIN_TO_CONTRACT_ADDRESS: Record<number, Address> = {
  [Chains.ETHEREUM]: DROP_FACTORY_ETHEREUM,
  [Chains.BASE]: DROP_FACTORY_BASE,
}

export const FIXED_PRICE_FRAGMENTS = DROP_FACTORY_ABI.filter(({ name }) =>
  [
    'mintFromFixedPriceSaleV2',
    'mintFromFixedPriceSaleWithEarlyAccessAllowlistV2',
  ].includes(name as string),
)
export const DUTCH_AUCTION_FRAGMENT = getAbiItem({
  abi: DROP_FACTORY_ABI,
  name: 'mintFromDutchAuctionV2',
}) as AbiFunction

export const GET_FIXED_PRICE = getAbiItem({
  abi: DROP_FACTORY_ABI,
  name: 'getFixedPriceSaleV2',
}) as AbiFunction
export const GET_DUTCH_AUCTION_PRICE = getAbiItem({
  abi: DROP_FACTORY_ABI,
  name: 'getDutchAuctionV2',
}) as AbiFunction

//-------------------------------------------------//
// ERC-1155

const MULTI_TOKEN_ETHEREUM = '0xf7e3609a5615a34b8755ee62421b9aDDEA7670B1'
const MULTI_TOKEN_BASE = '0x132363a3bbf47e06cf642dd18e9173e364546c99'

export const CHAIN_TO_CONTRACT_1155: Record<number, Address> = {
  [Chains.ETHEREUM]: MULTI_TOKEN_ETHEREUM,
  [Chains.BASE]: MULTI_TOKEN_BASE,
}

export const MINT_FROM_1155 = getAbiItem({
  abi: MULTI_TOKEN_ABI,
  name: 'mintFromFixedPriceSale',
}) as AbiFunction

export const GET_FIXED_PRICE_1155 = getAbiItem({
  abi: MULTI_TOKEN_ABI,
  name: 'getFixedPriceSale',
}) as AbiFunction

export const GET_SALE_TERMS_1155 = getAbiItem({
  abi: MULTI_TOKEN_ABI,
  name: 'getSaleTermsForToken',
}) as AbiFunction
//-------------------------------------------------//
// for referrals (zora deployer wallet)
export const REFERRAL_ADDRESS = '0xe3bBA2A4F8E0F5C32EF5097F988a4d88075C8B48'
