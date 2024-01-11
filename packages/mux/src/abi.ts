export const MUX_ORDERBOOK_ABI = [
  {
    inputs: [
      { internalType: 'bytes32', name: 'subAccountId', type: 'bytes32' },
      { internalType: 'uint96', name: 'collateralAmount', type: 'uint96' },
      { internalType: 'uint96', name: 'size', type: 'uint96' },
      { internalType: 'uint96', name: 'price', type: 'uint96' },
      { internalType: 'uint8', name: 'profitTokenId', type: 'uint8' },
      { internalType: 'uint8', name: 'flags', type: 'uint8' },
      { internalType: 'uint32', name: 'deadline', type: 'uint32' },
      { internalType: 'bytes32', name: 'referralCode', type: 'bytes32' },
      {
        components: [
          { internalType: 'uint96', name: 'tpPrice', type: 'uint96' },
          { internalType: 'uint96', name: 'slPrice', type: 'uint96' },
          { internalType: 'uint8', name: 'tpslProfitTokenId', type: 'uint8' },
          { internalType: 'uint32', name: 'tpslDeadline', type: 'uint32' },
        ],
        internalType: 'struct PositionOrderExtra',
        name: 'extra',
        type: 'tuple',
      },
    ],
    name: 'placePositionOrder3',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const GMX_V2_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'bytes', name: 'swapPath', type: 'bytes' },
          {
            internalType: 'uint256',
            name: 'initialCollateralAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'tokenOutMinAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'borrowCollateralAmount',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'sizeDeltaUsd', type: 'uint256' },
          { internalType: 'uint256', name: 'triggerPrice', type: 'uint256' },
          { internalType: 'uint256', name: 'acceptablePrice', type: 'uint256' },
          { internalType: 'uint256', name: 'executionFee', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'callbackGasLimit',
            type: 'uint256',
          },
          {
            internalType: 'enum IOrder.OrderType',
            name: 'orderType',
            type: 'uint8',
          },
        ],
        internalType: 'struct IGmxV2Adatper.OrderCreateParams',
        name: 'createParams',
        type: 'tuple',
      },
    ],
    name: 'placeOrder',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'payable',
    type: 'function',
  },
]
