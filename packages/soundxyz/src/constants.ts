export const SUPERMINTER = '0x0000000000CF4558c36229ac0026ee16D3aE35Cd'
export const SUPERMINTER_V2 = '0x000000000001A36777f9930aAEFf623771b13e70'
export const SUPERMINTER_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'edition', type: 'address' },
          { internalType: 'uint8', name: 'tier', type: 'uint8' },
          { internalType: 'uint8', name: 'scheduleNum', type: 'uint8' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint32', name: 'quantity', type: 'uint32' },
          { internalType: 'address', name: 'allowlisted', type: 'address' },
          {
            internalType: 'uint32',
            name: 'allowlistedQuantity',
            type: 'uint32',
          },
          {
            internalType: 'bytes32[]',
            name: 'allowlistProof',
            type: 'bytes32[]',
          },
          { internalType: 'uint96', name: 'signedPrice', type: 'uint96' },
          { internalType: 'uint32', name: 'signedQuantity', type: 'uint32' },
          { internalType: 'uint32', name: 'signedClaimTicket', type: 'uint32' },
          { internalType: 'uint32', name: 'signedDeadline', type: 'uint32' },
          { internalType: 'bytes', name: 'signature', type: 'bytes' },
          { internalType: 'address', name: 'affiliate', type: 'address' },
          {
            internalType: 'bytes32[]',
            name: 'affiliateProof',
            type: 'bytes32[]',
          },
          { internalType: 'uint256', name: 'attributionId', type: 'uint256' },
        ],
        internalType: 'struct ISuperMinterV2.MintTo',
        name: 'p',
        type: 'tuple',
      },
    ],
    name: 'mintTo',
    outputs: [
      { internalType: 'uint256', name: 'fromTokenId', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'paid',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'required',
        type: 'uint256',
      },
    ],
    name: 'WrongPayment',
    type: 'error',
  },
]

export const MINT_INFO_LIST_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
    ],
    name: 'mintInfoList',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'edition',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'tier',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'scheduleNum',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'platform',
            type: 'address',
          },
          {
            internalType: 'uint96',
            name: 'price',
            type: 'uint96',
          },
          {
            internalType: 'uint32',
            name: 'startTime',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'endTime',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'maxMintablePerAccount',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'maxMintable',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'minted',
            type: 'uint32',
          },
          {
            internalType: 'uint16',
            name: 'affiliateFeeBPS',
            type: 'uint16',
          },
          {
            internalType: 'uint8',
            name: 'mode',
            type: 'uint8',
          },
          {
            internalType: 'bool',
            name: 'paused',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'hasMints',
            type: 'bool',
          },
          {
            internalType: 'bytes32',
            name: 'affiliateMerkleRoot',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'merkleRoot',
            type: 'bytes32',
          },
          {
            internalType: 'address',
            name: 'signer',
            type: 'address',
          },
        ],
        internalType: 'struct ISuperMinterV2.MintInfo[]',
        name: 'a',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export const TOTAL_PRICE_AND_FEES_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'edition',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'tier',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'scheduleNum',
        type: 'uint8',
      },
      {
        internalType: 'uint32',
        name: 'quantity',
        type: 'uint32',
      },
      {
        internalType: 'bool',
        name: 'hasValidAffiliate',
        type: 'bool',
      },
    ],
    name: 'totalPriceAndFees',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'total',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'subTotal',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'unitPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'finalArtistFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'finalAffiliateFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'finalPlatformFee',
            type: 'uint256',
          },
        ],
        internalType: 'struct ISuperMinterV2.TotalPriceAndFees',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
