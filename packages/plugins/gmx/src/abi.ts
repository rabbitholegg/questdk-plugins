export const GMX_SWAPV1_ABI = [
  {
    inputs: [
      { internalType: 'address[]', name: '_path', type: 'address[]' },
      { internalType: 'uint256', name: '_amountIn', type: 'uint256' },
      { internalType: 'uint256', name: '_minOut', type: 'uint256' },
      { internalType: 'address', name: '_receiver', type: 'address' },
    ],
    name: 'swap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '_path', type: 'address[]' },
      { internalType: 'uint256', name: '_minOut', type: 'uint256' },
      { internalType: 'address', name: '_receiver', type: 'address' },
    ],
    name: 'swapETHToTokens',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '_path', type: 'address[]' },
      { internalType: 'uint256', name: '_amountIn', type: 'uint256' },
      { internalType: 'uint256', name: '_minOut', type: 'uint256' },
      { internalType: 'address payable', name: '_receiver', type: 'address' },
    ],
    name: 'swapTokensToETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const GMX_SWAPV2_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'sendTokens',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: 'address', name: 'receiver', type: 'address' },
              {
                internalType: 'address',
                name: 'callbackContract',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'uiFeeReceiver',
                type: 'address',
              },
              { internalType: 'address', name: 'market', type: 'address' },
              {
                internalType: 'address',
                name: 'initialCollateralToken',
                type: 'address',
              },
              {
                internalType: 'address[]',
                name: 'swapPath',
                type: 'address[]',
              },
            ],
            internalType: 'struct BaseOrderUtils.CreateOrderParamsAddresses',
            name: 'addresses',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'sizeDeltaUsd',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'initialCollateralDeltaAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'triggerPrice',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'acceptablePrice',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'executionFee',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'callbackGasLimit',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'minOutputAmount',
                type: 'uint256',
              },
            ],
            internalType: 'struct BaseOrderUtils.CreateOrderParamsNumbers',
            name: 'numbers',
            type: 'tuple',
          },
          {
            internalType: 'enum Order.OrderType',
            name: 'orderType',
            type: 'uint8',
          },
          {
            internalType: 'enum Order.DecreasePositionSwapType',
            name: 'decreasePositionSwapType',
            type: 'uint8',
          },
          { internalType: 'bool', name: 'isLong', type: 'bool' },
          {
            internalType: 'bool',
            name: 'shouldUnwrapNativeToken',
            type: 'bool',
          },
          { internalType: 'bytes32', name: 'referralCode', type: 'bytes32' },
        ],
        internalType: 'struct BaseOrderUtils.CreateOrderParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'createOrder',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const GMX_SEND_TOKENS_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'sendTokens',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]
