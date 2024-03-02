import { ActionType } from '@rabbitholegg/questdk'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { Choice, PromptObject } from 'prompts'
import { isAddress, isHash } from 'viem'
import { Actions, TransactionDetail } from './types'

// structure available chains into the format for prompts
const _chainValues = Object.values(Chains)
const _chainArray = _chainValues
  .filter((value) => typeof value === 'string')
  .map((value, _index) => {
    return { value: value, title: value }
  })

// structure available actiontypes into the format for prompts
// and remove Deposit, Lend, and Other which are not currently supported
const _actionValues = Object.values(ActionType)
const _actionArray = _actionValues
  .filter((value) => typeof value === 'string')
  .map((value) => {
    return { value, title: value }
  })
  .filter((value) => value.title !== 'deposit')
  .filter((value) => value.title !== 'lend')
  .filter((value) => value.title !== 'quest')
  .filter((value) => value.title !== 'other')

export const mainQuestions: PromptObject[] = [
  {
    type: 'text',
    name: 'name',
    message: 'What is the name of the project you are creating a plugin for?',
    validate: (name: string) => {
      if (name.length < 1) {
        return 'Please enter a name'
      }
      if (name.length >= 20) {
        return 'Please enter a name less than 20 characters'
      }
      const invalidNameRegex = new RegExp(/^[a-zA-Z]+$/)
      if (!invalidNameRegex.test(name)) {
        return 'Please use PascalCase or camelCase with no spaces, numbers or special characters'
      }
      return true
    },
  },
  {
    type: 'multiselect',
    name: 'chain',
    message: 'What blockchains are the project on? (multi-select)',
    choices: _chainArray as Choice[],
  },
  {
    type: 'select',
    name: 'action',
    message: 'How would you describe the action you want the user to take?',
    initial: '',
    choices: _actionArray,
  },
  {
    type: 'confirm',
    name: 'publish',
    message:
      'Do you want to make this package public? Answering "yes" will set the "private" field in your package.json to "false"',
    initial: false,
  },
]

export const detailsQuestions: PromptObject[] = [
  {
    type: 'text',
    name: 'projectUrl',
    message: 'What is the project url? (Optional)',
    validate: (name: string) => {
    if (name !== '' && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(name)) {
      return 'Please enter a valid URL';
    }
    return true;
    },
  },
  {
    type: 'text',
    name: 'iconUrl',
    message: 'What is the project icon url? (Optional)',
    initial: '',
    validate: (name: string) => {
    if (name !== '' && !/^(https?:\/\/.*\.(?:png|jpg|jpeg|svg)(\?.*)?)$/.test(name)) {
      return 'Please enter a valid image URL';
    }
    return true;
    },
  },
  {
    type: 'text',
    name: 'taskUrl',
    message: 'What is the action specfic url (ie: https://myProject/trade)? (Optional)',
    validate: (name: string) => {
    if (name !== '' && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(name)) {
      return 'Please enter a valid URL';
    }
    return true;
    },
  },
]

const descriptionQuestion: PromptObject = {
  type: 'text',
  name: 'description',
  message: 'How would you describe this transaction?',
  initial: '',
  validate: (description: string) => {
    if (description.length < 1) {
      return 'Please enter a description'
    }
    if (description.length >= 50) {
      return 'Please enter a description less than 50 characters'
    }
    return true
  },
}

export function getTxHashQuestion(transactions: TransactionDetail[]): PromptObject {
  return {
    type: 'text',
    name: 'hash',
    message: `Provide a transaction hash: ${
      transactions.length === 0 ? '(Optional)' : ''
    }`,
    validate: (input: string) => {
      if (!isHash(input)) {
        return 'Please enter a valid transaction hash'
      }
      return true
    },
  }
}

const mintQuestions: PromptObject[] = [
  {
    type: 'text',
    name: 'tokenId',
    message: 'If mint is ERC-1155, please enter the tokenId (Optional)',
    initial: '',
    validate: (tokenId: string) => {
      if (tokenId && !/^\d+$/.test(tokenId)) {
        return 'Please enter a valid number for tokenId'
      }
      return true
    },
  },
  descriptionQuestion,
]

const swapQuestions: PromptObject[] = [
  {
    type: 'text',
    name: 'tokenIn',
    message:
      'What is the contract address for tokenIn? Use 0x0000000000000000000000000000000000000000 for ETH or other native assets (Optional)',
    initial: '',
    validate: (tokenIn: string) =>
      tokenIn && !isAddress(tokenIn)
        ? 'Please enter a valid token address'
        : true,
  },
  {
    type: (prev: string) => (prev && isAddress(prev) ? 'text' : null),
    name: 'amountIn',
    message: 'What is the amount of tokens swapped? (Optional)',
    initial: '',
    validate: (amountIn: string) =>
      amountIn && !/^\d+(\.\d+)?$/.test(amountIn)
        ? 'Please enter a valid number for amountIn'
        : true,
  },
  {
    type: 'text',
    name: 'tokenOut',
    message:
      'What is the contract address for tokenOut? Use 0x0000000000000000000000000000000000000000 for ETH or other native assets (Optional)',
    initial: '',
    validate: (tokenIn: string) =>
      tokenIn && !isAddress(tokenIn)
        ? 'Please enter a valid token address'
        : true,
  },
  descriptionQuestion,
]

const bridgeQuestions: PromptObject[] = [
  {
    type: 'select',
    name: 'destinationChainId',
    message: 'What is the destination chain?',
    initial: undefined,
    choices: _chainArray as Choice[],
  },
  {
    type: 'text',
    name: 'tokenAddress',
    message:
      'What is the contract address for token being bridged? Use 0x0000000000000000000000000000000000000000 for ETH or other native assets (Optional)',
    initial: '',
    validate: (tokenIn: string) =>
      tokenIn && !isAddress(tokenIn)
        ? 'Please enter a valid token address'
        : true,
  },
  {
    type: (prev: string) => (prev && isAddress(prev) ? 'text' : null),
    name: 'amount',
    message: 'What is the amount of tokens being bridged? (Optional)',
    initial: '',
    validate: (amountIn: string) =>
      amountIn && !/^\d+(\.\d+)?$/.test(amountIn)
        ? 'Please enter a valid amount'
        : true,
  },
  descriptionQuestion,
]

const stakeQuestions: PromptObject[] = [
  {
    type: 'text',
    name: 'tokenOne',
    message:
      'What is the contract address for tokenOne? Use 0x0000000000000000000000000000000000000000 for ETH or other native assets (Optional)',
    initial: '',
    validate: (tokenOne: string) =>
      tokenOne && !isAddress(tokenOne)
        ? 'Please enter a valid token address'
        : true,
  },
  {
    type: (prev: string) => (prev && isAddress(prev) ? 'text' : null),
    name: 'amountOne',
    message: 'What is the amount of tokenOne being staked? (Optional)',
    initial: '',
    validate: (amountOne: string) =>
      amountOne && !/^\d+(\.\d+)?$/.test(amountOne)
        ? 'Please enter a valid amount'
        : true,
  },
  {
    type: 'text',
    name: 'tokenTwo',
    message:
      'What is the contract address for tokenTwo? Use 0x0000000000000000000000000000000000000000 for ETH or other native assets (Optional)',
    initial: '',
    validate: (tokenTwo: string) =>
      tokenTwo && !isAddress(tokenTwo)
        ? 'Please enter a valid token address'
        : true,
  },
  {
    type: (prev: string) => (prev && isAddress(prev) ? 'text' : null),
    name: 'amountTwo',
    message: 'What is the amount of tokenTwo being staked? (Optional)',
    initial: '',
    validate: (amountTwo: string) =>
      amountTwo && !/^\d+(\.\d+)?$/.test(amountTwo)
        ? 'Please enter a valid amount'
        : true,
  },
  descriptionQuestion,
]

const delegateQuestions: PromptObject[] = [
  {
    type: 'text',
    name: 'delegate',
    message: 'What is the address of the delegate? (Optional)',
    initial: '',
    validate: (delegate: string) =>
      delegate && !isAddress(delegate)
        ? 'Please enter a valid address for delegate'
        : true,
  },
  {
    type: 'text',
    name: 'project',
    message: 'What is the project address? (Optional)',
    initial: '',
    validate: (project: string) => {
      if (project && !isAddress(project)) {
        return 'Please enter a valid project address'
      }
      return true
    },
  },
  {
    type: 'text',
    name: 'amount',
    message: 'What is the amount of tokens being delegated? (Optional)',
    initial: '',
    validate: (amount: string) =>
      amount && !/^\d+(\.\d+)?$/.test(amount)
        ? 'Please enter a valid amount'
        : true,
  },
  {
    type: 'text',
    name: 'delegator',
    message: 'What is the address of the delegator? (Optional)',
    initial: '',
    validate: (delegator: string) =>
      delegator && !isAddress(delegator)
        ? 'Please enter a valid address for delegator'
        : true,
  },
  descriptionQuestion,
]

const optionsQuestions: PromptObject[] = [
  {
    type: 'text',
    name: 'token',
    message:
      'What is the contract address for the collateral token? Use 0x0000000000000000000000000000000000000000 for ETH or other native assets (Optional)',
    initial: '',
    validate: (token: string) =>
      token && !isAddress(token) ? 'Please enter a valid token address' : true,
  },
  {
    type: (prev: string) => (prev && isAddress(prev) ? 'text' : null),
    name: 'amount',
    message: 'What is the amount of collateral? (Optional)',
    initial: '',
    validate: (amount: string) =>
      amount && !/^\d+(\.\d+)?$/.test(amount)
        ? 'Please enter a valid amount'
        : true,
  },
  {
    type: 'select',
    name: 'orderType',
    message: 'What is the order type? (Optional)',
    initial: undefined,
    choices: [
      { title: 'Skip', value: null },
      { title: 'Market', value: 'market' },
      { title: 'Limit', value: 'limit' },
    ],
  },
  descriptionQuestion,
]

const voteQuestions: PromptObject[] = [
  {
    type: 'text',
    name: 'project',
    message: 'What is the project address?',
    initial: '',
    validate: (project: string) => {
      if (project && !isAddress(project)) {
        return 'Please enter a valid project address'
      }
      return true
    },
  },
  {
    type: 'select',
    name: 'support',
    message: 'Do you support the proposal?  (Optional)',
    initial: undefined,
    choices: [
      { title: 'Skip', value: null },
      { title: 'Yes', value: true },
      { title: 'No', value: false },
    ],
  },
  {
    type: 'text',
    name: 'proposalId',
    message: 'What is the proposal id? (Optional)',
    initial: '',
    validate: (proposalId: string) =>
      proposalId && !/^\d+$/.test(proposalId)
        ? 'Please enter a valid number for proposalId'
        : true,
  },
  descriptionQuestion,
]

export const actionQuestions: { [key in Actions]: PromptObject[] } = {
  mint: mintQuestions,
  swap: swapQuestions,
  stake: stakeQuestions,
  bridge: bridgeQuestions,
  burn: mintQuestions,
  vote: voteQuestions,
  delegate: delegateQuestions,
  options: optionsQuestions,
}
