import { type MintActionParams } from '@rabbitholegg/questdk'

import {
  type TestCase,
  type TestParams,
  createTestCase,
} from '@rabbitholegg/questdk-plugin-utils'

import { NULL_ADDRESS } from './const'

// https://etherscan.io/tx/0x758264e852e8a8fee84e62a67966a7688c9b73df2f8f18159f3a9316ba2d2d18
export const PURCHASE_SET_PRICE_V5: TestParams<MintActionParams> = {
  transaction: {
    from: '0x303052148a78a692d7aa89bad454f3e91785488d',
    hash: '0x758264e852e8a8fee84e62a67966a7688c9b73df2f8f18159f3a9316ba2d2d18',
    input:
      '0xae77c23700000000000000000000000000000000000000000000000000000000000001db00000000000000000000000099a9b7c1116f9ceeb1652de04d5969cce509b069',
    to: '0x0635e2f2926b306356b5b3f5cb6489107796b085',
    value: '100000000000000000',
    chainId: 1,
  },
  params: {
    chainId: 1,
    contractAddress: '0x0635e2f2926b306356b5b3f5cb6489107796b085',
    tokenId: 475,
    recipient: '0x303052148A78A692d7Aa89bAd454F3e91785488D',
  },
}

// https://etherscan.io/tx/0x766c7587ac0e52b527c2673693034114a0f54b1f053998bb55dfeed70fb2ba97
export const PURCHASE_TO_SET_PRICE_V5: TestParams<MintActionParams> = {
  transaction: {
    from: '0x2c93e366a1c730d10026465b59802aa6260251ee',
    hash: '0x766c7587ac0e52b527c2673693034114a0f54b1f053998bb55dfeed70fb2ba97',
    input:
      '0x4e8d8787000000000000000000000000b689d0813ef8d63ad619ae5716229ed0d994c2ce00000000000000000000000000000000000000000000000000000000000001db00000000000000000000000099a9b7c1116f9ceeb1652de04d5969cce509b069',
    to: '0x0635e2f2926b306356b5b3f5cb6489107796b085',
    value: '100000000000000000',
    chainId: 1,
  },
  params: {
    chainId: 1,
    contractAddress: '0x0635e2f2926b306356b5b3f5cb6489107796b085',
    tokenId: 475,
    recipient: '0xb689D0813EF8d63aD619Ae5716229eD0D994c2ce',
  },
}

// https://etherscan.io/tx/0x591be4e7e64684cb64f5e01cdc322cddfa169c361c978df1e4502170f80f1096
export const PURCHASE_SET_PRICE_MERKLE_V5: TestParams<MintActionParams> = {
  transaction: {
    from: '0x367ff64da0668d86e7ac5d43dd9459fd4ce381d6',
    hash: '0x591be4e7e64684cb64f5e01cdc322cddfa169c361c978df1e4502170f80f1096',
    input:
      '0xeb7eb95a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000440e1b5a98332bca7564dbffa4146f976ce7539700000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000009a815527849021f62f5cd3d581b28d277e729b70fe683a808a0fbdd6c60dae133c5ec2bee5788f382acaae024d1dc433dc167327df9b75e5bd743c4774eff1900ffc9d60334f9f6e72f43f41566438d8bce42d0b712a939b1cdb16f0e87600ee7b94f0cfe08bae1d75986df5b6ee0329aa9a7478b643e469b82b86f235c227f94e091a48d94228a4bc0f68186622f14fb1c9a73b72b98e0ac6ea02a7fddf7a16b5e707c97c3acba4a9b846e9f29e885c9577ea3e428c476d16749784a5e318cbd5269d39af3f1c661207a68a60d312dee3934b01111d7356b6a441fe5676297956c998e7cd0a4541f6cf161a41b6e4acaf210142ee227cd904431d5fda9150d9878ae4ae72bba5e56f5e984925139cc14c19b9bf89222c54083c5579d083406d7',
    to: '0xa19bf77719a9b6e7daa3c33b3aac119af865e1c4',
    value: '100000000000000000',
    chainId: 1,
  },
  params: {
    chainId: 1,
    contractAddress: '0xa19bf77719a9b6e7daa3c33b3aac119af865e1c4',
    tokenId: 0,
    recipient: '0x367ff64da0668d86e7ac5d43dd9459fd4ce381d6',
  },
}

// https://etherscan.io/tx/0xbbf52b0286ca9e335bcdc9cfeb53ba70da6dbcf5b016c79f45ad4cafc5dad02f
export const PURCHASE_TO_SET_PRICE_MERKLE_V5: TestParams<MintActionParams> = {
  transaction: {
    from: '0x1e3637addc4b0ccb442f20cfcaebd3fe7c1a765a',
    hash: '0xbbf52b0286ca9e335bcdc9cfeb53ba70da6dbcf5b016c79f45ad4cafc5dad02f',
    input:
      '0x1467b1f70000000000000000000000001e3637addc4b0ccb442f20cfcaebd3fe7c1a765a000000000000000000000000000000000000000000000000000000000000017600000000000000000000000099a9b7c1116f9ceeb1652de04d5969cce509b06900000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000005a8dc5811afb2c6c6f259a037f57c6c517219b64490bdb40dcc283fc2cea2ed5aacf01bea6a24d0eae64f55812e6e54772ff2faae5e14c28f0aafac521db96d65fcbf6cef78da87700bbaefd37f696d690d45756fff1591f59040954704c3791983f1222124970ffa091607885abbcffd1740395ec9757c0d0e05d6ea7287970d4ff6f4c24cd74a7b5dd88ffa973b0b04e55d74457e51a66cf99af62632deba82',
    to: '0xa19bf77719a9b6e7daa3c33b3aac119af865e1c4',
    value: '0',
    chainId: 1,
  },
  params: {
    chainId: 1,
    contractAddress: '0xa19bf77719a9b6e7daa3c33b3aac119af865e1c4',
    tokenId: 374,
    recipient: '0x1e3637AdDC4B0CCb442f20cFcAeBD3fE7C1A765A',
  },
}

// https://etherscan.io/tx/0x40c56fbb6be6faa199b8ffc7ca3b4d27342a5b8e58142f2c34c45c9daaa949ae
export const PURCHASE_SET_PRICE_V4: TestParams<MintActionParams> = {
  transaction: {
    from: '0x43cc80b0d94c86c0c1184d1a0eec42fbe51a00a9',
    hash: '0x40c56fbb6be6faa199b8ffc7ca3b4d27342a5b8e58142f2c34c45c9daaa949ae',
    input:
      '0xefef39a100000000000000000000000000000000000000000000000000000000000001bd',
    to: '0x234b25288011081817b5cc199c3754269ccb76d2',
    value: '80000000000000000',
    chainId: 1,
  },
  params: {
    chainId: 1,
    contractAddress: '0x234b25288011081817b5cc199c3754269ccb76d2',
    tokenId: 445,
    recipient: '0x43cc80b0d94c86c0c1184d1a0eec42fbe51a00a9',
  },
}

// https://etherscan.io/tx/0xd4da7e67612d72944a47ccf4d201e38c662ca032213727c6008b96e43d91abfd
export const PURCHASE_TO_SET_PRICE_V4: TestParams<MintActionParams> = {
  transaction: {
    from: '0x26153ca3a54b0c54aeeeff9f2de50262af620118',
    hash: '0xd4da7e67612d72944a47ccf4d201e38c662ca032213727c6008b96e43d91abfd',
    input:
      '0x891407c0000000000000000000000000107054d474ec4995474bab1351f1da99029de63800000000000000000000000000000000000000000000000000000000000001e0',
    to: '0x234b25288011081817b5cc199c3754269ccb76d2',
    value: '0',
    chainId: 1,
  },
  params: {
    chainId: 1,
    contractAddress: '0x234b25288011081817b5cc199c3754269ccb76d2',
    tokenId: 480,
    recipient: '0x107054d474EC4995474BaB1351f1DA99029De638',
  },
}

// https://etherscan.io/tx/0x6f7fce36e129b1ce878e7c8c979cb60367a8d22e5f92343b5ced75ab24980c92
export const PURCHASE_SET_PRICE_ERC20_V4: TestParams<MintActionParams> = {
  transaction: {
    from: '0x23be060093db74f38b1a3daf57afdc1a23db0077',
    hash: '0x6f7fce36e129b1ce878e7c8c979cb60367a8d22e5f92343b5ced75ab24980c92',
    input:
      '0xefef39a100000000000000000000000000000000000000000000000000000000000001c2',
    to: '0x9fecd2fbc6d890fb93632dce9b1a01c4090a7e2d',
    value: '0',
    chainId: 1,
  },
  params: {
    chainId: 1,
    contractAddress: '0x9fecd2fbc6d890fb93632dce9b1a01c4090a7e2d',
    tokenId: 450,
    recipient: '0x23be060093db74f38b1a3daf57afdc1a23db0077',
  },
}

// https://etherscan.io/tx/0xf53b2689afeaf0ae7e512dda2b0f76320ae0cc709b7ceb8c80b7adbb6108e4d8
export const PURCHASE_MERKLE_V5: TestParams<MintActionParams> = {
  transaction: {
    from: '0x3dadf855b9e30e63bee10ec4d92cbfe789e5f8a8',
    hash: '0xf53b2689afeaf0ae7e512dda2b0f76320ae0cc709b7ceb8c80b7adbb6108e4d8',
    input:
      '0xda7e7c5000000000000000000000000000000000000000000000000000000000000001d000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000007107cb4c22be6d2703d1c799d52a100d26d459fd6a9ab0ade58287f411c997f9b94eae9d050dc751bf6ee8d82fb5f3d1c31d77fb507fc27a4deac455c39cebe53ca875c11c187b5c574893bcbd601da88edc5e6189bfbacd089e3b5cf1a64f9e3a24ff3a5eccb2265467b823088dfe0e85e98d5e70540eec31cd7df1d2745a75b4d88bf97ac1dbd725d252d7171412bad698411fbc68cfcc270511d50433000cb5cf8cddc53ccd5af71f218735889912aa4ad597439e78a10ab342357f52befc3fcea669250f7f4704e57ee7c019ba8de7c488a7baaae52507cd15a5255565ac100000000000000000000000000000000000000000000000000006d657461736e69706572',
    to: '0xb8bd1d2836c466db149f665f777928bee267304d',
    value: '80000000000000000',
    chainId: 1,
  },
  params: {
    chainId: 1,
    contractAddress: '0xb8bd1d2836c466db149f665f777928bee267304d',
    tokenId: 464,
    recipient: '0x3dadf855b9e30e63bee10ec4d92cbfe789e5f8a8',
  },
}

// https://etherscan.io/tx/0x7f72b9b410ee98d33d10d92fa19947a283c108db867a11bc44bec396a0cb4f21
export const PURCHASE_TO_MERKLE_V5: TestParams<MintActionParams> = {
  transaction: {
    from: '0x1e6c1375abc832540da73994bac82a2225a9bfbd',
    hash: '0x7f72b9b410ee98d33d10d92fa19947a283c108db867a11bc44bec396a0cb4f21',
    input:
      '0x202c58050000000000000000000000001e6c1375abc832540da73994bac82a2225a9bfbd00000000000000000000000000000000000000000000000000000000000001d000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000007d39927f804f5c801f93bf64973c92cb9f6d550031eaabd77a49ead90ddff0d077e5727df1156cf78e9f9d27399348b36b04d1ea7d5021514557cb0dac5404ee432636d72ff6be5fdd15cccb087a86d1195d0e3a859b7d8eb280ca5592533cca61957f82b714965f0523f2cb94261a30f0b817360883d6e1522e32540d7c5b821632567a4045982d8874c53ea870002bc3535ac99f17d821e2c54d4e8e68c298a5cf8cddc53ccd5af71f218735889912aa4ad597439e78a10ab342357f52befc3fcea669250f7f4704e57ee7c019ba8de7c488a7baaae52507cd15a5255565ac1',
    to: '0xb8bd1d2836c466db149f665f777928bee267304d',
    value: '80000000000000000',
    chainId: 1,
  },
  params: {
    chainId: 1,
    contractAddress: '0xb8bd1d2836c466db149f665f777928bee267304d',
    tokenId: 464,
    recipient: '0x1e6c1375abc832540DA73994BAC82A2225A9bFBd',
  },
}

// https://etherscan.io/tx/0xec27ee1885c48b8dc0b105f130aec2fa6b85e14258eea70354737f1dbe3d3c12
export const PURCHASE_DA_EXP_V4: TestParams<MintActionParams> = {
  transaction: {
    from: '0xbadb844dfb0ec559aaf3645b52ec3db0e0a3e124',
    hash: '0xec27ee1885c48b8dc0b105f130aec2fa6b85e14258eea70354737f1dbe3d3c12',
    input:
      '0xefef39a100000000000000000000000000000000000000000000000000000000000001ad',
    to: '0x47e2df2723238f913741cc6b1963e76fdfd19b94',
    value: '140000000000000000',
    chainId: 1,
  },
  params: {
    chainId: 1,
    contractAddress: '0x47e2df2723238f913741cc6b1963e76fdfd19b94',
    tokenId: 429,
    recipient: '0xbadb844dfb0ec559aaf3645b52ec3db0e0a3e124',
  },
}

// https://etherscan.io/tx/0x5a0794d6f9bcaf260ef9a4f2553b7466c59fb4ce6be7a6301e2919fdd176db19
export const PURCHASE_TO_DA_EXP_V4: TestParams<MintActionParams> = {
  transaction: {
    from: '0x1328a57ecfa4c1d88185899f81484de941114e46',
    hash: '0x5a0794d6f9bcaf260ef9a4f2553b7466c59fb4ce6be7a6301e2919fdd176db19',
    input:
      '0x891407c00000000000000000000000001328a57ecfa4c1d88185899f81484de941114e4600000000000000000000000000000000000000000000000000000000000001c2',
    to: '0x47e2df2723238f913741cc6b1963e76fdfd19b94',
    value: '100000000000000000',
    chainId: 1,
  },
  params: {
    chainId: 1,
    contractAddress: '0x47e2df2723238f913741cc6b1963e76fdfd19b94',
    tokenId: 450,
    recipient: '0x1328A57eCFA4c1d88185899F81484De941114E46',
  },
}

// https://etherscan.io/tx/0xf3af8296d43e81e452ccae605978d9550409113b78f9ae448a2fa6ef6ef3a307
export const INCOMPATIBLE_CONTRACT_PURCHASE: TestParams<MintActionParams> = {
  transaction: {
    chainId: 1,
    from: '0x457ee5f723c7606c12a7264b52e285906f91eea6',
    hash: '0xf3af8296d43e81e452ccae605978d9550409113b78f9ae448a2fa6ef6ef3a307',
    input:
      '0xefef39a10000000000000000000000000000000000000000000000000000000000000171',
    to: '0x0bbb93c5d118d1dee49e96bcadc161403f4f8612',
    value: '0',
  },
  params: {
    chainId: 1,
    contractAddress: '0x0bbb93c5d118d1dee49e96bcadc161403f4f8612',
  },
}

// https://arbiscan.io/tx/0x085e59f8523be5da763dc44e9b7a13b4200dae9b846cbba559e4a1c033238287
export const ARBITRUM_PURCHASE_TRANSACTION: TestParams<MintActionParams> = {
  transaction: {
    from: '0x5fe5f06e3471a1af24f9e8a1e866e16205d5df1a',
    hash: '0x085e59f8523be5da763dc44e9b7a13b4200dae9b846cbba559e4a1c033238287',
    input:
      '0xae77c2370000000000000000000000000000000000000000000000000000000000000001000000000000000000000000d1d1222f6d3e4f64db1c025ecd0b314db8449ac4',
    to: '0xe2bc24f74ed326ca4deb75753942731a566ebc83',
    value: '2673000000000000',
    chainId: 42161,
  },
  params: {
    chainId: 42161,
    contractAddress: '0xe2bc24f74ed326ca4deb75753942731a566ebc83',
    tokenId: 1,
    recipient: '0x5fe5f06e3471a1af24f9e8a1e866e16205d5df1a',
  },
}

const chainTxnMap = {
  mainnet: {
    purchaseSetPriceV5: PURCHASE_SET_PRICE_V5,
    purchaseToSetPriceV5: PURCHASE_TO_SET_PRICE_V5,
    purchaseSetPriceMerkleV5: PURCHASE_SET_PRICE_MERKLE_V5,
    purchaseToSetPriceMerkleV5: PURCHASE_TO_SET_PRICE_MERKLE_V5,
    purchaseSetPriceV4: PURCHASE_SET_PRICE_V4,
    purchaseToSetPriceV4: PURCHASE_TO_SET_PRICE_V4,
    purchaseSetPriceERC20V4: PURCHASE_SET_PRICE_ERC20_V4,
    purchaseMerkleV5: PURCHASE_MERKLE_V5,
    purchaseToMerkleV5: PURCHASE_TO_MERKLE_V5,
    purchaseDAExpV4: PURCHASE_DA_EXP_V4,
    purchaseToDAExpV4: PURCHASE_TO_DA_EXP_V4,
  },
  Arbitrum: {
    purchase: ARBITRUM_PURCHASE_TRANSACTION,
    // Unable to locate purchaseTo test txn
  },
}

const validTxnCases: TestCase<MintActionParams>[] = []
const invalidTxnCases: TestCase<MintActionParams>[] = []

Object.entries(chainTxnMap).forEach(([chain, txnMap]) => {
  Object.entries(txnMap).forEach(([chainFn, testTxn]) => {
    validTxnCases.push(
      createTestCase(testTxn, `when minting via "${chainFn}" on ${chain}`, {
        tokenId: undefined,
        recipient: undefined,
      }),
    )

    validTxnCases.push(
      createTestCase(
        testTxn,
        `when minting via "${chainFn}" with tokenId on ${chain}`,
        {
          recipient: undefined,
        },
      ),
    )

    validTxnCases.push(
      createTestCase(
        testTxn,
        `when minting via "${chainFn}" with recipient on ${chain}`,
        {
          tokenId: undefined,
        },
      ),
    )

    invalidTxnCases.push(
      createTestCase(
        testTxn,
        `when minting via "${chainFn}" when tokenId doesn\'t match on ${chain}`,
        {
          tokenId: -1,
        },
      ),
    )

    invalidTxnCases.push(
      createTestCase(
        testTxn,
        `when minting via "${chainFn}" when recipient doesn\'t match on ${chain}`,
        {
          recipient: NULL_ADDRESS,
        },
      ),
    )
  })
})

invalidTxnCases.push(
  createTestCase(
    INCOMPATIBLE_CONTRACT_PURCHASE,
    'when handling mint using V3 incompatible minter',
  ),
)

export const validTransactionTestCases = validTxnCases
export const invalidTransactionCases = invalidTxnCases
