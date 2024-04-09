export const ONE_DAY = 86400n
export const VE_ORBIT_CONTRACT = '0xfA1FDCF4682B72e56e3b32FF1ABA7AfCD5e1C7A8'

export const CREATE_LOCK_ABI = [
  {
    name: 'create_lock',
    outputs: [],
    inputs: [
      { type: 'uint256', name: '_value' },
      { type: 'uint256', name: '_unlock_time' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    gas: 74281465,
  },
]
