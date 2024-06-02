import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { type AbiFunction, type Address, getAbiItem } from 'viem'

const DROP_FACTORY_ETHEREUM = '0x53f451165ba6fdbe39a134673d13948261b2334a'
const DROP_FACTORY_BASE = '0x62037b26fff91929655aa3a060f327b47d1e2b3e'

export const CHAIN_TO_CONTRACT_ADDRESS: Record<number, Address> = {
  [Chains.ETHEREUM]: DROP_FACTORY_ETHEREUM,
  [Chains.BASE]: DROP_FACTORY_BASE,
}

const DROP_FACTORY_ABI = [
  {
    // 0x16da9864
    inputs: [
      { internalType: 'address', name: 'nftContract', type: 'address' },
      { internalType: 'uint256', name: 'count', type: 'uint256' },
      { internalType: 'address', name: 'nftRecipient', type: 'address' },
    ],
    name: 'mintFromDutchAuctionV2',
    outputs: [
      { internalType: 'uint256', name: 'firstTokenId', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    // 0x334965c2
    inputs: [
      { internalType: 'address', name: 'nftContract', type: 'address' },
      { internalType: 'uint16', name: 'count', type: 'uint16' },
      { internalType: 'address', name: 'nftRecipient', type: 'address' },
      { internalType: 'address payable', name: 'buyReferrer', type: 'address' },
    ],
    name: 'mintFromFixedPriceSaleV2',
    outputs: [
      { internalType: 'uint256', name: 'firstTokenId', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    // 0x0cafb113
    inputs: [
      { internalType: 'address', name: 'nftContract', type: 'address' },
      { internalType: 'uint256', name: 'count', type: 'uint256' },
      { internalType: 'address', name: 'nftRecipient', type: 'address' },
      { internalType: 'address payable', name: 'buyReferrer', type: 'address' },
      { internalType: 'bytes32[]', name: 'proof', type: 'bytes32[]' },
    ],
    name: 'mintFromFixedPriceSaleWithEarlyAccessAllowlistV2',
    outputs: [
      { internalType: 'uint256', name: 'firstTokenId', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'nftContract', type: 'address' }],
    name: 'getFixedPriceSaleV2',
    outputs: [
      { internalType: 'address payable', name: 'seller', type: 'address' },
      { internalType: 'uint256', name: 'price', type: 'uint256' },
      { internalType: 'uint256', name: 'limitPerAccount', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'numberOfTokensAvailableToMint',
        type: 'uint256',
      },
      { internalType: 'bool', name: 'marketCanMint', type: 'bool' },
      {
        internalType: 'uint256',
        name: 'generalAvailabilityStartTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'earlyAccessStartTime',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'mintFeePerNftInWei', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'nftContract', type: 'address' }],
    name: 'getDutchAuctionV2',
    outputs: [
      { internalType: 'uint256', name: 'maxPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'minPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'limitPerAccount', type: 'uint256' },
      { internalType: 'uint256', name: 'startTime', type: 'uint256' },
      { internalType: 'uint256', name: 'endTime', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'totalAvailableSupply',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'totalMintedCount', type: 'uint256' },
      { internalType: 'uint256', name: 'lastSalePrice', type: 'uint256' },
      { internalType: 'uint256', name: 'currentPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'mintFeePerNftInWei', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

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

// for referrals
export const ZORA_DEPLOYER_ADDRESS =
  '0xe3bBA2A4F8E0F5C32EF5097F988a4d88075C8B48'
