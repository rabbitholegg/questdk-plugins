export const JOKERACE_ABI = [
  {
    "type": "function",
    "name": "propose",
    "inputs": [
      {
        "name": "proposal",
        "type": "tuple",
        "internalType": "struct Governor.ProposalCore",
        "components": [
          {
            "name": "author",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "exists",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "description",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "targetMetadata",
            "type": "tuple",
            "internalType": "struct Governor.TargetMetadata",
            "components": [
              {
                "name": "targetAddress",
                "type": "address",
                "internalType": "address"
              }
            ]
          },
          {
            "name": "safeMetadata",
            "type": "tuple",
            "internalType": "struct Governor.SafeMetadata",
            "components": [
              {
                "name": "signers",
                "type": "address[]",
                "internalType": "address[]"
              },
              {
                "name": "threshold",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          }
        ]
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
  {
    "type": "function",
    "name": "proposeWithoutProof",
    "inputs": [
      {
        "name": "proposal",
        "type": "tuple",
        "internalType": "struct Governor.ProposalCore",
        "components": [
          {
            "name": "author",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "exists",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "description",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "targetMetadata",
            "type": "tuple",
            "internalType": "struct Governor.TargetMetadata",
            "components": [
              {
                "name": "targetAddress",
                "type": "address",
                "internalType": "address"
              }
            ]
          },
          {
            "name": "safeMetadata",
            "type": "tuple",
            "internalType": "struct Governor.SafeMetadata",
            "components": [
              {
                "name": "signers",
                "type": "address[]",
                "internalType": "address[]"
              },
              {
                "name": "threshold",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          }
        ]
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
