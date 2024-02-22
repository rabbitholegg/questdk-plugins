export const RABBITHOLE_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'rewardTokenAddress_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'endTime_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'startTime_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalParticipants_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'questId_',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'actionSpec_',
        type: 'string',
      },
    ],
    name: 'create1155QuestAndQueue',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'rewardTokenAddress_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'endTime_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'startTime_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalParticipants_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'rewardAmount_',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'questId_',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'actionSpec_',
        type: 'string',
      },
      {
        internalType: 'uint40',
        name: 'durationTotal_',
        type: 'uint40',
      },
    ],
    name: 'createERC20StreamQuest',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'rewardTokenAddress_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'endTime_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'startTime_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalParticipants_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'rewardAmount_',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'questId_',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'actionSpec_',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'createQuestAndQueue',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
