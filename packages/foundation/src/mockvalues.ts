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

export const mint1155Response = {
  request: {
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'saleTermsId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenQuantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'tokenRecipient',
            type: 'address',
          },
          {
            internalType: 'address payable',
            name: 'referrer',
            type: 'address',
          },
        ],
        name: 'mintFromFixedPriceSale',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
    ],
    address: '0x132363a3bbf47e06cf642dd18e9173e364546c99',
    args: [
      '366',
      '1',
      '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
      '0xe3bBA2A4F8E0F5C32EF5097F988a4d88075C8B48',
    ],
    functionName: 'mintFromFixedPriceSale',
    value: 800000000000000n,
    account: {
      address: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
      type: 'json-rpc',
    },
  },
}
