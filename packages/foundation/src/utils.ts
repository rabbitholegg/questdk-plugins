import { GET_DUTCH_AUCTION_PRICE, GET_FIXED_PRICE } from './constants'
import { type Address, type PublicClient } from 'viem'

export async function getFixedPriceData(
  client: PublicClient,
  address: Address,
  contractAddress: Address,
) {
  const result = await client.readContract({
    address,
    abi: [GET_FIXED_PRICE],
    functionName: 'getFixedPriceSaleV2',
    args: [contractAddress],
  })
  return {
    seller: result[0] as Address,
    actionFee: result[1] as bigint,
    projectFee: result[7] as bigint,
  }
}

export async function getDutchAuctionData(
  client: PublicClient,
  address: Address,
  contractAddress: Address,
) {
  const result = await client.readContract({
    address,
    abi: [GET_DUTCH_AUCTION_PRICE],
    functionName: 'getDutchAuctionV2',
    args: [contractAddress],
  })
  return {
    seller: result[0] as Address,
    actionFee: result[8] as bigint,
    projectFee: result[9] as bigint,
  }
}

export function calculateFees(
  pricingInfo: { actionFee: bigint; projectFee: bigint },
  quantity: bigint,
) {
  return {
    actionFee: pricingInfo.actionFee * quantity,
    projectFee: pricingInfo.projectFee * quantity,
  }
}

export const fixedPriceResponse = {
  result: '14',
  request: {
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'count',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'nftRecipient',
            type: 'address',
          },
          {
            internalType: 'address payable',
            name: 'buyReferrer',
            type: 'address',
          },
          {
            internalType: 'bytes32[]',
            name: 'proof',
            type: 'bytes32[]',
          },
        ],
        name: 'mintFromFixedPriceSaleWithEarlyAccessAllowlistV2',
        outputs: [
          {
            internalType: 'uint256',
            name: 'firstTokenId',
            type: 'uint256',
          },
        ],
        stateMutability: 'payable',
        type: 'function',
      },
    ],
    address: '0x62037b26fff91929655aa3a060f327b47d1e2b3e',
    args: [
      '0x54d8109b459cefa530cdba2c3a2218c14e080907',
      '1',
      '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
      '0xe3bBA2A4F8E0F5C32EF5097F988a4d88075C8B48',
      [],
    ],
    functionName: 'mintFromFixedPriceSaleWithEarlyAccessAllowlistV2',
    value: 2000000000000000n,
    account: {
      address: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
      type: 'json-rpc',
    },
  },
}

export const dutchAuctionResponse = {
  result: '2',
  request: {
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'nftContract',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'count',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'nftRecipient',
            type: 'address',
          },
        ],
        name: 'mintFromDutchAuctionV2',
        outputs: [
          {
            internalType: 'uint256',
            name: 'firstTokenId',
            type: 'uint256',
          },
        ],
        stateMutability: 'payable',
        type: 'function',
      },
    ],
    address: '0x62037b26fff91929655aa3a060f327b47d1e2b3e',
    args: [
      '0x6a41fcce9d075a9f6324b626af56cf632c509ec9',
      '1',
      '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
    ],
    functionName: 'mintFromDutchAuctionV2',
    value: 1600000000000000n,
    account: {
      address: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
      type: 'json-rpc',
    },
  },
}
