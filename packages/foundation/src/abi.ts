export const DROP_FACTORY_ABI = [
  {
    // 0x16da9864
    inputs: [
      { internalType: 'address', name: 'nftContract', type: 'address' },
      { internalType: 'uint256', name: 'count', type: 'uint256' },
      { internalType: 'address', name: 'nftRecipient', type: 'address' },
    ],
    name: 'mintFromDutchAuctionV2',
    outputs: [
      { internalType: 'uint256', name: 'firstTokenId', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    // 0x334965c2
    inputs: [
      { internalType: 'address', name: 'nftContract', type: 'address' },
      { internalType: 'uint16', name: 'count', type: 'uint16' },
      { internalType: 'address', name: 'nftRecipient', type: 'address' },
      { internalType: 'address payable', name: 'buyReferrer', type: 'address' },
    ],
    name: 'mintFromFixedPriceSaleV2',
    outputs: [
      { internalType: 'uint256', name: 'firstTokenId', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    // 0x0cafb113
    inputs: [
      { internalType: 'address', name: 'nftContract', type: 'address' },
      { internalType: 'uint256', name: 'count', type: 'uint256' },
      { internalType: 'address', name: 'nftRecipient', type: 'address' },
      { internalType: 'address payable', name: 'buyReferrer', type: 'address' },
      { internalType: 'bytes32[]', name: 'proof', type: 'bytes32[]' },
    ],
    name: 'mintFromFixedPriceSaleWithEarlyAccessAllowlistV2',
    outputs: [
      { internalType: 'uint256', name: 'firstTokenId', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'nftContract', type: 'address' }],
    name: 'getFixedPriceSaleV2',
    outputs: [
      { internalType: 'address payable', name: 'seller', type: 'address' },
      { internalType: 'uint256', name: 'price', type: 'uint256' },
      { internalType: 'uint256', name: 'limitPerAccount', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'numberOfTokensAvailableToMint',
        type: 'uint256',
      },
      { internalType: 'bool', name: 'marketCanMint', type: 'bool' },
      {
        internalType: 'uint256',
        name: 'generalAvailabilityStartTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'earlyAccessStartTime',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'mintFeePerNftInWei', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'nftContract', type: 'address' }],
    name: 'getDutchAuctionV2',
    outputs: [
      { internalType: 'uint256', name: 'maxPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'minPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'limitPerAccount', type: 'uint256' },
      { internalType: 'uint256', name: 'startTime', type: 'uint256' },
      { internalType: 'uint256', name: 'endTime', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'totalAvailableSupply',
        type: 'uint256',
      },
      { internalType: 'uint256', name: 'totalMintedCount', type: 'uint256' },
      { internalType: 'uint256', name: 'lastSalePrice', type: 'uint256' },
      { internalType: 'uint256', name: 'currentPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'mintFeePerNftInWei', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export const MULTI_TOKEN_ABI = [
  {
    inputs: [
      { internalType: 'address payable', name: 'treasury', type: 'address' },
      { internalType: 'address', name: 'feth', type: 'address' },
      { internalType: 'address', name: 'worldsNft', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'DropMarketLibrary_General_Availability_Start_Time_Has_Expired',
    type: 'error',
  },
  {
    inputs: [],
    name: 'DropMarketLibrary_Mint_Permission_Required',
    type: 'error',
  },
  {
    inputs: [],
    name: 'DropMarketLibrary_Only_Callable_By_Collection_Admin',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'maxTime', type: 'uint256' }],
    name: 'DropMarketLibrary_Time_Too_Far_In_The_Future',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FETHNode_FETH_Address_Is_Not_A_Contract',
    type: 'error',
  },
  { inputs: [], name: 'FETHNode_Only_FETH_Can_Transfer_ETH', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'expectedValueAmount', type: 'uint256' },
    ],
    name: 'FethNode_Too_Much_Value_Provided',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FoundationTreasuryNode_Address_Is_Not_A_Contract',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MultiTokenDropMarketFixedPriceSale_Collection_Must_Be_ERC_1155',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'generalAvailabilityStartTime',
        type: 'uint256',
      },
    ],
    name: 'MultiTokenDropMarketFixedPriceSale_General_Access_Not_Open',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MultiTokenDropMarketFixedPriceSale_Must_Buy_At_Least_One_Token',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MultiTokenDropMarketFixedPriceSale_Must_Have_Available_Supply',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MultiTokenDropMarketFixedPriceSale_Payment_Address_Required',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MultiTokenDropMarketFixedPriceSale_Recipient_Cannot_Be_Zero_Address',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MultiTokenDropMarketFixedPriceSale_Sale_Terms_Not_Found',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'mintEndTime', type: 'uint256' }],
    name: 'MultiTokenDropMarketFixedPriceSale_Start_Time_Is_After_Mint_End_Time',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'existingSaleTermsId', type: 'uint256' },
    ],
    name: 'MultiTokenDropMarketFixedPriceSale_Token_Already_Listed_For_Sale',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'bits', type: 'uint8' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'SafeCastOverflowedUintDowncast',
    type: 'error',
  },
  {
    inputs: [],
    name: 'WorldsNftNode_Worlds_NFT_Is_Not_A_Contract',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'saleTermsId',
        type: 'uint256',
      },
    ],
    name: 'CancelSaleTerms',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'multiTokenContract',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'saleTermsId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'pricePerQuantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address payable',
        name: 'creatorPaymentAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'generalAvailabilityStartTime',
        type: 'uint256',
      },
    ],
    name: 'ConfigureFixedPriceSale',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'invalidatedSaleTermsId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'newSaleTermsId',
        type: 'uint256',
      },
    ],
    name: 'InvalidateSaleTerms',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'saleTermsId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'referrer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenQuantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'pricePerQuantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'creatorRevenue',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'worldCuratorRevenue',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'protocolFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'referrerReward',
        type: 'uint256',
      },
    ],
    name: 'MintFromFixedPriceSale',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'WithdrawalToFETH',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'saleTermsId', type: 'uint256' }],
    name: 'cancelFixedPriceSale',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'multiTokenContract', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'uint256', name: 'pricePerQuantity', type: 'uint256' },
      {
        internalType: 'address payable',
        name: 'creatorPaymentAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'generalAvailabilityStartTime',
        type: 'uint256',
      },
    ],
    name: 'createFixedPriceSale',
    outputs: [
      { internalType: 'uint256', name: 'saleTermsId', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFethAddress',
    outputs: [
      { internalType: 'address', name: 'fethAddress', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'saleTermsId', type: 'uint256' },
      { internalType: 'address payable', name: 'referrer', type: 'address' },
    ],
    name: 'getFixedPriceSale',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'multiTokenContract',
            type: 'address',
          },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'pricePerQuantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quantityAvailableToMint',
            type: 'uint256',
          },
          {
            internalType: 'address payable',
            name: 'creatorPaymentAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'generalAvailabilityStartTime',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'mintEndTime', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'creatorRevenuePerQuantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'referrerRewardPerQuantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'worldCuratorRevenuePerQuantity',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'protocolFeePerQuantity',
            type: 'uint256',
          },
        ],
        internalType:
          'struct MultiTokenDropMarketFixedPriceSale.GetFixedPriceSaleResults',
        name: 'results',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFoundationTreasury',
    outputs: [
      {
        internalType: 'address payable',
        name: 'treasuryAddress',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'pricePerQuantity', type: 'uint256' },
      { internalType: 'uint256', name: 'tokenQuantity', type: 'uint256' },
    ],
    name: 'getRevenueDistributionForMint',
    outputs: [
      { internalType: 'uint256', name: 'creatorRevenue', type: 'uint256' },
      { internalType: 'uint256', name: 'protocolFee', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'nftContract', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'getSaleTermsForToken',
    outputs: [
      { internalType: 'uint256', name: 'saleTermsId', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getWorldsNftAddress',
    outputs: [{ internalType: 'address', name: 'worldsNft', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'saleTermsId', type: 'uint256' },
      { internalType: 'uint256', name: 'tokenQuantity', type: 'uint256' },
      { internalType: 'address', name: 'tokenRecipient', type: 'address' },
      { internalType: 'address payable', name: 'referrer', type: 'address' },
    ],
    name: 'mintFromFixedPriceSale',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'saleTermsId', type: 'uint256' },
      { internalType: 'uint256', name: 'pricePerQuantity', type: 'uint256' },
      {
        internalType: 'address payable',
        name: 'creatorPaymentAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'generalAvailabilityStartTime',
        type: 'uint256',
      },
    ],
    name: 'updateFixedPriceSale',
    outputs: [
      { internalType: 'uint256', name: 'newSaleTermsId', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
]

export const MARKET_ROUTER_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_nftMarket', type: 'address' },
      { internalType: 'address', name: '_nftDropMarket', type: 'address' },
      {
        internalType: 'address',
        name: '_nftCollectionFactory',
        type: 'address',
      },
      { internalType: 'address', name: '_worlds', type: 'address' },
      {
        internalType: 'address',
        name: '_multiTokenDropMarket',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'valueRemaining', type: 'uint256' },
    ],
    name: 'MultiTokenDropMarketFixedPriceSale_Too_Much_Value_Provided',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MultiTokenDropMarketNode_Market_Is_Not_A_Contract',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTCollectionFactoryNode_Address_Is_Not_A_Contract',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTCreateAndListTimedEditionCollection_Sale_Duration_Cannot_Be_Zero',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTDropMarketNode_Address_Is_Not_A_Contract',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketNode_Address_Is_Not_A_Contract',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketRouterList_Buy_Price_Set_But_Should_Set_Buy_Price_Is_False',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketRouterList_Duration_Set_Without_Reserve_Price',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketRouterList_Missing_World_Associations',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketRouterList_Must_Set_Reserve_Buy_Price_Or_World',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketRouterList_Must_Set_Reserve_Or_Buy_Price',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NFTMarketRouterList_Schedule_Set_Without_Prices',
    type: 'error',
  },
  { inputs: [], name: 'NFTMarketRouterList_Token_Ids_Not_Set', type: 'error' },
  {
    inputs: [],
    name: 'NFTMarketRouterList_World_Id_Set_Without_Prices',
    type: 'error',
  },
  {
    inputs: [],
    name: 'RouteCallLibrary_Call_Failed_Without_Revert_Reason',
    type: 'error',
  },
  { inputs: [], name: 'TxDeadline_Tx_Deadline_Expired', type: 'error' },
  {
    inputs: [],
    name: 'WorldsNftNode_Worlds_NFT_Is_Not_A_Contract',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'multiTokenCollection',
        type: 'address',
      },
    ],
    name: 'MintMultiTokensFromFreeFixedPriceSaleInBlock',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'nftContract', type: 'address' },
      { internalType: 'uint256[]', name: 'tokenIds', type: 'uint256[]' },
      { internalType: 'uint256', name: 'reservePrice', type: 'uint256' },
      { internalType: 'uint256', name: 'auctionDuration', type: 'uint256' },
      { internalType: 'bool', name: 'shouldSetBuyPrice', type: 'bool' },
      { internalType: 'uint256', name: 'buyPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'saleStartsAt', type: 'uint256' },
      {
        components: [
          { internalType: 'uint256', name: 'worldId', type: 'uint256' },
          {
            internalType: 'uint16',
            name: 'takeRateInBasisPoints',
            type: 'uint16',
          },
          { internalType: 'bytes', name: 'worldsApprovalData', type: 'bytes' },
        ],
        internalType: 'struct WorldAssociation[]',
        name: 'worldAssociations',
        type: 'tuple[]',
      },
    ],
    name: 'batchListFromCollection',
    outputs: [
      {
        internalType: 'uint256',
        name: 'firstAuctionIdOfSequence',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'nftContract', type: 'address' },
      {
        components: [
          { internalType: 'uint256', name: 'price', type: 'uint256' },
          { internalType: 'uint256', name: 'limitPerAccount', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'generalAvailabilityStartTime',
            type: 'uint256',
          },
        ],
        internalType: 'struct FixedPriceSaleParams',
        name: 'fixedPriceSaleParams',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint256', name: 'worldId', type: 'uint256' },
          {
            internalType: 'uint16',
            name: 'takeRateInBasisPoints',
            type: 'uint16',
          },
          { internalType: 'bytes', name: 'worldsApprovalData', type: 'bytes' },
        ],
        internalType: 'struct WorldAssociation',
        name: 'worldAssociation',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'txDeadlineTime', type: 'uint256' },
    ],
    name: 'createFixedPriceSaleV2',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'nftContract', type: 'address' },
      {
        components: [
          { internalType: 'uint256', name: 'price', type: 'uint256' },
          { internalType: 'uint256', name: 'limitPerAccount', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'generalAvailabilityStartTime',
            type: 'uint256',
          },
        ],
        internalType: 'struct FixedPriceSaleParams',
        name: 'fixedPriceSaleParams',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'earlyAccessStartTime',
        type: 'uint256',
      },
      { internalType: 'bytes32', name: 'merkleRoot', type: 'bytes32' },
      { internalType: 'string', name: 'merkleTreeUri', type: 'string' },
      {
        components: [
          { internalType: 'uint256', name: 'worldId', type: 'uint256' },
          {
            internalType: 'uint16',
            name: 'takeRateInBasisPoints',
            type: 'uint16',
          },
          { internalType: 'bytes', name: 'worldsApprovalData', type: 'bytes' },
        ],
        internalType: 'struct WorldAssociation',
        name: 'worldAssociation',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'txDeadlineTime', type: 'uint256' },
    ],
    name: 'createFixedPriceSaleWithEarlyAccessAllowlistV2',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'string', name: 'tokenURI', type: 'string' },
          { internalType: 'uint32', name: 'maxTokenId', type: 'uint32' },
          {
            internalType: 'uint96',
            name: 'contractCreationNonce',
            type: 'uint96',
          },
        ],
        internalType: 'struct LimitedEditionCollectionCreationParams',
        name: 'collectionParams',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint256', name: 'price', type: 'uint256' },
          { internalType: 'uint256', name: 'limitPerAccount', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'generalAvailabilityStartTime',
            type: 'uint256',
          },
        ],
        internalType: 'struct FixedPriceSaleParams',
        name: 'fixedPriceSaleParams',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint256', name: 'worldId', type: 'uint256' },
          {
            internalType: 'uint16',
            name: 'takeRateInBasisPoints',
            type: 'uint16',
          },
          { internalType: 'bytes', name: 'worldsApprovalData', type: 'bytes' },
        ],
        internalType: 'struct WorldAssociation',
        name: 'worldAssociation',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'txDeadlineTime', type: 'uint256' },
    ],
    name: 'createLimitedEditionCollectionAndFixedPriceSaleV2',
    outputs: [{ internalType: 'address', name: 'collection', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'string', name: 'tokenURI', type: 'string' },
          { internalType: 'uint32', name: 'maxTokenId', type: 'uint32' },
          {
            internalType: 'uint96',
            name: 'contractCreationNonce',
            type: 'uint96',
          },
        ],
        internalType: 'struct LimitedEditionCollectionCreationParams',
        name: 'collectionParams',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
        ],
        internalType: 'struct CallWithoutValue',
        name: 'paymentAddressFactoryCall',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint256', name: 'price', type: 'uint256' },
          { internalType: 'uint256', name: 'limitPerAccount', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'generalAvailabilityStartTime',
            type: 'uint256',
          },
        ],
        internalType: 'struct FixedPriceSaleParams',
        name: 'fixedPriceSaleParams',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint256', name: 'worldId', type: 'uint256' },
          {
            internalType: 'uint16',
            name: 'takeRateInBasisPoints',
            type: 'uint16',
          },
          { internalType: 'bytes', name: 'worldsApprovalData', type: 'bytes' },
        ],
        internalType: 'struct WorldAssociation',
        name: 'worldAssociation',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'txDeadlineTime', type: 'uint256' },
    ],
    name: 'createLimitedEditionCollectionAndFixedPriceSaleWithPaymentFactoryV2',
    outputs: [{ internalType: 'address', name: 'collection', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'nftContract', type: 'address' },
      { internalType: 'uint256', name: 'maxPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'minPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'limitPerAccount', type: 'uint256' },
      { internalType: 'uint256', name: 'startTime', type: 'uint256' },
      { internalType: 'uint256', name: 'saleDuration', type: 'uint256' },
      {
        components: [
          { internalType: 'uint256', name: 'worldId', type: 'uint256' },
          {
            internalType: 'uint16',
            name: 'takeRateInBasisPoints',
            type: 'uint16',
          },
          { internalType: 'bytes', name: 'worldsApprovalData', type: 'bytes' },
        ],
        internalType: 'struct WorldAssociation',
        name: 'worldAssociation',
        type: 'tuple',
      },
    ],
    name: 'createLinearDutchAuctionV2',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'string', name: 'tokenURI', type: 'string' },
          {
            internalType: 'uint96',
            name: 'contractCreationNonce',
            type: 'uint96',
          },
        ],
        internalType: 'struct TimedEditionCollectionCreationParams',
        name: 'collectionParams',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint256', name: 'price', type: 'uint256' },
          { internalType: 'uint256', name: 'limitPerAccount', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'generalAvailabilityStartTime',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'saleDuration', type: 'uint256' },
        ],
        internalType: 'struct FixedPriceSaleParamsAndDuration',
        name: 'fixedPriceSaleParams',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint256', name: 'worldId', type: 'uint256' },
          {
            internalType: 'uint16',
            name: 'takeRateInBasisPoints',
            type: 'uint16',
          },
          { internalType: 'bytes', name: 'worldsApprovalData', type: 'bytes' },
        ],
        internalType: 'struct WorldAssociation',
        name: 'worldAssociation',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'txDeadlineTime', type: 'uint256' },
    ],
    name: 'createTimedEditionCollectionAndFixedPriceSale',
    outputs: [{ internalType: 'address', name: 'collection', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'symbol', type: 'string' },
          { internalType: 'string', name: 'tokenURI', type: 'string' },
          {
            internalType: 'uint96',
            name: 'contractCreationNonce',
            type: 'uint96',
          },
        ],
        internalType: 'struct TimedEditionCollectionCreationParams',
        name: 'collectionParams',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'address', name: 'target', type: 'address' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
        ],
        internalType: 'struct CallWithoutValue',
        name: 'paymentAddressFactoryCall',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint256', name: 'price', type: 'uint256' },
          { internalType: 'uint256', name: 'limitPerAccount', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'generalAvailabilityStartTime',
            type: 'uint256',
          },
          { internalType: 'uint256', name: 'saleDuration', type: 'uint256' },
        ],
        internalType: 'struct FixedPriceSaleParamsAndDuration',
        name: 'fixedPriceSaleParams',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint256', name: 'worldId', type: 'uint256' },
          {
            internalType: 'uint16',
            name: 'takeRateInBasisPoints',
            type: 'uint16',
          },
          { internalType: 'bytes', name: 'worldsApprovalData', type: 'bytes' },
        ],
        internalType: 'struct WorldAssociation',
        name: 'worldAssociation',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'txDeadlineTime', type: 'uint256' },
    ],
    name: 'createTimedEditionCollectionAndFixedPriceSaleWithPaymentFactory',
    outputs: [{ internalType: 'address', name: 'collection', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMultiTokenDropMarketAddress',
    outputs: [{ internalType: 'address', name: 'market', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNftCollectionFactoryAddress',
    outputs: [{ internalType: 'address', name: 'factory', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNftDropMarketAddress',
    outputs: [{ internalType: 'address', name: 'market', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNftMarketAddress',
    outputs: [{ internalType: 'address', name: 'market', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getWorldsNftAddress',
    outputs: [{ internalType: 'address', name: 'worldsNft', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'multiTokenCollection',
        type: 'address',
      },
      {
        components: [
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'uint256', name: 'quantity', type: 'uint256' },
        ],
        internalType:
          'struct NFTMarketRouterMultiTokenDropMarketFixedPriceSale.TokenQuantity[]',
        name: 'tokenQuantities',
        type: 'tuple[]',
      },
      { internalType: 'address', name: 'tokenRecipient', type: 'address' },
      { internalType: 'address', name: 'referrer', type: 'address' },
    ],
    name: 'mintMultiTokensFromFreeFixedPriceSale',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'nftContract', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'uint256', name: 'reservePrice', type: 'uint256' },
      { internalType: 'uint256', name: 'auctionDuration', type: 'uint256' },
      { internalType: 'bool', name: 'shouldSetBuyPrice', type: 'bool' },
      { internalType: 'uint256', name: 'buyPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'saleStartsAt', type: 'uint256' },
      {
        components: [
          { internalType: 'uint256', name: 'worldId', type: 'uint256' },
          {
            internalType: 'uint16',
            name: 'takeRateInBasisPoints',
            type: 'uint16',
          },
          { internalType: 'bytes', name: 'worldsApprovalData', type: 'bytes' },
        ],
        internalType: 'struct WorldAssociation',
        name: 'worldAssociation',
        type: 'tuple',
      },
    ],
    name: 'upsertListing',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const SUPPORTS_INTERFACE_ABI = [
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: 'isSupported', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
]
