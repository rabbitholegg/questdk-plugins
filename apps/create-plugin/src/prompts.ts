import { getTransaction } from './viem'
import { parseEther, type Hash } from 'viem'
import { ActionParamKeys, Actions } from './params'
import { mainQuestions, actionQuestions } from './questions'
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
const _prompts = require('prompts')

export async function askQuestions() {
  const response = await _prompts(mainQuestions)

  const transactions = []

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
      const transaction = await getTransaction(hash)

      if (transaction) {
        const actionResponse = await _prompts(
          actionQuestions[response.action as Actions],
        )
        let params = getParams(response.action, actionResponse)
        params = buildParams(response.action, transaction, params)
        transactions.push({ ...actionResponse, transaction, params })
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

function buildParams(actionType: Actions, transaction: any, params: any): any {
  switch (actionType) {
    case 'mint' || 'burn':
      return {
        chainId: transaction.chainId,
        ...params,
        contractAddress: `'${transaction.to}'`,
        recipient: `'${transaction.from}'`,
      }
    case 'swap':
      return {
        chainId: transaction.chainId,
        ...params,
        amountIn: params.amountIn
          ? `GreaterThanOrEqual(${parseEther(params.amountIn)})`
          : undefined,
        amountOut: 'GreaterThanOrEqual(1)',
      }
    case 'bridge':
      return {
        sourceChainId: transaction.chainId,
        ...params,
        destinationChainId: params.destinationChainId
          ? Chains[params.destinationChainId]
          : undefined,
        amount: params.amount
          ? `GreaterThanOrEqual(${parseEther(params.amount)})`
          : undefined,
        recipient: `'${transaction.from}'`,
      }
    case 'stake':
      return {
        chainId: transaction.chainId,
        ...params,
        amountOne: params.amountOne
          ? `GreaterThanOrEqual(${parseEther(params.amountOne)})`
          : undefined,
        amountTwo: params.amountTwo
          ? `GreaterThanOrEqual(${parseEther(params.amountTwo)})`
          : undefined,
      }
    case 'vote':
      return {
        chainId: transaction.chainId,
        ...params,
        support: params.support === true,
      }
    case 'delegate':
      return {
        chainId: transaction.chainId,
        ...params,
        amount: params.amount
          ? `GreaterThanOrEqual(${parseEther(params.amount)})`
          : undefined,
        delegator: `'${transaction.from}'`,
      }
    case 'options':
      return {
        chainId: transaction.chainId,
        ...params,
        orderType: params.orderType ? params.orderType === 'market' ? 'OrderType.Market' : 'OrderType.Limit' : undefined,
        amount: params.amount
          ? `GreaterThanOrEqual(${parseEther(params.amount)})`
          : undefined,
        recipient: `'${transaction.from}'`,
      }
    default:
      return {}
  }
}

// Adjusted function to accept an actionType argument
function getParams(actionType: Actions, response: any): any {
  const params: any = {} // Use a more specific type if possible
  if (response && typeof response === 'object' && ActionParamKeys[actionType]) {
    // Dynamically select the key set based on actionType
    const keys = ActionParamKeys[actionType]
    for (const key of keys) {
      if (key in response) {
        params[key] = response[key]
      }
    }
  }
  return params
}
