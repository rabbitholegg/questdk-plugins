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
