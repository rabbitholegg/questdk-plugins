import { createPlugin, logBoostStars } from './builder'
const _prompts = require('prompts')
const figlet = require('figlet')
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { ActionType } from '@rabbitholegg/questdk'

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
  .filter((value) => value.title !== 'other')

const _questions = [
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
    message:
      'How would you describe the action you want the user to take?',
    initial: '',
    choices: _actionArray,
  },
  {
    type: 'confirm',
    name: 'publish',
    message: 'Do you want to make this package public? Answering "yes" will set the "private" field in your package.json to "false"',
    initial: false,
  },
]

async function run(): Promise<void> {
  console.log('\n\n\n')

  console.log(figlet.textSync('BOOSTDK'))
  console.log(figlet.textSync('PLUGIN CREATOR'))
  logBoostStars()

  const _response = await _prompts(_questions)

  logBoostStars()
  //   console.log('Creating a plugin for', pluginName)
  //   console.log(_response)
  createPlugin({
    projectName: _response.name,
    chains: _response.chain,
    tx: _response.tx,
    actionType: _response.action,
    publish: _response.publish,
  })
}

run()
/**
 * so to create a plugin we need a transaction hash and a chain
 *  -> from this in theory we can automatically generate the test-transactions.ts file
 * we also need a name
 *  -> create the directory and name the files and update package.json
 * we need an abi for the function the transaction is calling
 *  -> hmmmmmmmm maybe we can pull the `to` address and download the abi from a public source?
 * We need to know the action type so we can set the actionParams
 *  -> we could use this to infer the tests?
 *
 *
 */
