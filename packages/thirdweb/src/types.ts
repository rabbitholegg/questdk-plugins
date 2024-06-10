export interface ClaimCondition {
  startTimestamp: bigint
  maxClaimableSupply: bigint
  supplyClaimed: bigint
  quantityLimitPerWallet: bigint
  merkleRoot: string
  pricePerToken: bigint
  currency: string
  metadata: string
}

export const Mint721Response = {
  request: {
    address: '0xc7ded9c1bd13a19a877d196eeea9222ff6d40736',
    args: [
      '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
      '1',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      '777000000000000',
      [
        ['0x0000000000000000000000000000000000000000000000000000000000000000'],
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
        '777000000000000',
        '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      ],
      '0x',
    ],
    functionName: 'claim',
    value: 777000000000000n,
    account: {
      address: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
      type: 'json-rpc',
    },
  },
}

export const Mint1155Response = {
  request: {
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_receiver',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_quantity',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_currency',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_pricePerToken',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'bytes32[]',
                name: 'proof',
                type: 'bytes32[]',
              },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerWallet',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'currency',
                type: 'address',
              },
            ],
            internalType: 'struct IDrop1155.AllowlistProof',
            name: '_allowlistProof',
            type: 'tuple',
          },
          {
            internalType: 'bytes',
            name: '_data',
            type: 'bytes',
          },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
    ],
    address: '0x5625e0ae98C035407258D6752703fed917417Add',
    args: [
      '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
      0,
      '1',
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      '777000000000000',
      [
        ['0x0000000000000000000000000000000000000000000000000000000000000000'],
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
        '777000000000000',
        '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      ],
      '0x',
    ],
    functionName: 'claim',
    value: 777000000000000n,
    account: {
      address: '0xf70da97812CB96acDF810712Aa562db8dfA3dbEF',
      type: 'json-rpc',
    },
  },
}
