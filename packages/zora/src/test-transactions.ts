import type {
  MintActionParams,
  CreateActionParams,
} from '@rabbitholegg/questdk'
import { Chains, type TestParams } from '@rabbitholegg/questdk-plugin-utils'
import { zeroAddress } from 'viem'

export const BASIC_PURCHASE: TestParams<MintActionParams> = {
  transaction: {
    chainId: 10, // Optimism
    from: '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
    hash: '0xa7b4e4b5b9686d53fc4907c01cdf654beca5a823017ec5ee3f2a775abbe0fd38',
    input:
      '0x3a1b1d57000000000000000000000000628d4c61d81ac4f286b1778a063ed2f8810bc36700000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000',
    to: '0xfff631ef40557f8705e89053af794a1dcfa0a90b',
    value: '7700000000000000', // 0.0077 ETH
  },
  params: {
    chainId: Chains.OPTIMISM,
    contractAddress: '0xfff631ef40557f8705e89053af794a1dcfa0a90b',
    recipient: '0x628d4c61d81ac4f286b1778a063ed2f8810bc367',
  },
}

export const MINT: TestParams<MintActionParams> = {
  transaction: {
    chainId: 7777777, // Zora
    from: '0xeE520B72e4772E9bcb29a7B5940ACeC3d82AC9B1',
    to: '0x8057c6bf3bc3adfc20b0deaf1898d5294d9701e8',
    hash: '0x6e4e91536b59f1027913a77e2bb93ee362de64f95a41467c642ab8b1c0182804',
    input: '0x359f130200000000000000000000000004e2516a2c207e84a1839755675dfd8ef6302f0a0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000ee520b72e4772e9bcb29a7b5940acec3d82ac9b1',
    value: '777000000000000', // 0.000777 ETH
  },
  params: {
    chainId: Chains.ZORA,
    contractAddress: '0x8057C6Bf3bc3aDfc20B0dEaf1898d5294d9701e8',
    amount: '1',
    tokenId: 1,
    referral: zeroAddress,
  },
}

export const MINT_WITH_REWARDS: TestParams<MintActionParams> = {
  transaction: {
    chainId: 1, // Ethereum
    from: '0xd31143ca8503b25dde780dc1b92e9aa61d0e326d',
    hash: '0x2f0f426a13683f2eba67e26f142dd6c25b0760ab448c3eaf282a60c450a95b00',
    input:
      '0x9dbb844d0000000000000000000000008a1dbe9b1ceb1d17f92bebf10216fcfab5c3fba70000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000d31143ca8503b25dde780dc1b92e9aa61d0e326d',
    to: '0x4f330940159fb3368f5b06b34212c0cdb4e2c032',
    value: '22977000000000000',
  },
  params: {
    chainId: Chains.ETHEREUM,
    contractAddress: '0x4f330940159fb3368f5b06b34212c0cdb4e2c032',
    amount: '1',
  },
}

export const MINT_WITH_REWARDS_1155: TestParams<MintActionParams> = {
  transaction: {
    chainId: 7777777, // Zora
    from: '0xed12545c21a85bab43b25128f49f81446776f33e',
    hash: '0xc706eecf6f81dc1aaa2a75489c02233bd9fd88ebc845bbc326721a71c1cc6364',
    input:
      '0x9dbb844d00000000000000000000000004e2516a2c207e84a1839755675dfd8ef6302f0a0000000000000000000000000000000000000000000000000000000000000019000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000ed12545c21a85bab43b25128f49f81446776f33e',
    to: '0x4c0c2dd31d2661e8bcec60a42e803dcc6f81baad',
    value: '22977000000000000',
  },
  params: {
    chainId: Chains.ZORA,
    contractAddress: '0x4c0c2dd31d2661e8bcec60a42e803dcc6f81baad',
    amount: '1',
    tokenId: 25,
    referral: zeroAddress,
  },
}

export const MINT_BATCH_WITHOUT_FEES: TestParams<MintActionParams> = {
  transaction: {
    chainId: 10, // Optimism
    from: '0x1671b592610fb7427ed788b66fa3e9217ff41047',
    hash: '0x4c0d898b6f3864332e3e47a3924cad33491b8df0a05590d13175823ee62ef07c',
    input:
      '0x7c1e2068000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000003600000000000000000000000000000000000000000000000000000000000000002000000000000000000000000e538598941e4a25f471aef9b1b5dffd6ee0fda54000000000000000000000000e538598941e4a25f471aef9b1b5dffd6ee0fda5400000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000000e49dbb844d0000000000000000000000003678862f04290e565cca2ef163baeb92bb76790c0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000001671b592610fb7427ed788b66fa3e9217ff410470000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e49dbb844d0000000000000000000000003678862f04290e565cca2ef163baeb92bb76790c0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000001671b592610fb7427ed788b66fa3e9217ff410470000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000002c2ad68fd90000000000000000000000000000000000000000000000000000002c2ad68fd9000',
    to: '0x97eb05b8db496b12244bccf17cf377d00a99b67a',
    value: '1554000000000000',
  },
  params: {
    chainId: Chains.OPTIMISM,
    contractAddress: '0xe538598941e4a25f471aef9b1b5dffd6ee0fda54',
    amount: '1',
    tokenId: 2,
    referral: zeroAddress,
  },
}

export const ZERO_QUANTITY: TestParams<MintActionParams> = {
  transaction: {
    chainId: 10, // Optimism
    from: '0x1671b592610fb7427ed788b66fa3e9217ff41047',
    to: '0x025b81bfcb62a02b7bd47520e0a28bbe5c5b262b',
    hash: '0xc80ab930d86db58afbf4aa52b37e96d6ef041f0b51491a76ff38df8faee373e0',
    input:
      '0x9dbb844d0000000000000000000000003678862f04290e565cca2ef163baeb92bb76790c0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000f3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000000000000000000000000000000000000000006000000000000000000000000010a1db5d3a971cf1e565b28a86d5ce9e576a7b81000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000001d4da48b243cb5c30214f47d',
    value: '0',
  },
  params: {
    chainId: Chains.OPTIMISM,
    contractAddress: '0x025b81bfcb62a02b7bd47520e0a28bbe5c5b262b',
    tokenId: 1,
  },
}

export const EXPECTED_ENCODED_DATA_721 =
  '0xefef39a1000000000000000000000000000000000000000000000000000000000000000a'
export const EXPECTED_ENCODED_DATA_1155 =
  '0x359f130200000000000000000000000004e2516a2c207e84a1839755675dfd8ef6302f0a0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e3bba2a4f8e0f5c32ef5097f988a4d88075c8b4800000000000000000000000000000000000000000000000000000000000000200000000000000000000000001234567890123456789012345678901234567890'

export const BATCH_MINT_ARB: TestParams<MintActionParams> = {
  transaction: {
    chainId: 42161, // Arbitrum
    from: '0x1671b592610fb7427ed788b66fa3e9217ff41047',
    hash: '0x4c0d898b6f3864332e3e47a3924cad33491b8df0a05590d13175823ee62ef07c',
    input:
      '0x7c1e2068000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000fc0000000000000000000000000000000000000000000000000000000000000000b000000000000000000000000b850c9a71b925237a10dce831911b59849c883e4000000000000000000000000b850c9a71b925237a10dce831911b59849c883e4000000000000000000000000b850c9a71b925237a10dce831911b59849c883e4000000000000000000000000b850c9a71b925237a10dce831911b59849c883e4000000000000000000000000b850c9a71b925237a10dce831911b59849c883e4000000000000000000000000b850c9a71b925237a10dce831911b59849c883e4000000000000000000000000b850c9a71b925237a10dce831911b59849c883e4000000000000000000000000b850c9a71b925237a10dce831911b59849c883e4000000000000000000000000b850c9a71b925237a10dce831911b59849c883e4000000000000000000000000b850c9a71b925237a10dce831911b59849c883e4000000000000000000000000b850c9a71b925237a10dce831911b59849c883e4000000000000000000000000000000000000000000000000000000000000000b0000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000028000000000000000000000000000000000000000000000000000000000000003a000000000000000000000000000000000000000000000000000000000000004c000000000000000000000000000000000000000000000000000000000000005e00000000000000000000000000000000000000000000000000000000000000700000000000000000000000000000000000000000000000000000000000000082000000000000000000000000000000000000000000000000000000000000009400000000000000000000000000000000000000000000000000000000000000a600000000000000000000000000000000000000000000000000000000000000b800000000000000000000000000000000000000000000000000000000000000ca000000000000000000000000000000000000000000000000000000000000000e49dbb844d0000000000000000000000001cd1c1f3b8b779b50db23155f2cb244fcca06b210000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000006609dfa1cb75d74f4ff39c8a5057bd111fba5b220000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e49dbb844d0000000000000000000000001cd1c1f3b8b779b50db23155f2cb244fcca06b210000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000006609dfa1cb75d74f4ff39c8a5057bd111fba5b220000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e49dbb844d0000000000000000000000001cd1c1f3b8b779b50db23155f2cb244fcca06b210000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000006609dfa1cb75d74f4ff39c8a5057bd111fba5b220000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e49dbb844d0000000000000000000000001cd1c1f3b8b779b50db23155f2cb244fcca06b210000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000006609dfa1cb75d74f4ff39c8a5057bd111fba5b220000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e49dbb844d0000000000000000000000001cd1c1f3b8b779b50db23155f2cb244fcca06b210000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000006609dfa1cb75d74f4ff39c8a5057bd111fba5b220000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e49dbb844d0000000000000000000000001cd1c1f3b8b779b50db23155f2cb244fcca06b210000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000006609dfa1cb75d74f4ff39c8a5057bd111fba5b220000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e49dbb844d0000000000000000000000001cd1c1f3b8b779b50db23155f2cb244fcca06b210000000000000000000000000000000000000000000000000000000000000007000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000006609dfa1cb75d74f4ff39c8a5057bd111fba5b220000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e49dbb844d0000000000000000000000001cd1c1f3b8b779b50db23155f2cb244fcca06b210000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000006609dfa1cb75d74f4ff39c8a5057bd111fba5b220000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e49dbb844d0000000000000000000000001cd1c1f3b8b779b50db23155f2cb244fcca06b210000000000000000000000000000000000000000000000000000000000000009000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000006609dfa1cb75d74f4ff39c8a5057bd111fba5b220000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e49dbb844d0000000000000000000000001cd1c1f3b8b779b50db23155f2cb244fcca06b21000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000006609dfa1cb75d74f4ff39c8a5057bd111fba5b220000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e49dbb844d0000000000000000000000001cd1c1f3b8b779b50db23155f2cb244fcca06b21000000000000000000000000000000000000000000000000000000000000000b000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000006609dfa1cb75d74f4ff39c8a5057bd111fba5b2200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b0000000000000000000000000000000000000000000000000002c2ad68fd90000000000000000000000000000000000000000000000000000002c2ad68fd90000000000000000000000000000000000000000000000000000002c2ad68fd90000000000000000000000000000000000000000000000000000002c2ad68fd90000000000000000000000000000000000000000000000000000002c2ad68fd90000000000000000000000000000000000000000000000000000002c2ad68fd90000000000000000000000000000000000000000000000000000002c2ad68fd90000000000000000000000000000000000000000000000000000002c2ad68fd90000000000000000000000000000000000000000000000000000002c2ad68fd90000000000000000000000000000000000000000000000000000002c2ad68fd90000000000000000000000000000000000000000000000000000002c2ad68fd9000',
    to: '0xc6899816663891d7493939d74d83cb7f2bbcbb16',
    value: '1554000000000000',
  },
  params: {
    chainId: Chains.ARBITRUM_ONE,
    contractAddress: '0xb850c9a71b925237a10dce831911b59849c883e4',
  },
}

export const LAYER_ZERO_MINT: TestParams<MintActionParams> = {
  transaction: {
    chainId: 7777777, // Zora
    from: '0xe93685f3bBA03016F02bD1828BaDD6195988D950',
    hash: '0xc56b3535cb30f2fec20c22f99827ae620fdd99d42a206c433390400e21889a43',
    input:
      '0x252f7b01000000000000000000000000000000000000000000000000000000000000006f0000000000000000000000001572d48a52906b834fb236aa77831d669f6d87a10000000000000000000000000000000000000000000000000000000000200b208331a023e8f03d17ba832ae70092fd1404cf4293bfdc7195f2257b9044cc61528331a023e8f03d17ba832ae70092fd1404cf4293bfdc7195f2257b9044cc615200000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000005450000000000000000000000004d73adb72bc3dd368966edd0f0b2148401a178e20000000000000104006fe2510aa4b019af3eb835d3ac9c800382109a463100c31572d48a52906b834fb236aa77831d669f6d87a10100000000000000000000000044b74ee2695d6937df20877d99a1a9609c48697d0002c2ad68fd900000000000000000000000000044b74ee2695d6937df20877d99a1a9609c48697d00000000001e848000000000000000000000000000000000000000000000000000000000000000010000000000000000000000007ead444f525922666d128859b76e8f96ebf8d4a2000000000000000000000000823c6968088dbd4c4af13f5321bb3f8381f5b835000000000000000000000000b2f784dcc11a696d8f54dc1692feb2b660959a6a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000003a4c41a776300000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000323c74b3dae9844c113d41e9c3db2743c500a26d000000000000000000000000323c74b3dae9844c113d41e9c3db2743c500a26d0000000000000000000000000000000000000000000000000000000000000240000000000000000000000000b2f784dcc11a696d8f54dc1692feb2b660959a6a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000006000000000000000000000000043019f8be1f192587883b67dea2994999f5a2de2000000000000000000000000b2f784dcc11a696d8f54dc1692feb2b660959a6a0000000000000000000000000000000000000000000000000002c2ad68fd90000000000000000000000000000000000000000000000000000002c2ad68fd900000000000000000000000000042000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000124359f130200000000000000000000000004e2516a2c207e84a1839755675dfd8ef6302f0a0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e3bba2a4f8e0f5c32ef5097f988a4d88075c8b480000000000000000000000000000000000000000000000000000000000000020000000000000000000000000b2f784dcc11a696d8f54dc1692feb2b660959a6a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    to: '0xa658742d33ebd2ce2f0bdff73515aa797fd161d9',
    value: '0',
  },
  params: {
    chainId: Chains.ZORA,
    contractAddress: '0x323c74b3dae9844c113d41e9c3db2743c500a26d',
  },
}

export const CREATE_COLLECTION_BASE: TestParams<CreateActionParams> = {
  transaction: {
    chainId: 8453, // BASE
    from: '0xec8287faef6cd7fc9887be6e40d6abc0ccb29d2f',
    to: '0x777777c338d93e2c7adf08d102d45ca7cc4ed021',
    hash: '0x3ae17f5201c98cdcff8721f4fbf641d19356b00332f605e9d19d915b1e6a1be3',
    input:
      '0x0582823a00000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001f4000000000000000000000000ec8287faef6cd7fc9887be6e40d6abc0ccb29d2f000000000000000000000000ec8287faef6cd7fc9887be6e40d6abc0ccb29d2f00000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000042697066733a2f2f6261666b726569656435716f7a686578736678376e326a33366b72337573776d69766d7a6b326b686c7263366d796f61726f7a787861787662636d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c42617365f09f94b5f09fa5ba0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000240000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000003a000000000000000000000000000000000000000000000000000000000000005400000000000000000000000000000000000000000000000000000000000000024e72878b400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e4674cbae60000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000ffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000042697066733a2f2f6261666b726569677070737336623676346536346c61787165666c6e6e6c74346c6f6a6b3773676377767237347578707a6f686d627769756a3371000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000084afed7e9e0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001f4000000000000000000000000ec8287faef6cd7fc9887be6e40d6abc0ccb29d2f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000648ec998a0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000004e2516a2c207e84a1839755675dfd8ef6302f0a0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000164d904b94a000000000000000000000000000000000000000000000000000000000000000100000000000000000000000004e2516a2c207e84a1839755675dfd8ef6302f0a000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c434db7eee0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000006644013400000000000000000000000000000000000000000000000000000000666b8e3400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ec8287faef6cd7fc9887be6e40d6abc0ccb29d2f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c4c238d1ee000000000000000000000000ec8287faef6cd7fc9887be6e40d6abc0ccb29d2f0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    value: '0',
  },
  params: {
    chainId: Chains.BASE,
  },
}

export const CREATE_COLLECTION_ZORA: TestParams<CreateActionParams> = {
  transaction: {
    chainId: 7777777, // Zora
    from: '0x561db962f06B295cE2A95f31e81Ca5839b7CAfdB',
    to: '0x777777C338d93e2C7adf08D102d45CA7CC4Ed021',
    hash: '0x391c204dbc67500ef79d460e7ad9870c955c691bef9c5dce76fe6731d3bf5327',
    input:
      '0x0582823a00000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001f4000000000000000000000000561db962f06b295ce2a95f31e81ca5839b7cafdb000000000000000000000000561db962f06b295ce2a95f31e81ca5839b7cafdb00000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000042697066733a2f2f6261666b72656966366636736e786c7770767a6f36377376707a676c6d716b7335686b77353268706973626f736d646a746977616c366771633571000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000367686b0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000240000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000003a000000000000000000000000000000000000000000000000000000000000005400000000000000000000000000000000000000000000000000000000000000024e72878b400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e4674cbae60000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000ffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000042697066733a2f2f6261666b726569676f7472736c37756c65626c373776356a336c7575756c7678356e356879737a626f74657874666b6d6f637836636f7a36746671000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000084afed7e9e0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001f4000000000000000000000000561db962f06b295ce2a95f31e81ca5839b7cafdb0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000648ec998a0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000004e2516a2c207e84a1839755675dfd8ef6302f0a0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000164d904b94a000000000000000000000000000000000000000000000000000000000000000100000000000000000000000004e2516a2c207e84a1839755675dfd8ef6302f0a000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c434db7eee0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000006644203100000000000000000000000000000000000000000000000000000000666bad3100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002cd9760ba5000000000000000000000000000561db962f06b295ce2a95f31e81ca5839b7cafdb000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c4c238d1ee000000000000000000000000561db962f06b295ce2a95f31e81ca5839b7cafdb0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    value: '0',
  },
  params: {
    chainId: Chains.ZORA,
  },
}
