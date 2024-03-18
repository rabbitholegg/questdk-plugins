export const FABRIC_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'numTokens',
        type: 'uint256',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'numTokens',
        type: 'uint256',
      },
    ],
    name: 'mintFor',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'numTokens',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'referralCode',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
    ],
    name: 'mintWithReferral',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'numTokens',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'referralCode',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
    ],
    name: 'mintWithReferralFor',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]
