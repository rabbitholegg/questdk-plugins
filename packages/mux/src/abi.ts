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
