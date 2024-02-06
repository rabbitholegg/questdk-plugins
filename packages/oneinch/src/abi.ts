export const ONEINCH_SWAP_ABI = [
  {
    inputs: [
      {
        internalType: "contract IAggregationExecutor",
        name: "caller",
        type: "address",
      },
      {
        components: [
          {
            internalType: "contract IERC20",
            name: "srcToken",
            type: "address",
          },
          {
            internalType: "contract IERC20",
            name: "dstToken",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "srcReceiver",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "dstReceiver",
            type: "address",
          },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "minReturnAmount", type: "uint256" },
          { internalType: "uint256", name: "flags", type: "uint256" },
          { internalType: "bytes", name: "permit", type: "bytes" },
        ],
        internalType: "struct AggregationRouterV4.SwapDescription",
        name: "desc",
        type: "tuple",
      },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "swap",
    outputs: [
      { internalType: "uint256", name: "returnAmount", type: "uint256" },
      { internalType: "uint256", name: "spentAmount", type: "uint256" },
      { internalType: "uint256", name: "gasLeft", type: "uint256" },
    ],
    stateMutability: "payable",
    type: "function",
  },
];
