export const SYNAPSE_BRIDGE_FRAGMENTS = [
    {
        inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "chainId", type: "uint256" },
        { internalType: "contract IERC20", name: "token", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" }
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "chainId", type: "uint256" },
        { internalType: "contract IERC20", name: "token", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "uint8", name: "tokenIndexFrom", type: "uint8" },
        { internalType: "uint8", name: "tokenIndexTo", type: "uint8" },
        { internalType: "uint256", name: "minDy", type: "uint256" },
        { internalType: "uint256", name: "deadline", type: "uint256" }
        ],
        name: "depositAndSwap",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "chainId", type: "uint256" },
        { internalType: "contract ERC20Burnable", name: "token", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" }
        ],
        name: "redeem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "chainId", type: "uint256" },
        { internalType: "contract ERC20Burnable", name: "token", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "uint8", name: "swapTokenIndex", type: "uint8" },
        { internalType: "uint256", name: "swapMinAmount", type: "uint256" },
        { internalType: "uint256", name: "swapDeadline", type: "uint256" }
        ],
        name: "redeemAndRemove",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "chainId", type: "uint256" },
        { internalType: "contract ERC20Burnable", name: "token", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "uint8", name: "tokenIndexFrom", type: "uint8" },
        { internalType: "uint8", name: "tokenIndexTo", type: "uint8" },
        { internalType: "uint256", name: "minDy", type: "uint256" },
        { internalType: "uint256", name: "deadline", type: "uint256" }
        ],
        name: "redeemAndSwap",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
        { internalType: "bytes32", name: "to", type: "bytes32" },
        { internalType: "uint256", name: "chainId", type: "uint256" },
        { internalType: "contract ERC20Burnable", name: "token", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" }
        ],
        name: "redeemV2",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    //CCTP Deposit event.
    {
        inputs: [
        { internalType: "uint256", name: "chainId", type: "uint256" },
        { internalType: "address indexed", name: "sender", type: "address" },
        { internalType: "uint64", name: "nonce", type: "uint64" },
        { internalType: "address", name: "token", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "uint32", name: "requestVersion", type: "uint32" },
        { internalType: "bytes", name: "formattedRequest", type: "bytes" },
        { internalType: "bytes32", name: "requestID", type: "bytes32" }
        ],
        name: "CircleRequestSent",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    // Below are all the functions on the destination chain. I think we only need to track deposits for now.
    // {
    //     inputs: [
    //     { internalType: "address", name: "to", type: "address" },
    //     { internalType: "contract IERC20", name: "token", type: "address" },
    //     { internalType: "uint256", name: "amount", type: "uint256" },
    //     { internalType: "uint256", name: "fee", type: "uint256" },
    //     { internalType: "bytes32", name: "kappa", type: "bytes32" }
    //     ],
    //     name: "withdraw",
    //     stateMutability: "nonpayable",
    //     type: "function"
    // },
    // {
    //     inputs: [
    //     { internalType: "address", name: "to", type: "address" },
    //     { internalType: "contract IERC20", name: "token", type: "address" },
    //     { internalType: "uint256", name: "amount", type: "uint256" },
    //     { internalType: "uint256", name: "fee", type: "uint256" },
    //     { internalType: "contract ISwap", name: "pool", type: "address" },
    //     { internalType: "uint8", name: "swapTokenIndex", type: "uint8" },
    //     { internalType: "uint256", name: "swapMinAmount", type: "uint256" },
    //     { internalType: "uint256", name: "swapDeadline", type: "uint256" },
    //     { internalType: "bytes32", name: "kappa", type: "bytes32" }
    //     ],
    //     name: "withdrawAndRemove",
    //     stateMutability: "nonpayable",
    //     type: "function"
    // },
    // {
    //     inputs: [
    //     { internalType: "address payable", name: "to", type: "address" },
    //     { internalType: "contract IERC20Mintable", name: "token", type: "address" },
    //     { internalType: "uint256", name: "amount", type: "uint256" },
    //     { internalType: "uint256", name: "fee", type: "uint256" },
    //     { internalType: "bytes32", name: "kappa", type: "bytes32" }
    //     ],
    //     name: "mint",
    //     stateMutability: "nonpayable",
    //     type: "function"
    // },
    // {
    //     inputs: [
    //     { internalType: "address payable", name: "to", type: "address" },
    //     { internalType: "contract IERC20Mintable", name: "token", type: "address" },
    //     { internalType: "uint256", name: "amount", type: "uint256" },
    //     { internalType: "uint256", name: "fee", type: "uint256" },
    //     { internalType: "contract ISwap", name: "pool", type: "address" },
    //     { internalType: "uint8", name: "tokenIndexFrom", type: "uint8" },
    //     { internalType: "uint8", name: "tokenIndexTo", type: "uint8" },
    //     { internalType: "uint256", name: "minDy", type: "uint256" },
    //     { internalType: "uint256", name: "deadline", type: "uint256" },
    //     { internalType: "bytes32", name: "kappa", type: "bytes32" }
    //     ],
    //     name: "mintAndSwap",
    //     stateMutability: "nonpayable",
    //     type: "function"
    // },
]