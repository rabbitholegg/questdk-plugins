export type Actions = 'mint' | 'swap' | 'stake' | 'bridge' | 'burn' | 'vote' | 'delegate' | 'options';

export const ActionParamKeys = {
  mint: ['chainId', 'contractAddress', 'amount', 'tokenId', 'recipient'],
  swap: ['chainId', 'contractAddress', 'amountIn', 'amountOut', 'tokenIn', 'tokenOut', 'recipient'],
  stake: ['chainId', 'contractAddress', 'tokenOne', 'amountOne', 'tokenTwo', 'amountTwo', 'duration'],
  bridge: ['sourceChainId', 'destinationChainId', 'contractAddress', 'amount', 'recipient'],
  burn: ['chainId', 'contractAddress', 'amount', 'tokenId', 'recipient'],
  vote: ['chainId', 'project', 'support', 'proposalId'],
  delegate: ['chainId', 'delegate', 'project', 'contractAddress', 'amount', 'delegator'],
  options: ['chainId', 'contractAddress', 'token', 'amount', 'recipient', 'orderType'],
};