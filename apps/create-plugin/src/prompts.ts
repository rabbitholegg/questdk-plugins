import { getTransaction, getTokenInfo } from './viem'
import { parseUnits, type Hash, Address } from 'viem'
import { ActionParamKeys, Actions } from './params'
import { mainQuestions, actionQuestions } from './questions'
import { PromptObject } from 'prompts'
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
      const tokenInfo: Record<string, { symbol?: string; decimals: number }> = {}

      if (transaction) {
        const onSubmit = async (
          prompt: PromptObject,
          answer: string,
        ) => {
          if (
            typeof prompt.name === 'string' &&
            prompt.name.startsWith('token')
          ) {
            const info = await getTokenInfo(
              answer as Address,
              transaction.chainId,
            )
            tokenInfo[prompt.name] = info
            if (info.symbol) {
              console.log(`Token Found: ${info.symbol}`)
            }
          }
        }
        const actionResponse = await _prompts(
          actionQuestions[response.action as Actions],
          { onSubmit },
        )
        let params = getParams(response.action, actionResponse)
        params = buildParams(response.action, transaction, params, tokenInfo)
        params = removeUndefinedParams(params)
        transactions.push({ ...actionResponse, transaction, params, tokenInfo })
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

  const shouldIncludeGreaterThanOrEqual =
    ['swap', 'bridge'].includes(response.action) && transactions.length > 0

  return {
    projectName: response.name,
    chains: response.chain,
    tx: transactions,
    actionType: response.action,
    publish: response.publish,
    shouldIncludeGreaterThanOrEqual,
  }
}

function buildParams(
  actionType: Actions,
  transaction: any,
  params: any,
  tokenInfo: { [key: string]: { symbol?: string; decimals: number } },
): any {
  switch (actionType) {
    case 'mint':
    case 'burn':
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
          ? `GreaterThanOrEqual(${parseUnits(params.amountIn, tokenInfo.tokenIn.decimals)})`
          : 'GreaterThanOrEqual(1)',
        amountOut: 'GreaterThanOrEqual(1)',
      }
    case 'bridge':
      return {
        sourceChainId: transaction.chainId,
        ...params,
        destinationChainId: `Chains.${params.destinationChainId}`,
        amount: params.amount
          ? `GreaterThanOrEqual(${parseUnits(params.amount, tokenInfo.tokenAddress.decimals)})`
          : 'GreaterThanOrEqual(1)',
        recipient: `'${transaction.from}'`,
      }
    case 'stake':
      return {
        chainId: transaction.chainId,
        ...params,
        amountOne: params.amountOne
          ? `GreaterThanOrEqual(${parseUnits(params.amountOne, tokenInfo.tokenOne.decimals)})`
          : undefined,
        amountTwo: params.amountTwo
          ? `GreaterThanOrEqual(${parseUnits(params.amountTwo, tokenInfo.tokenTwo.decimals)})`
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
          ? `GreaterThanOrEqual(${parseUnits(params.amount, 18)})`
          : undefined,
        delegator: `'${transaction.from}'`,
      }
    case 'options':
      return {
        chainId: transaction.chainId,
        ...params,
        orderType: params.orderType
          ? params.orderType === 'market'
            ? 'OrderType.Market'
            : 'OrderType.Limit'
          : undefined,
        amount: params.amount
          ? `GreaterThanOrEqual(${parseUnits(params.amount, tokenInfo.token.decimals)})`
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
        if (response[key] !== '') {
          params[key] = response[key]
        }
      }
    }
  }
  return params
}

function removeUndefinedParams<T>(
  params: Record<string, T>,
): Record<string, T> {
  return Object.entries(params).reduce<Record<string, T>>(
    (acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value
      }
      return acc
    },
    {},
  )
}
