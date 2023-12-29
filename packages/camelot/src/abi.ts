export const CAMELOT_V2_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapExactETHForTokensSupportingFeeOnTransferTokens',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256',
      },
    ],
    name: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const CAMELOT_V3_EXACT_INPUT_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'bytes', name: 'path', type: 'bytes' },
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'amountOutMinimum',
            type: 'uint256',
          },
        ],
        internalType: 'struct ISwapRouter.ExactInputParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'exactInput',
    outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'tokenIn', type: 'address' },
          { internalType: 'address', name: 'tokenOut', type: 'address' },
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'amountOutMinimum',
            type: 'uint256',
          },
          { internalType: 'uint160', name: 'limitSqrtPrice', type: 'uint160' },
        ],
        internalType: 'struct ISwapRouter.ExactInputSingleParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'exactInputSingle',
    outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'tokenIn', type: 'address' },
          { internalType: 'address', name: 'tokenOut', type: 'address' },
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'amountOutMinimum',
            type: 'uint256',
          },
          { internalType: 'uint160', name: 'limitSqrtPrice', type: 'uint160' },
        ],
        internalType: 'struct ISwapRouter.ExactInputSingleParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'exactInputSingleSupportingFeeOnTransferTokens',
    outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const CAMELOT_V3_EXACT_OUTPUT_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'bytes', name: 'path', type: 'bytes' },
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
          { internalType: 'uint256', name: 'amountInMaximum', type: 'uint256' },
        ],
        internalType: 'struct ISwapRouter.ExactOutputParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'exactOutput',
    outputs: [{ internalType: 'uint256', name: 'amountIn', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'tokenIn', type: 'address' },
          { internalType: 'address', name: 'tokenOut', type: 'address' },
          { internalType: 'uint24', name: 'fee', type: 'uint24' },
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
          { internalType: 'uint256', name: 'amountInMaximum', type: 'uint256' },
          { internalType: 'uint160', name: 'limitSqrtPrice', type: 'uint160' },
        ],
        internalType: 'struct ISwapRouter.ExactOutputSingleParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'exactOutputSingle',
    outputs: [{ internalType: 'uint256', name: 'amountIn', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const V3_MULTICALL_ABI = [
  {
    inputs: [{ internalType: 'bytes[]', name: 'data', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ internalType: 'bytes[]', name: 'results', type: 'bytes[]' }],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const PARASWAP_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'fromToken', type: 'address' },
          { internalType: 'address', name: 'toToken', type: 'address' },
          { internalType: 'uint256', name: 'fromAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'toAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'expectedAmount', type: 'uint256' },
          { internalType: 'address[]', name: 'callees', type: 'address[]' },
          { internalType: 'bytes', name: 'exchangeData', type: 'bytes' },
          {
            internalType: 'uint256[]',
            name: 'startIndexes',
            type: 'uint256[]',
          },
          { internalType: 'uint256[]', name: 'values', type: 'uint256[]' },
          {
            internalType: 'address payable',
            name: 'beneficiary',
            type: 'address',
          },
          { internalType: 'address payable', name: 'partner', type: 'address' },
          { internalType: 'uint256', name: 'feePercent', type: 'uint256' },
          { internalType: 'bytes', name: 'permit', type: 'bytes' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'bytes16', name: 'uuid', type: 'bytes16' },
        ],
        internalType: 'struct Utils.SimpleData',
        name: 'data',
        type: 'tuple',
      },
    ],
    name: 'simpleBuy',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'fromToken', type: 'address' },
          { internalType: 'address', name: 'toToken', type: 'address' },
          { internalType: 'uint256', name: 'fromAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'toAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'expectedAmount', type: 'uint256' },
          { internalType: 'address[]', name: 'callees', type: 'address[]' },
          { internalType: 'bytes', name: 'exchangeData', type: 'bytes' },
          {
            internalType: 'uint256[]',
            name: 'startIndexes',
            type: 'uint256[]',
          },
          { internalType: 'uint256[]', name: 'values', type: 'uint256[]' },
          {
            internalType: 'address payable',
            name: 'beneficiary',
            type: 'address',
          },
          { internalType: 'address payable', name: 'partner', type: 'address' },
          { internalType: 'uint256', name: 'feePercent', type: 'uint256' },
          { internalType: 'bytes', name: 'permit', type: 'bytes' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'bytes16', name: 'uuid', type: 'bytes16' },
        ],
        internalType: 'struct Utils.SimpleData',
        name: 'data',
        type: 'tuple',
      },
    ],
    name: 'simpleSwap',
    outputs: [
      { internalType: 'uint256', name: 'receivedAmount', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'fromToken', type: 'address' },
          { internalType: 'uint256', name: 'fromAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'toAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'expectedAmount', type: 'uint256' },
          {
            internalType: 'address payable',
            name: 'beneficiary',
            type: 'address',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'fromAmountPercent',
                type: 'uint256',
              },
              {
                components: [
                  { internalType: 'address', name: 'to', type: 'address' },
                  {
                    internalType: 'uint256',
                    name: 'totalNetworkFee',
                    type: 'uint256',
                  },
                  {
                    components: [
                      {
                        internalType: 'address payable',
                        name: 'adapter',
                        type: 'address',
                      },
                      {
                        internalType: 'uint256',
                        name: 'percent',
                        type: 'uint256',
                      },
                      {
                        internalType: 'uint256',
                        name: 'networkFee',
                        type: 'uint256',
                      },
                      {
                        components: [
                          {
                            internalType: 'uint256',
                            name: 'index',
                            type: 'uint256',
                          },
                          {
                            internalType: 'address',
                            name: 'targetExchange',
                            type: 'address',
                          },
                          {
                            internalType: 'uint256',
                            name: 'percent',
                            type: 'uint256',
                          },
                          {
                            internalType: 'bytes',
                            name: 'payload',
                            type: 'bytes',
                          },
                          {
                            internalType: 'uint256',
                            name: 'networkFee',
                            type: 'uint256',
                          },
                        ],
                        internalType: 'struct Utils.Route[]',
                        name: 'route',
                        type: 'tuple[]',
                      },
                    ],
                    internalType: 'struct Utils.Adapter[]',
                    name: 'adapters',
                    type: 'tuple[]',
                  },
                ],
                internalType: 'struct Utils.Path[]',
                name: 'path',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct Utils.MegaSwapPath[]',
            name: 'path',
            type: 'tuple[]',
          },
          { internalType: 'address payable', name: 'partner', type: 'address' },
          { internalType: 'uint256', name: 'feePercent', type: 'uint256' },
          { internalType: 'bytes', name: 'permit', type: 'bytes' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'bytes16', name: 'uuid', type: 'bytes16' },
        ],
        internalType: 'struct Utils.MegaSwapSellData',
        name: 'data',
        type: 'tuple',
      },
    ],
    name: 'megaSwap',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'fromToken', type: 'address' },
          { internalType: 'uint256', name: 'fromAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'toAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'expectedAmount', type: 'uint256' },
          {
            internalType: 'address payable',
            name: 'beneficiary',
            type: 'address',
          },
          {
            components: [
              { internalType: 'address', name: 'to', type: 'address' },
              {
                internalType: 'uint256',
                name: 'totalNetworkFee',
                type: 'uint256',
              },
              {
                components: [
                  {
                    internalType: 'address payable',
                    name: 'adapter',
                    type: 'address',
                  },
                  { internalType: 'uint256', name: 'percent', type: 'uint256' },
                  {
                    internalType: 'uint256',
                    name: 'networkFee',
                    type: 'uint256',
                  },
                  {
                    components: [
                      {
                        internalType: 'uint256',
                        name: 'index',
                        type: 'uint256',
                      },
                      {
                        internalType: 'address',
                        name: 'targetExchange',
                        type: 'address',
                      },
                      {
                        internalType: 'uint256',
                        name: 'percent',
                        type: 'uint256',
                      },
                      { internalType: 'bytes', name: 'payload', type: 'bytes' },
                      {
                        internalType: 'uint256',
                        name: 'networkFee',
                        type: 'uint256',
                      },
                    ],
                    internalType: 'struct Utils.Route[]',
                    name: 'route',
                    type: 'tuple[]',
                  },
                ],
                internalType: 'struct Utils.Adapter[]',
                name: 'adapters',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct Utils.Path[]',
            name: 'path',
            type: 'tuple[]',
          },
          { internalType: 'address payable', name: 'partner', type: 'address' },
          { internalType: 'uint256', name: 'feePercent', type: 'uint256' },
          { internalType: 'bytes', name: 'permit', type: 'bytes' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'bytes16', name: 'uuid', type: 'bytes16' },
        ],
        internalType: 'struct Utils.SellData',
        name: 'data',
        type: 'tuple',
      },
    ],
    name: 'multiSwap',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: 'bytes32', name: 'poolId', type: 'bytes32' },
              {
                internalType: 'uint256',
                name: 'assetInIndex',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'assetOutIndex',
                type: 'uint256',
              },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
              { internalType: 'bytes', name: 'userData', type: 'bytes' },
            ],
            internalType: 'struct IBalancerV2Vault.BatchSwapStep[]',
            name: 'swaps',
            type: 'tuple[]',
          },
          { internalType: 'address[]', name: 'assets', type: 'address[]' },
          {
            components: [
              { internalType: 'address', name: 'sender', type: 'address' },
              {
                internalType: 'bool',
                name: 'fromInternalBalance',
                type: 'bool',
              },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
              { internalType: 'bool', name: 'toInternalBalance', type: 'bool' },
            ],
            internalType: 'struct IBalancerV2Vault.FundManagement',
            name: 'funds',
            type: 'tuple',
          },
          { internalType: 'int256[]', name: 'limits', type: 'int256[]' },
          { internalType: 'uint256', name: 'fromAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'toAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'expectedAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'uint256', name: 'feePercent', type: 'uint256' },
          { internalType: 'address', name: 'vault', type: 'address' },
          { internalType: 'address payable', name: 'partner', type: 'address' },
          { internalType: 'bool', name: 'isApproved', type: 'bool' },
          {
            internalType: 'address payable',
            name: 'beneficiary',
            type: 'address',
          },
          { internalType: 'bytes', name: 'permit', type: 'bytes' },
          { internalType: 'bytes16', name: 'uuid', type: 'bytes16' },
        ],
        internalType: 'struct Utils.DirectBalancerV2',
        name: 'data',
        type: 'tuple',
      },
    ],
    name: 'directBalancerV2GivenInSwap',
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
              { internalType: 'bytes32', name: 'poolId', type: 'bytes32' },
              {
                internalType: 'uint256',
                name: 'assetInIndex',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'assetOutIndex',
                type: 'uint256',
              },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
              { internalType: 'bytes', name: 'userData', type: 'bytes' },
            ],
            internalType: 'struct IBalancerV2Vault.BatchSwapStep[]',
            name: 'swaps',
            type: 'tuple[]',
          },
          { internalType: 'address[]', name: 'assets', type: 'address[]' },
          {
            components: [
              { internalType: 'address', name: 'sender', type: 'address' },
              {
                internalType: 'bool',
                name: 'fromInternalBalance',
                type: 'bool',
              },
              {
                internalType: 'address payable',
                name: 'recipient',
                type: 'address',
              },
              { internalType: 'bool', name: 'toInternalBalance', type: 'bool' },
            ],
            internalType: 'struct IBalancerV2Vault.FundManagement',
            name: 'funds',
            type: 'tuple',
          },
          { internalType: 'int256[]', name: 'limits', type: 'int256[]' },
          { internalType: 'uint256', name: 'fromAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'toAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'expectedAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'uint256', name: 'feePercent', type: 'uint256' },
          { internalType: 'address', name: 'vault', type: 'address' },
          { internalType: 'address payable', name: 'partner', type: 'address' },
          { internalType: 'bool', name: 'isApproved', type: 'bool' },
          {
            internalType: 'address payable',
            name: 'beneficiary',
            type: 'address',
          },
          { internalType: 'bytes', name: 'permit', type: 'bytes' },
          { internalType: 'bytes16', name: 'uuid', type: 'bytes16' },
        ],
        internalType: 'struct Utils.DirectBalancerV2',
        name: 'data',
        type: 'tuple',
      },
    ],
    name: 'directBalancerV2GivenOutSwap',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'fromToken', type: 'address' },
          { internalType: 'address', name: 'toToken', type: 'address' },
          { internalType: 'address', name: 'exchange', type: 'address' },
          { internalType: 'uint256', name: 'fromAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'toAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'expectedAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'feePercent', type: 'uint256' },
          { internalType: 'int128', name: 'i', type: 'int128' },
          { internalType: 'int128', name: 'j', type: 'int128' },
          { internalType: 'address payable', name: 'partner', type: 'address' },
          { internalType: 'bool', name: 'isApproved', type: 'bool' },
          {
            internalType: 'enum Utils.CurveSwapType',
            name: 'swapType',
            type: 'uint8',
          },
          {
            internalType: 'address payable',
            name: 'beneficiary',
            type: 'address',
          },
          { internalType: 'bool', name: 'needWrapNative', type: 'bool' },
          { internalType: 'bytes', name: 'permit', type: 'bytes' },
          { internalType: 'bytes16', name: 'uuid', type: 'bytes16' },
        ],
        internalType: 'struct Utils.DirectCurveV1',
        name: 'data',
        type: 'tuple',
      },
    ],
    name: 'directCurveV1Swap',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'fromToken', type: 'address' },
          { internalType: 'address', name: 'toToken', type: 'address' },
          { internalType: 'address', name: 'exchange', type: 'address' },
          { internalType: 'address', name: 'poolAddress', type: 'address' },
          { internalType: 'uint256', name: 'fromAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'toAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'expectedAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'feePercent', type: 'uint256' },
          { internalType: 'uint256', name: 'i', type: 'uint256' },
          { internalType: 'uint256', name: 'j', type: 'uint256' },
          { internalType: 'address payable', name: 'partner', type: 'address' },
          { internalType: 'bool', name: 'isApproved', type: 'bool' },
          {
            internalType: 'enum Utils.CurveSwapType',
            name: 'swapType',
            type: 'uint8',
          },
          {
            internalType: 'address payable',
            name: 'beneficiary',
            type: 'address',
          },
          { internalType: 'bool', name: 'needWrapNative', type: 'bool' },
          { internalType: 'bytes', name: 'permit', type: 'bytes' },
          { internalType: 'bytes16', name: 'uuid', type: 'bytes16' },
        ],
        internalType: 'struct Utils.DirectCurveV2',
        name: 'data',
        type: 'tuple',
      },
    ],
    name: 'directCurveV2Swap',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'fromToken', type: 'address' },
          { internalType: 'address', name: 'toToken', type: 'address' },
          { internalType: 'address', name: 'exchange', type: 'address' },
          { internalType: 'uint256', name: 'fromAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'toAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'expectedAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'feePercent', type: 'uint256' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'address payable', name: 'partner', type: 'address' },
          { internalType: 'bool', name: 'isApproved', type: 'bool' },
          {
            internalType: 'address payable',
            name: 'beneficiary',
            type: 'address',
          },
          { internalType: 'bytes', name: 'path', type: 'bytes' },
          { internalType: 'bytes', name: 'permit', type: 'bytes' },
          { internalType: 'bytes16', name: 'uuid', type: 'bytes16' },
        ],
        internalType: 'struct Utils.DirectUniV3',
        name: 'data',
        type: 'tuple',
      },
    ],
    name: 'directUniV3Buy',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'fromToken', type: 'address' },
          { internalType: 'address', name: 'toToken', type: 'address' },
          { internalType: 'address', name: 'exchange', type: 'address' },
          { internalType: 'uint256', name: 'fromAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'toAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'expectedAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'feePercent', type: 'uint256' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'address payable', name: 'partner', type: 'address' },
          { internalType: 'bool', name: 'isApproved', type: 'bool' },
          {
            internalType: 'address payable',
            name: 'beneficiary',
            type: 'address',
          },
          { internalType: 'bytes', name: 'path', type: 'bytes' },
          { internalType: 'bytes', name: 'permit', type: 'bytes' },
          { internalType: 'bytes16', name: 'uuid', type: 'bytes16' },
        ],
        internalType: 'struct Utils.DirectUniV3',
        name: 'data',
        type: 'tuple',
      },
    ],
    name: 'directUniV3Swap',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]
