// Withdraw of ETH https://arbiscan.io/tx/0x921a32f90c6fb69ae921c388b9f37f12ce1765ffba9fe687e8e3d306f511391a
// Deposit ETH on Arb to ETH https://etherscan.io/tx/0x25519a3907f4400ff2c71fc21ec276cd9d0a89dfdc1ceafe39521aae18b71a3d
// Deposit  ERC20 that is a bridge txn : https://etherscan.io/tx/0xe7b737930f7a5200503188d3b4a7a3681d7107a6ad2669423941ecbd47a4e89a
// Withdraw ERC20 on arb https://arbiscan.io/tx/0x4d798a192074b0df5ece7110a86b0ef8355d2f0ab6868c29fdc6c809d3057d3b

//TODO
// CCTP TXN Deposit of ERC 20 on ETH https://www.synapsescan.com/tx/9eb0928a5abfb72781c10986af80578f49d3d022bd722ad9ec97a144e46523de
export const DEPOSIT_ETH = {
  type: 'eip1559',
  blockHash:
    '0xdcc1fa077a87a6a77b82849a3774802d1ee98cbcc4ff97c869a0dbad523977e5',
  blockNumber: '18658341',
  from: '0x75e53251e56dc44c627f3af3d09141813eace30e',
  gas: '168899',
  gasPrice: '32561116807',
  maxFeePerGas: '44000000000',
  maxPriorityFeePerGas: '300000000',
  hash: '0x25519a3907f4400ff2c71fc21ec276cd9d0a89dfdc1ceafe39521aae18b71a3d',
  input:
    '0xc22881470000000000000000000000000abba441ded0dc30a29ad1d91264e1e87944858f000000000000000000000000000000000000000000000000000000000000a4b1000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee00000000000000000000000000000000000000000000000002c68af0bb14000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000002000000000000000000000000007e7a0e201fd38d3adaa9523da6c109a07118c96a000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000002c5d50a9a1f8000000000000000000000000000000000000000000000000000000000006563b23a00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ff00000000000000000000000000000000000000000000000000000000000000ff0000000000000000000000007e7a0e201fd38d3adaa9523da6c109a07118c96a000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee00000000000000000000000000000000000000000000000002c290e8b41cfd2000000000000000000000000000000000000000000000000000000000656cea6200000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a067668661c84476afcdc6fa5d758c4c01c3435200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001',
  nonce: 1466,
  to: '0x7e7a0e201fd38d3adaa9523da6c109a07118c96a',
  transactionIndex: 100,
  value: '200000000000000000',
  v: '0x0',
  r: '0x4e6ee6cbcb40a9ce173d2d2ac04e576f0f69540bb458b244716acd1fdd4c0b98',
  s: '0x410c1c6d309f9ea2f276f319a9428ff88ee859a5ee734ca9530e3cae2d21c2e2',
  chainId: 1,
  accessList: [],
  typeHex: '0x2',
}
export const WITHDRAW_ETH = {
  type: 'eip1559',
  blockHash:
    '0x601b3e55830bb0423fa5a405c088c56a271e399e63a3b021af0aa1929198edc6',
  blockNumber: '154380684 ',
  from: '0xfc9b9ea77d243e7abd17c751effc1000c4f0de1b',
  gas: '2979741',
  gasPrice: '100000000',
  maxPriorityFeePerGas: '0',
  maxFeePerGas: '135000000',
  hash: '0x921a32f90c6fb69ae921c388b9f37f12ce1765ffba9fe687e8e3d306f511391a',
  input:
    '0xc2288147000000000000000000000000fc9b9ea77d243e7abd17c751effc1000c4f0de1b0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee00000000000000000000000000000000000000000000000003982720b4d3800000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000002000000000000000000000000007e7a0e201fd38d3adaa9523da6c109a07118c96a0000000000000000000000003ea9b0ab55f34fb188824ee288ceaefc63cf908e0000000000000000000000000000000000000000000000000396ae4633dedefd000000000000000000000000000000000000000000000000000000006563aead00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a067668661c84476afcdc6fa5d758c4c01c34352000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000007e7a0e201fd38d3adaa9523da6c109a07118c96a000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000373306c12907efd00000000000000000000000000000000000000000000000000000000656ce6d500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ff00000000000000000000000000000000000000000000000000000000000000ff',
  nonce: 509,
  to: '0x7e7a0e201fd38d3adaa9523da6c109a07118c96a',
  transactionIndex: 1,
  value: '259000000000000000',
  v: '0x0',
  r: '0x5b07f183b8df0853c80bd62e94f2e5e51f8d47d46a4d6769052c7cff2e25a0c2',
  s: '0x33cfdc3efe417fb9e209749917d5aa51e723a747f90dc4d6712a658cd7baf27a',
  chainId: 42161,
  accessList: [],
  typeHex: '0x2',
}
export const DEPOSIT_ERC20 = {
  type: 'eip1559',
  blockHash:
    '0xe48986c126ea254ff92792e2a767106cb060723c26870c06a05987d7db779775',
  blockNumber: '18498668',
  from: '0x330b62aad4f54745a3256921480df8c518fbc35a',
  gas: '740529',
  gasPrice: '21141995474',
  maxFeePerGas: '25270000000',
  maxPriorityFeePerGas: '80000000',
  hash: '0x3b50354d78abdf883671afd5db176a5f36f3b5ec06b72e9b6676d58aa4c0e316',
  input:
    '0xc2288147000000000000000000000000330b62aad4f54745a3256921480df8c518fbc35a0000000000000000000000000000000000000000000000000000000000000038000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000000000000000000000000000000000000008c220f00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000002000000000000000000000000007e7a0e201fd38d3adaa9523da6c109a07118c96a0000000000000000000000001b84765de8b7566e4ceaf4d0fd3c5af52d3dde4f0000000000000000000000000000000000000000000000007f261f7ea88cdd720000000000000000000000000000000000000000000000000000000065463a0400000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000001116898dda4015ed8ddefb84b6e8bc24528af2d8000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000ff0000000000000000000000007e7a0e201fd38d3adaa9523da6c109a07118c96a0000000000000000000000008ac76a51cc950d9822d68b83fe1ad97b32cd580d00000000000000000000000000000000000000000000000071871ba3a35878bb00000000000000000000000000000000000000000000000000000000654f722c00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000028ec0b36f0819ecb5005cab836f4ed5a2eca4d1300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002',
  nonce: 107,
  to: '0x7e7a0e201fd38d3adaa9523da6c109a07118c96a',
  transactionIndex: 92,
  value: '0',
  v: '0x0',
  r: '0x3fd8b3006adf6837569c9955d7dea54ee311451f9d392e1f7f986fd71d4ea108',
  s: '0x1c94ecc74a5a63f5065d992998ca9f59e71a3b86f31aeaaa0475c0c7f67f9b79',
  chainId: 1,
  accessList: [],
  typeHex: '0x2',
}

export const WITHDRAW_ERC20 = {
  type: 'eip1559',
  blockHash:
    '0x8eca3f73ffd0afe1343ded57843ab387c811aa5756715f02161691f1bd6f230c',
  blockNumber: '153651470 ',
  from: '0x326c4daf6a8002eb790fa2338285e77052078fff',
  gas: '5525385',
  gasPrice: '100000000',
  maxPriorityFeePerGas: '0',
  maxFeePerGas: '135000000',
  hash: '0x4d798a192074b0df5ece7110a86b0ef8355d2f0ab6868c29fdc6c809d3057d3b',
  input:
    '0xc22881470000000000000000000000001598e7e8d20e7a07be53edbd2e4b012b048d67780000000000000000000000000000000000000000000000000000000000000001000000000000000000000000ff970a61a04b1ca14834a43f5de4533ebddb5cc800000000000000000000000000000000000000000000000000000000eec8a14c00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000002000000000000000000000000007e7a0e201fd38d3adaa9523da6c109a07118c96a0000000000000000000000002913e812cf0dcca30fb28e6cac3d2dcff44976880000000000000000000000000000000000000000000000d87a52fb4e8af335ce000000000000000000000000000000000000000000000000000000006560ca9a00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009dd329f5411466d9e0c488ff72519ca9fef0cb40000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000007e7a0e201fd38d3adaa9523da6c109a07118c96a000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec700000000000000000000000000000000000000000000000000000000ec77f0e400000000000000000000000000000000000000000000000000000000656a02c200000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000020000000000000000000000001116898dda4015ed8ddefb84b6e8bc24528af2d800000000000000000000000000000000000000000000000000000000000000ff0000000000000000000000000000000000000000000000000000000000000002',
  nonce: 345,
  to: '0x7e7a0e201fd38d3adaa9523da6c109a07118c96a',
  transactionIndex: 4,
  value: '0',
  v: '0x1',
  r: '0x506c4bb4329f636d3f38a38e9b74d70596d9f264e3964cb751f733cdd6e5abbe',
  s: '0x7b1265980e818822e90837ea4feb69cf993782f3bb3bb3d079c151e973714c91',
  chainId: 42161,
  accessList: [],
  typeHex: '0x2',
}

export const DEPOSIT_CCTP = {
  type: 'eip1559',
  blockHash:
    '0xe57420f9468ed26feabd3feafc9ba7a68eafd36f6a0bbb40c0f6e5c3a6045428',
  blockNumber: '18661430',
  from: '0xe65276e8a6732143dfe95238a6e45c8c0a4c0331',
  gas: '341091',
  gasPrice: '20622170993',
  maxFeePerGas: '27988172106',
  maxPriorityFeePerGas: '100000000',
  hash: '0xc655a28df444b56abf4a4b0afa21d6c240d1f8375da932f3643e0372da8e64b1',
  input:
    '0xc2288147000000000000000000000000e65276e8a6732143dfe95238a6e45c8c0a4c0331000000000000000000000000000000000000000000000000000000000000a4b1000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000011e1a30000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000011dd0f20000000000000000000000000000000000000000000000000000000006564445f00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000af88d065e77c8cc2239327c5edb3a432268e58310000000000000000000000000000000000000000000000000000000011cdd0c800000000000000000000000000000000000000000000000000000000656d7c8700000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000',
  nonce: 107,
  to: '0xd359bc471554504f683fbd4f6e36848612349ddf',
  transactionIndex: 74,
  value: '0',
  v: '0x0',
  r: '0x9838fcd6c755a1901083fb52ffd6b75d230bcd68451294048e8ec16e28621224',
  s: '0x354ec01c375311733fec8f5d3eb74fc3510799925968adc33ad781b2ddd7c4e8',
  chainId: 1,
  accessList: [],
  typeHex: '0x2',
}

export const WITHDRAW_CCTP = {
  type: 'eip1559',
  blockHash:
    '0x9faf2f76d410f79e14e31b8826d2d20579b967e5553a4a5f5c563a351b7e07bd',
  blockNumber: '154498612',
  from: '0xc5b0302e2e8cefc7552265fc705ca44e713fb8ba',
  gas: '1782264',
  gasPrice: '100000000',
  maxFeePerGas: '135000000',
  maxPriorityFeePerGas: '0',
  hash: '0x602f2421c5b529eb8953a85e2eb51c31bf2052ac0214266406e63d0e599007ff',
  input:
    '0xc2288147000000000000000000000000c5b0302e2e8cefc7552265fc705ca44e713fb8ba0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000af88d065e77c8cc2239327c5edb3a432268e58310000000000000000000000000000000000000000000000000000000005aa58ac00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000af88d065e77c8cc2239327c5edb3a432268e58310000000000000000000000000000000000000000000000000000000005a8e562000000000000000000000000000000000000000000000000000000006564307000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000000000000000000000000000000000000043b0d2200000000000000000000000000000000000000000000000000000000656d689800000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000',
  nonce: 261,
  to: '0xd359bc471554504f683fbd4f6e36848612349ddf',
  transactionIndex: 2,
  value: '0',
  v: '0x0',
  r: '0x600821d3a76f940fc1b63f9c41ce1c7e5b35aed2d206635184ddb6e263ad63ea',
  s: '0x685850ff1ec36638421e25ecb5f91d8f23c6c7ef270d6632c03c200e0471dddc',
  chainId: 42161,
  accessList: [],
  typeHex: '0x2',
}