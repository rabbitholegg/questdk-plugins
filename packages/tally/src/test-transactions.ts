// https://arbiscan.io/tx/0xb8f32ab6848dce8847782499c1558f5af834f855811746fdbc3ec6fefda0bb24
export const ARBITRUM_DELEGATION = {
  blockHash:
    "0xdf2e9fdcd475d9c28a70c2fd49fd08bb0ed29353ea6b515bfa9c3041f9292031",
  blockNumber: "135109029",
  from: "0x3f9e3fbbbe967481222ddaa98e84470d7099381f",
  gas: "300000",
  gasPrice: "100000000",
  maxFeePerGas: "100000000",
  maxPriorityFeePerGas: "0",
  hash: "0xb8f32ab6848dce8847782499c1558f5af834f855811746fdbc3ec6fefda0bb24",
  input:
    "0x5c19a95c0000000000000000000000003f9e3fbbbe967481222ddaa98e84470d7099381f",
  nonce: 20,
  to: "0x912ce59144191c1204e64559fe8253a0e49e6548",
  transactionIndex: 4,
  value: "0",
  type: "eip1559",
  accessList: [],
  chainId: 42161,
  v: "0",
  r: "0x1172c91951ebb45b426e5c3c4de13f72432e6c4fa14391f9ea8c2a92e8900292",
  s: "0x235efaf61057518479145d60232d69be62cc7eeb2661f95432f51bc3642bb767",
  typeHex: "0x2",
};

export const ARBITRUM_VOTE = {
  blockHash:
    "0x40a43e0826995ab215522115ccc3b42a60f5139e1c50d28fb2284f5a0866e825",
  blockNumber: "172917801",
  from: "0x13e7562ec8a95c01306d73b3d1f2e89f2fb81448",
  gas: "300000",
  gasPrice: "100000000",
  maxFeePerGas: "100000000",
  maxPriorityFeePerGas: "0",
  hash: "0xfa580cef452560289123f77d920f67824613f78744987ff1dbe1847e2dc6bdbb",
  input:
    "0x56781388606df3f45bf206a101cd435c9e0c62fa5cf398a4a9270893783a226c825adf310000000000000000000000000000000000000000000000000000000000000001",
  nonce: 437,
  to: "0x789fc99093b09ad01c34dc7251d0c89ce743e5a4",
  transactionIndex: 3,
  value: "0",
  type: "eip1559",
  accessList: [],
  chainId: 42161,
  typeHex: "0x2",
  //TODO is this right
  proposalId:
    "606df3f45bf206a101cd435c9e0c62fa5cf398a4a9270893783a226c825adf31",
  support: "0000000000000000000000000000000000000000000000000000000000000001",
};

export const ARBITRUM_VOTE_WITH_REASON = {
  blockHash:
    "0x90920255c646b101523d4dc254b3b99ce3b6a1d48e18afa119118eb94db367e8",
  blockNumber: "172917743",
  from: "0xfa89ca286cd7d5daedb9d1ad31b3788c8ce6250d",
  gas: "300000",
  gasPrice: "100000000",
  maxFeePerGas: "100000000",
  maxPriorityFeePerGas: "0",
  hash: "0xd0aecfe8b3baa22dc5102bbdc08ea9b03f833e59e6c5c1480a4f38147509f8cd",
  input:
    "0x7b3c71d3606df3f45bf206a101cd435c9e0c62fa5cf398a4a9270893783a226c825adf3100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000001577656e206d6f6f6e20616e64206d75636820776f770000000000000000000000",
  nonce: 497,
  to: "0x789fc99093b09ad01c34dc7251d0c89ce743e5a4",
  transactionIndex: 2,
  value: "0",
  type: "eip1559",
  accessList: [],
  chainId: 42161,
  typeHex: "0x2",
  //TODO https://arbiscan.io/tx/0xd0aecfe8b3baa22dc5102bbdc08ea9b03f833e59e6c5c1480a4f38147509f8cd wat
  proposalId: "43616303506326656287362617487331059827021737444126158637397168372555259240241",
  support
  reason: "wen moon and much wow"
};

//TODO castVoteBySig
// v: '0',
// r: '0x1172c91951ebb45b426e5c3c4de13f72432e6c4fa14391f9ea8c2a92e8900292',
// s: '0x235efaf61057518479145d60232d69be62cc7eeb2661f95432f51bc3642bb767',
//TODO castVoteWithReasonAndParams
//TODO castVoteWithReasonAndParamsBySig
