import { Chains } from "@rabbitholegg/questdk-plugin-utils";
import type { Address } from "viem";

export const CHAIN_ID_ARRAY = [
  Chains.ETHEREUM,
  Chains.OPTIMISM,
  Chains.ARBITRUM_ONE,
  Chains.POLYGON_POS,
  Chains.ZK_SYNC_ERA,
  Chains.BASE,
] as number[];

/* 
  Command param type definitions:
  https://github.com/Uniswap/universal-router-sdk/blob/6ec60ce9ff2853e236ba8f40a3aaa8819a97bd8b/src/utils/routerCommands.ts#L74
*/
export const V3_SWAP_EXACT_TYPES = [
  "address recipient",
  "uint256 amountIn",
  "uint256 amountOut",
  "bytes path",
  "bool payerIsUser",
];

export const V2_SWAP_EXACT_TYPES = [
  "address recipient",
  "uint256 amountIn",
  "uint256 amountOut",
  "address[] path",
  "bool payerIsUser",
];

export const EXECUTE_ABI_FRAGMENTS = [
  {
    inputs: [
      { internalType: "bytes", name: "commands", type: "bytes" },
      { internalType: "bytes[]", name: "inputs", type: "bytes[]" },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes", name: "commands", type: "bytes" },
      { internalType: "bytes[]", name: "inputs", type: "bytes[]" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

//not sure what parts of this are needed for tracking
export const LIMIT_ORDER_REGISTRY_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "contract NonFungiblePositionManager",
        name: "_positionManager",
        type: "address",
      },
      {
        internalType: "contract ERC20",
        name: "wrappedNative",
        type: "address",
      },
      {
        internalType: "contract LinkTokenInterface",
        name: "link",
        type: "address",
      },
      {
        internalType: "contract IKeeperRegistrar",
        name: "_registrar",
        type: "address",
      },
      {
        internalType: "address",
        name: "_fastGasFeed",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "LimitOrderRegistry__AmountShouldBeZero",
    type: "error",
  },
  {
    inputs: [],
    name: "LimitOrderRegistry__CenterITM",
    type: "error",
  },
  {
    inputs: [],
    name: "LimitOrderRegistry__ContractNotShutdown",
    type: "error",
  },
  {
    inputs: [],
    name: "LimitOrderRegistry__ContractShutdown",
    type: "error",
  },
  {
    inputs: [],
    name: "LimitOrderRegistry__DirectionMisMatch",
    type: "error",
  },
  {
    inputs: [],
    name: "LimitOrderRegistry__InvalidBatchId",
    type: "error",
  },
  {
    inputs: [],
    name: "LimitOrderRegistry__InvalidFillsPerUpkeep",
    type: "error",
  },
  {
    inputs: [],
    name: "LimitOrderRegistry__InvalidGasLimit",
    type: "error",
  },
  {
    inputs: [],
    name: "LimitOrderRegistry__InvalidGasPrice",
    type: "error",
  },
  {
    inputs: [],
    name: "LimitOrderRegistry__InvalidPositionId",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "int24",
        name: "targetTick",
        type: "int24",
      },
      {
        internalType: "int24",
        name: "tickSpacing",
        type: "int24",
      },
    ],
    name: "LimitOrderRegistry__InvalidTargetTick",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "int24",
        name: "upper",
        type: "int24",
      },
      {
        internalType: "int24",
        name: "lower",
        type: "int24",
      },
    ],
    name: "LimitOrderRegistry__InvalidTickRange",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "minimum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "LimitOrderRegistry__MinimumNotMet",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "asset",
        type: "address",
      },
    ],
    name: "LimitOrderRegistry__MinimumNotSet",
    type: "error",
  },
  {
    inputs: [],
    name: "LimitOrderRegistry__NoLiquidityInOrder",
    type: "error",
  },
  {
    inputs: [],
    name: "LimitOrderRegistry__NoOrdersToFulfill",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "int24",
        name: "currentTick",
        type: "int24",
      },
      {
        internalType: "int24",
        name: "targetTick",
        type: "int24",
      },
      {
        internalType: "bool",
        name: "direction",
        type: "bool",
      },
    ],
    name: "LimitOrderRegistry__OrderITM",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "LimitOrderRegistry__OrderNotInList",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "batchId",
        type: "uint128",
      },
    ],
    name: "LimitOrderRegistry__OrderNotReadyToClaim",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "LimitOrderRegistry__PoolAlreadySetup",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "LimitOrderRegistry__PoolNotSetup",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "batchId",
        type: "uint256",
      },
    ],
    name: "LimitOrderRegistry__UserNotFound",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "LimitOrderRegistry__ZeroFeesToWithdraw",
    type: "error",
  },
  {
    inputs: [],
    name: "LimitOrderRegistry__ZeroNativeBalance",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "amount0",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "amount1",
        type: "uint128",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "direction",
            type: "bool",
          },
          {
            internalType: "int24",
            name: "tickUpper",
            type: "int24",
          },
          {
            internalType: "int24",
            name: "tickLower",
            type: "int24",
          },
          {
            internalType: "uint64",
            name: "userCount",
            type: "uint64",
          },
          {
            internalType: "uint128",
            name: "batchId",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "token0Amount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "token1Amount",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "head",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tail",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct LimitOrderRegistry.BatchOrder",
        name: "affectedOrder",
        type: "tuple",
      },
    ],
    name: "CancelOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "batchId",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ClaimOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "LimitOrderSetup",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "userTotal",
        type: "uint128",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "direction",
            type: "bool",
          },
          {
            internalType: "int24",
            name: "tickUpper",
            type: "int24",
          },
          {
            internalType: "int24",
            name: "tickLower",
            type: "int24",
          },
          {
            internalType: "uint64",
            name: "userCount",
            type: "uint64",
          },
          {
            internalType: "uint128",
            name: "batchId",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "token0Amount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "token1Amount",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "head",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tail",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct LimitOrderRegistry.BatchOrder",
        name: "affectedOrder",
        type: "tuple",
      },
    ],
    name: "NewOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "batchId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "OrderFilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "isShutdown",
        type: "bool",
      },
    ],
    name: "ShutdownChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "FAST_GAS_HEARTBEAT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LINK",
    outputs: [
      {
        internalType: "contract LinkTokenInterface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_FILLS_PER_UPKEEP",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_GAS_LIMIT",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_GAS_PRICE",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "POSITION_MANAGER",
    outputs: [
      {
        internalType: "contract NonFungiblePositionManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WRAPPED_NATIVE",
    outputs: [
      {
        internalType: "contract ERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "batchCount",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "batchIdToUserDepositAmount",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract UniswapV3Pool",
        name: "pool",
        type: "address",
      },
      {
        internalType: "int24",
        name: "targetTick",
        type: "int24",
      },
      {
        internalType: "bool",
        name: "direction",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "cancelOrder",
    outputs: [
      {
        internalType: "uint128",
        name: "amount0",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "amount1",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "batchId",
        type: "uint128",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "checkData",
        type: "bytes",
      },
    ],
    name: "checkUpkeep",
    outputs: [
      {
        internalType: "bool",
        name: "upkeepNeeded",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "performData",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    name: "claim",
    outputs: [
      {
        internalType: "contract UniswapV3Pool",
        name: "pool",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "token0Amount",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "token1Amount",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "feePerUser",
        type: "uint128",
      },
      {
        internalType: "bool",
        name: "direction",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isReadyForClaim",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "batchId",
        type: "uint128",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "claimOrder",
    outputs: [
      {
        internalType: "contract ERC20",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "fastGasFeed",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract UniswapV3Pool",
        name: "pool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "startingNode",
        type: "uint256",
      },
      {
        internalType: "int24",
        name: "targetTick",
        type: "int24",
      },
      {
        internalType: "bool",
        name: "direction",
        type: "bool",
      },
    ],
    name: "findSpot",
    outputs: [
      {
        internalType: "uint256",
        name: "proposedHead",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "proposedTail",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "batchId",
        type: "uint128",
      },
    ],
    name: "getClaim",
    outputs: [
      {
        components: [
          {
            internalType: "contract UniswapV3Pool",
            name: "pool",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "token0Amount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "token1Amount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "feePerUser",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "direction",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isReadyForClaim",
            type: "bool",
          },
        ],
        internalType: "struct LimitOrderRegistry.Claim",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "batchId",
        type: "uint128",
      },
    ],
    name: "getFeePerUser",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getGasPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getOrderBook",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "direction",
            type: "bool",
          },
          {
            internalType: "int24",
            name: "tickUpper",
            type: "int24",
          },
          {
            internalType: "int24",
            name: "tickLower",
            type: "int24",
          },
          {
            internalType: "uint64",
            name: "userCount",
            type: "uint64",
          },
          {
            internalType: "uint128",
            name: "batchId",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "token0Amount",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "token1Amount",
            type: "uint128",
          },
          {
            internalType: "uint256",
            name: "head",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tail",
            type: "uint256",
          },
        ],
        internalType: "struct LimitOrderRegistry.BatchOrder",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract UniswapV3Pool",
        name: "",
        type: "address",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "int24",
        name: "",
        type: "int24",
      },
      {
        internalType: "int24",
        name: "",
        type: "int24",
      },
    ],
    name: "getPositionFromTicks",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initiateShutdown",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "batchId",
        type: "uint128",
      },
    ],
    name: "isOrderReadyForClaim",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isShutdown",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "liftShutdown",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "maxFillsPerUpkeep",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "",
        type: "address",
      },
    ],
    name: "minimumAssets",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract UniswapV3Pool",
        name: "pool",
        type: "address",
      },
      {
        internalType: "int24",
        name: "targetTick",
        type: "int24",
      },
      {
        internalType: "uint128",
        name: "amount",
        type: "uint128",
      },
      {
        internalType: "bool",
        name: "direction",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "startingNode",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "newOrder",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "orderBook",
    outputs: [
      {
        internalType: "bool",
        name: "direction",
        type: "bool",
      },
      {
        internalType: "int24",
        name: "tickUpper",
        type: "int24",
      },
      {
        internalType: "int24",
        name: "tickLower",
        type: "int24",
      },
      {
        internalType: "uint64",
        name: "userCount",
        type: "uint64",
      },
      {
        internalType: "uint128",
        name: "batchId",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "token0Amount",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "token1Amount",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "head",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tail",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "performData",
        type: "bytes",
      },
    ],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract UniswapV3Pool",
        name: "",
        type: "address",
      },
    ],
    name: "poolToData",
    outputs: [
      {
        internalType: "uint256",
        name: "centerHead",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "centerTail",
        type: "uint256",
      },
      {
        internalType: "contract ERC20",
        name: "token0",
        type: "address",
      },
      {
        internalType: "contract ERC20",
        name: "token1",
        type: "address",
      },
      {
        internalType: "uint24",
        name: "fee",
        type: "uint24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registrar",
    outputs: [
      {
        internalType: "contract IKeeperRegistrar",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "feed",
        type: "address",
      },
    ],
    name: "setFastGasFeed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "newVal",
        type: "uint16",
      },
    ],
    name: "setMaxFillsPerUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "contract ERC20",
        name: "asset",
        type: "address",
      },
    ],
    name: "setMinimumAssets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IKeeperRegistrar",
        name: "_registrar",
        type: "address",
      },
    ],
    name: "setRegistrar",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "gasLimit",
        type: "uint32",
      },
    ],
    name: "setUpkeepGasLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "gasPrice",
        type: "uint32",
      },
    ],
    name: "setUpkeepGasPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract UniswapV3Pool",
        name: "pool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "initialUpkeepFunds",
        type: "uint256",
      },
    ],
    name: "setupLimitOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokenToSwapFees",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "upkeepGasLimit",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "upkeepGasPrice",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawNative",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenFeeIsIn",
        type: "address",
      },
    ],
    name: "withdrawSwapFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const LIMIT_ORDER_REGISTRY_CONTRACT: {
  [chainId: number]: Address | undefined;
} = {
  [Chains.ETHEREUM]: "0x54dF9e11c7933a9cA3BD1E540B63dA15edAe40bf",
  [Chains.OPTIMISM]: "0x54dF9e11c7933a9cA3BD1E540B63dA15edAe40bf",
  [Chains.ARBITRUM_ONE]: "0x54dF9e11c7933a9cA3BD1E540B63dA15edAe40bf",
  [Chains.POLYGON_POS]: "0x54dF9e11c7933a9cA3BD1E540B63dA15edAe40bf",
  [Chains.ZK_SYNC_ERA]: "0x0FD66bD1e0974e2535CB424E6675D60aC52a84Fa",
  [Chains.BASE]: "0xff8b754c64e9a8473bd6e1118d0eac67f0a8ae27",
};
