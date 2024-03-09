// chain id for base
export const BASE_CHAIN_ID = 8453

// Contract Address for BasePaint
export const CONTRACT_ADDRESS = '0xba5e05cb26b78eda3a2f8e3b3814726305dcac83'

// Function Signature for Mint
export const MINT_ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'day', type: 'uint256' },
      { internalType: 'uint256', name: 'count', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

// Transactions for testing
export const TEST_TRANSACTIONS = [
  {
    // https://basescan.org/tx/0x356192c66fe49e9889215c5a47077b9b302c7d3a431fd463932788d9ea545fab
    blockHash:
      '0x5a41dfc5d26e20be65a7db73455e0ac617bdf864c76e1561586aeca98e7fd608',
    blockNumber: '4662683',
    chainId: 8453,
    from: '0xa337d056a88fb7f0053d49a620757e7ee1e2f213',
    gas: '102543',
    gasPrice: '101000000',
    hash: '0x356192c66fe49e9889215c5a47077b9b302c7d3a431fd463932788d9ea545fab',
    input:
      '0x1b2ef1ca000000000000000000000000000000000000000000000000000000000000003400000000000000000000000000000000000000000000000000000000000000010021fb3f',
    nonce: 29,
    r: '0xd5c2e549935167e2c75abcfad1b870dcb2489f3ba8ad6c80ef1dbe2406a3e68e',
    s: '0x1f9f5fe4d1adb56fd308d045059961a72ce04fa57c5898e175797d01f05f2394',
    to: '0xba5e05cb26b78eda3a2f8e3b3814726305dcac83',
    transactionIndex: 427,
    type: 'legacy',
    v: '16942',
    value: '2600000000000000',
    typeHex: '0x0',
  },
  {
    // https://basescan.org/tx/0x74863832fa3a92ca3cbf421f498131ea7169dc0e550b139f8addac595fd36999
    accessList: [],
    blockHash:
      '0x932cc928e3287400a8c46ea8a50bf63c52e71e10e7c880d3bb36826cae4ae17f',
    blockNumber: '5104558',
    chainId: 8453,
    from: '0x98f0ec9c467b1d3f0cc198146d2779dbe419c005',
    gas: '102465',
    gasPrice: '1180053',
    hash: '0x74863832fa3a92ca3cbf421f498131ea7169dc0e550b139f8addac595fd36999',
    input:
      '0x1b2ef1ca000000000000000000000000000000000000000000000000000000000000003e0000000000000000000000000000000000000000000000000000000000000001',
    maxFeePerGas: '1563512',
    maxPriorityFeePerGas: '19345',
    nonce: 8,
    r: '0x7f3f999fbf3e5b5ec64cb1e6a8cb5f18bd612951525a90c9d5c0f1a23519e803',
    s: '0x6602daa24e24fddfbb1af7466d9b92b6f636152423056405d6156c2e174d655c',
    to: '0xba5e05cb26b78eda3a2f8e3b3814726305dcac83',
    transactionIndex: 5,
    type: 'eip1559',
    v: '1',
    value: '2600000000000000',
    typeHex: '0x2',
  },
] as const
