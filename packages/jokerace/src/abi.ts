export const JOKERACE_CAST_VOTE_ABI = [
  {
    "type": "function",
    "name": "castVote",
    "inputs": [
      {
        "name": "proposalId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "support",
        "type": "uint8",
        "internalType": "uint8"
      },
      {
        "name": "totalVotes",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "numVotes",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "proof",
        "type": "bytes32[]",
        "internalType": "bytes32[]"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "payable"
  },
]

export const JOKERACE_CAST_VOTE_WITHOUT_PROOF_ABI = [
  {
    "type": "function",
    "name": "castVoteWithoutProof",
    "inputs": [
      {
        "name": "proposalId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "support",
        "type": "uint8",
        "internalType": "uint8"
      },
      {
        "name": "numVotes",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "payable"
  },
]
