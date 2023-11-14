export const TRADER_JOE_SWAP_ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactNATIVEForTokens',
    outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactNATIVEForTokensSupportingFeeOnTransferTokens',
    outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'uint256', name: 'amountOutMinNATIVE', type: 'uint256' },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      { internalType: 'address payable', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactTokensForNATIVE',
    outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'uint256', name: 'amountOutMinNATIVE', type: 'uint256' },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      { internalType: 'address payable', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactTokensForNATIVESupportingFeeOnTransferTokens',
    outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactTokensForTokens',
    outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
    outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapNATIVEForExactTokens',
    outputs: [
      { internalType: 'uint256[]', name: 'amountsIn', type: 'uint256[]' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountNATIVEOut', type: 'uint256' },
      { internalType: 'uint256', name: 'amountInMax', type: 'uint256' },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      { internalType: 'address payable', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapTokensForExactNATIVE',
    outputs: [
      { internalType: 'uint256[]', name: 'amountsIn', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
      { internalType: 'uint256', name: 'amountInMax', type: 'uint256' },
      {
        components: [
          {
            internalType: 'uint256[]',
            name: 'pairBinSteps',
            type: 'uint256[]',
          },
          {
            internalType: 'enum ILBRouter.Version[]',
            name: 'versions',
            type: 'uint8[]',
          },
          {
            internalType: 'contract IERC20[]',
            name: 'tokenPath',
            type: 'address[]',
          },
        ],
        internalType: 'struct ILBRouter.Path',
        name: 'path',
        type: 'tuple',
      },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapTokensForExactTokens',
    outputs: [
      { internalType: 'uint256[]', name: 'amountsIn', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
