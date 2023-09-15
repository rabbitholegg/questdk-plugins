// We're going to bundle all of the potential functions into a single ABI even though they wouldn't all occur in the same contract
export const POLYGON_BRIDGE_ABI_FUNCS = [
  // Used for transferring ETH from Mainnet to Polygon
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'depositEtherFor',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  // Used for transferring ERC20 tokens from Mainnet to Polygon
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'address', name: 'rootToken', type: 'address' },
      { internalType: 'bytes', name: 'depositData', type: 'bytes' },
    ],
    name: 'depositFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  // Used for all types when withdrawing from Polygon to Mainnet
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
