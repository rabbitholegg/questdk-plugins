/**
 * Support all active V3 flagship minting contracts including ones shared with engines.
 * Use the below table as compatibility guide:
 * https://github.com/ArtBlocks/artblocks-contracts/blob/main/packages/contracts/MINTER_SUITE.md#minterfilter-suite-compatibility-chart
 * https://github.com/ArtBlocks/artblocks-contracts/blob/main/packages/contracts/MINTER_SUITE.md#active-flagship-minting-contracts
 */
export enum Contracts {
  MINTER_SET_PRICE_V5 = '0x0635E2f2926b306356b5B3F5CB6489107796b085',
  MINTER_SET_PRICE_ERC20V5 = '0x11515aE3f510D8BFEDD2B60B4A878F8a77a7b7ec',
  MINTER_DA_LIN_V5 = '0x7b03Ec8ee63740642ca76b5Fe169978f2077ca08',
  MINTER_DA_EXP_V5 = '0x7E6F7Aa281133e394041b5fEA1f3Be7a00D7201F',
  MINTER_DA_EXP_SETTLEMENT_V3 = '0x6caFC1B007F16f171B34eE45Fc61B378ad58F592',
  MINTER_SET_PRICE_MERKLE_V5 = '0xa19Bf77719A9B6E7daa3c33b3AAC119AF865e1c4',
  MINTER_SET_PRICE_HOLDER_V5 = '0x69f04FDDF0c4c32642B22E68b867282d5074A98a',
  MINTER_SET_PRICE_V4 = '0x234B25288011081817B5cC199C3754269cCb76D2',
  MINTER_SET_PRICE_ERC20_V4 = '0x9fEcd2FbC6D890fB93632DcE9b1a01c4090A7E2d',
  MINTER_MERKLE_V5 = '0xB8Bd1D2836C466DB149f665F777928bEE267304d',
  MINTER_MERKLE_SHARED_V5 = '0xa19Bf77719A9B6E7daa3c33b3AAC119AF865e1c4',
  MINTER_DA_LIN_V4 = '0x419501DD208BFf237e3E32C40D074065e12DfF4d',
  MINTER_DA_EXP_V4 = '0x47e2df2723238f913741Cc6b1963e76fdfD19B94',
}

export enum Chains {
  ETHEREUM = 1,
}

export const SHARED_MINTER_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'projectId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'coreContract',
        type: 'address',
      },
    ],
    name: 'purchase',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  // {
  //   inputs: [
  //     {
  //       internalType: 'address',
  //       name: 'to',
  //       type: 'address',
  //     },
  //     {
  //       internalType: 'uint256',
  //       name: 'projectId',
  //       type: 'uint256',
  //     },
  //     {
  //       internalType: 'address',
  //       name: 'coreContract',
  //       type: 'address',
  //     },
  //   ],
  //   name: 'purchaseTo',
  //   outputs: [
  //     {
  //       internalType: 'uint256',
  //       name: 'tokenId',
  //       type: 'uint256',
  //     },
  //   ],
  //   stateMutability: 'payable',
  //   type: 'function',
  // },
]
