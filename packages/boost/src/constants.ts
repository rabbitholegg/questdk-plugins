export const BOOST_PASS_CONTRACT = '0x9A618D6302f27cdBb97206Ce269A31C1F7da3913'
export const QUEST_FACTORY_CONTRACT =
  '0x52629961f71c1c2564c5aa22372cb1b9fa9eba3e'

export const BOOST_PASS_ABI = [
  {
    inputs: [
      { internalType: 'bytes', name: 'signature_', type: 'bytes' },
      { internalType: 'bytes', name: 'data_', type: 'bytes' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const DATA_ABI_PARAMS = ['address recipient', 'address referrer']

export const COMPLETE_BOOST_ABI = [
  {
    inputs: [{ internalType: 'bytes', name: 'compressedData_', type: 'bytes' }],
    name: 'claimCompressed',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]
