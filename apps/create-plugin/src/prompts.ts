import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { ActionType } from '@rabbitholegg/questdk'
import { getTransaction } from './viem'
import { type Hash } from 'viem'
const _prompts = require('prompts')
// structure available chains into the format for prompts
const _chainValues = Object.values(Chains)
export const _chainArray = _chainValues
  .filter((value) => typeof value === 'string')
  .map((value, _index) => {
    return { value: value, title: value }
  })

// structure available actiontypes into the format for prompts
// and remove Deposit, Lend, and Other which are not currently supported
const _actionValues = Object.values(ActionType)
export const _actionArray = _actionValues
  .filter((value) => typeof value === 'string')
  .map((value) => {
    return { value, title: value }
  })
  .filter((value) => value.title !== 'deposit')
  .filter((value) => value.title !== 'lend')
  .filter((value) => value.title !== 'other')

export const mainQuestions = [
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
    choices: _chainArray,
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

// const contractAddressQuestion = {
//   type: 'text',
//   name: 'contractAddress',
//   message: 'What is the contract address? (Optional)',
//   initial: '',
// }

// TODO - add questions for other action types

const mintQuestions = [
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
]

// Define a type for the response object from the prompts
type TransactionPromptResponse = {
  hash?: string
  tokenId?: number
  addAnother?: boolean
}

// Assuming getTransaction is defined somewhere
// async function getTransaction(hash: string): Promise<TransactionDetails | string> { ... }

export async function askQuestions() {
  const response = await _prompts(mainQuestions)

  const transactions: Array<
    TransactionPromptResponse & { transactionDetails?: any }
  > = []

  let addAnotherTransaction = true

  while (addAnotherTransaction) {
    // Explicitly type the response from prompts
    const { hash }: { hash: Hash | undefined } = await _prompts({
      type: 'text',
      name: 'hash',
      message: `Provide a transaction hash: ${
        transactions.length === 0 ? '(Optional)' : ''
      }`,
      validate: (input: string) => {
        const regex = /^0x[a-fA-F0-9]{64}$/
        if (input && !regex.test(input)) {
          return 'Please enter a valid transaction hash'
        }
        return true
      },
    })

    if (hash) {
      const transactionDetails = await getTransaction(hash)

      if (transactionDetails) {
        const additionalDetails: Partial<TransactionPromptResponse> =
          await _prompts(mintQuestions)
        transactions.push({ ...additionalDetails, transactionDetails })
      } else {
        console.log('transaction not found')
      }
    }

    const { addAnother }: { addAnother: boolean } = await _prompts({
      type: 'confirm',
      name: 'addAnother',
      message: 'Do you have another transaction?',
      initial: false,
    })

    addAnotherTransaction = addAnother
  }

  return {
    projectName: response.name,
    chains: response.chain,
    tx: transactions,
    actionType: response.action,
    publish: response.publish,
  }
}
