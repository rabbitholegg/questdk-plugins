export const V2_ROUTER_ABI = [
  {
    inputs: [
      { internalType: 'address[]', name: '_path', type: 'address[]' },
      { internalType: 'uint256', name: '_amountIn', type: 'uint256' },
      { internalType: 'uint256', name: '_minOut', type: 'uint256' },
      { internalType: 'address', name: '_receiver', type: 'address' },
      { internalType: 'bytes', name: 'signedQuoteData', type: 'bytes' },
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
      { internalType: 'bytes', name: 'signedQuoteData', type: 'bytes' },
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
      { internalType: 'bytes', name: 'signedQuoteData', type: 'bytes' },
    ],
    name: 'swapTokensToETH',
    outputs: [],
    stateMutability: 'nonpayable',
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

export const HSPMHLP_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'fxToken', type: 'address' },
      { internalType: 'address', name: 'tokenOut', type: 'address' },
      { internalType: 'uint256', name: 'minOut', type: 'uint256' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'bytes', name: 'signedQuoteData', type: 'bytes' },
    ],
    name: 'swapEthToPeggedToken',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'hlpToken', type: 'address' },
      { internalType: 'address', name: 'fxToken', type: 'address' },
      { internalType: 'address', name: 'tokenOut', type: 'address' },
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'uint256', name: 'minOut', type: 'uint256' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'bytes', name: 'signedQuoteData', type: 'bytes' },
    ],
    name: 'swapHlpTokenToPeggedToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'peggedToken', type: 'address' },
      { internalType: 'address', name: 'fxToken', type: 'address' },
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'uint256', name: 'minOut', type: 'uint256' },
      { internalType: 'address payable', name: 'receiver', type: 'address' },
      { internalType: 'bytes', name: 'signedQuoteData', type: 'bytes' },
    ],
    name: 'swapPeggedTokenToEth',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'peggedToken', type: 'address' },
      { internalType: 'address', name: 'fxToken', type: 'address' },
      { internalType: 'address', name: 'tokenOut', type: 'address' },
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'uint256', name: 'minOut', type: 'uint256' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'bytes', name: 'signedQuoteData', type: 'bytes' },
    ],
    name: 'swapPeggedTokenToHlpToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const HPSM2_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'fxTokenAddress', type: 'address' },
      { internalType: 'address', name: 'peggedTokenAddress', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'fxTokenAddress', type: 'address' },
      { internalType: 'address', name: 'peggedTokenAddress', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const HLP_CURVE_V2_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'hlpCurveToken', type: 'address' },
      { internalType: 'address', name: 'tokenOut', type: 'address' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'uint256', name: 'minOut', type: 'uint256' },
      { internalType: 'address', name: 'metapoolFactory', type: 'address' },
      { internalType: 'address', name: 'pool', type: 'address' },
      { internalType: 'bytes', name: 'signedQuoteData', type: 'bytes' },
    ],
    name: 'swapEthToCurveToken',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'hlpToken', type: 'address' },
      { internalType: 'address', name: 'hlpCurveToken', type: 'address' },
      { internalType: 'address', name: 'tokenOut', type: 'address' },
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'uint256', name: 'minOut', type: 'uint256' },
      { internalType: 'address', name: 'metapoolFactory', type: 'address' },
      { internalType: 'address', name: 'pool', type: 'address' },
      { internalType: 'bytes', name: 'signedQuoteData', type: 'bytes' },
    ],
    name: 'swapHlpTokenToCurveToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'peggedToken', type: 'address' },
      { internalType: 'address', name: 'fxToken', type: 'address' },
      { internalType: 'address', name: 'hlpToken', type: 'address' },
      { internalType: 'address', name: 'tokenOut', type: 'address' },
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'uint256', name: 'minOut', type: 'uint256' },
      { internalType: 'address', name: 'metapoolFactory', type: 'address' },
      { internalType: 'address', name: 'pool', type: 'address' },
      { internalType: 'bytes', name: 'signedQuoteData', type: 'bytes' },
    ],
    name: 'swapPeggedTokenToCurveToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const HLP_BALANCER_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'tokenIn', type: 'address' },
      { internalType: 'address', name: 'hlpBalancerToken', type: 'address' },
      { internalType: 'bytes32', name: 'poolId', type: 'bytes32' },
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'uint256', name: 'minOut', type: 'uint256' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'bytes', name: 'signedQuoteData', type: 'bytes' },
    ],
    name: 'swapBalancerToEth',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'hlpBalancerToken', type: 'address' },
      { internalType: 'address', name: 'tokenOut', type: 'address' },
      { internalType: 'bytes32', name: 'poolId', type: 'bytes32' },
      { internalType: 'uint256', name: 'minOut', type: 'uint256' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'bytes', name: 'signedQuoteData', type: 'bytes' },
    ],
    name: 'swapEthToBalancer',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const CURVE_FACTORY_ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'exchange_underlying',
    inputs: [
      { name: 'i', type: 'int128' },
      { name: 'j', type: 'int128' },
      { name: '_dx', type: 'uint256' },
      { name: '_min_dy', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
    gas: 1323223,
  },
]
