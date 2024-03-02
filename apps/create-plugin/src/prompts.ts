import { Answers, PromptObject } from 'prompts'
import { green, red } from 'picocolors'
import { Address, type Hash, parseUnits } from 'viem'
import { 
  actionQuestions, 
  mainQuestions, 
  getTxHashQuestion, 
  detailsQuestions 
} from './questions'
import { ActionParamKeys, Actions } from './types'
import { getTokenInfo, getTransaction } from './viem'
import type {
  ActionResponse,
  Params,
  Transaction,
  TransactionDetail,
} from './types'
const _prompts = require('prompts')

export async function askQuestions() {
  const response = await _prompts(mainQuestions)

  const transactions: TransactionDetail[] = []

  let addAnotherTransaction = true

  while (addAnotherTransaction) {
    const { hash }: { hash: Hash | undefined } = await _prompts(
      getTxHashQuestion(transactions)
    )

    if (hash) {
      const transaction = await getTransaction(hash)
      const tokenInfo: Record<string, { symbol?: string; decimals: number }> =
        {}

      if (transaction) {
        const onSubmit = async (prompt: PromptObject, answer: string) => {
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
              console.log(green(`Token Found: ${info.symbol}`))
            }
          }
        }
        const actionResponse: ActionResponse = await _prompts(
          actionQuestions[response.action as Actions],
          { onSubmit },
        )
        const initialParams = getParams(response.action, actionResponse)
        const builtParams = buildParams(
          response.action,
          transaction,
          initialParams,
          tokenInfo,
        )
        const finalParams = removeUndefinedParams(builtParams)
        transactions.push({
          description: actionResponse.description,
          transaction,
          params: finalParams,
          tokenInfo,
        })
      } else {
        console.log(red('transaction not found'))
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

  const detailsResponse = await _prompts(detailsQuestions)

  return {
    projectName: response.name,
    chains: response.chain,
    tx: transactions,
    actionType: response.action,
    publish: response.publish,
    details: detailsResponse,
  }
}

function buildParams(
  actionType: Actions,
  transaction: Transaction,
  params: Params,
  tokenInfo: { [key: string]: { symbol?: string; decimals: number } },
): Params {
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
          ? `GreaterThanOrEqual(${parseUnits(
              params.amountIn as string,
              tokenInfo.tokenIn.decimals,
            )})`
          : 'GreaterThanOrEqual(1)',
        amountOut: 'GreaterThanOrEqual(1)',
      }
    case 'bridge':
      return {
        sourceChainId: transaction.chainId,
        ...params,
        destinationChainId: `Chains.${params.destinationChainId}`,
        amount: params.amount
          ? `GreaterThanOrEqual(${parseUnits(
              params.amount as string,
              tokenInfo.tokenAddress.decimals,
            )})`
          : 'GreaterThanOrEqual(1)',
        recipient: `'${transaction.from}'`,
      }
    case 'stake':
      return {
        chainId: transaction.chainId,
        ...params,
        amountOne: params.amountOne
          ? `GreaterThanOrEqual(${parseUnits(
              params.amountOne as string,
              tokenInfo.tokenOne.decimals,
            )})`
          : undefined,
        amountTwo: params.amountTwo
          ? `GreaterThanOrEqual(${parseUnits(
              params.amountTwo as string,
              tokenInfo.tokenTwo.decimals,
            )})`
          : undefined,
      }
    case 'vote':
      return {
        chainId: transaction.chainId,
        ...params,
      }
    case 'delegate':
      return {
        chainId: transaction.chainId,
        ...params,
        amount: params.amount
          ? `GreaterThanOrEqual(${parseUnits(params.amount as string, 18)})`
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
          ? `GreaterThanOrEqual(${parseUnits(
              params.amount as string,
              tokenInfo.token.decimals,
            )})`
          : undefined,
        recipient: `'${transaction.from}'`,
      }
    default:
      return {}
  }
}

function getParams(actionType: Actions, response: Answers<string>): Params {
  const params: Params = {}
  if (response && typeof response === 'object' && ActionParamKeys[actionType]) {
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

function removeUndefinedParams(params: Params): Params {
  return Object.entries(params).reduce<Params>((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value
    }
    return acc
  }, {})
}
