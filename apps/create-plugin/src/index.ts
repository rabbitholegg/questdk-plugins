import { Command } from 'commander'
import packageJson from '../package.json'
import { createPlugin, logBoostStars } from './builder'
const _prompts = require('prompts')
const figlet = require('figlet')
import { Chains } from '@rabbitholegg/questdk-plugin-utils'
import { ActionType } from '@rabbitholegg/questdk'

// structure available chains into the format for prompts
const _chainValues = Object.values(Chains)
const _chainKeys = Object.keys(Chains)
const _chainArray = _chainValues
  .filter((value) => typeof value === 'string')
  .map((value, _index) => {
    return { value: value, title: value }
  })

// structure available actiontypes into the format for prompts
// and remove Deposit, Lend, and Other which are not currently supported
const _actionValues = Object.values(ActionType)
const _actionKeys = Object.keys(ActionType)
const _actionArray = _actionValues
  .filter((value) => typeof value === 'string')
  .map((value, index) => {
    return { value: _actionKeys[index], title: value }
  })
  .filter((value) => value.title !== 'deposit')
  .filter((value) => value.title !== 'lend')
  .filter((value) => value.title !== 'other')

// TODO if/when our state gets more complicated we might want to use conf or something like that
const _pluginName = ''

const _program = new Command()
_program
  .version(packageJson.version)
  .description('A CLI to create a new plugin for the Boost ecosystem')
  .option('-n, --name  <value>', 'The name of the protocol or platform')
  .option('-c, --chain  <value>', 'the name of the blockchain')
  .option('-i, --id  <value>', 'the chain id')
  .option(
    '-t, --tx <value>',
    'An example transaction hash of the action you want to create a plugin for',
  )
  .option(
    '-a, --action <value>',
    'List of actions to create a plugin for, this is used in the UI',
  )
  .parse(process.argv)

const _options = _program.opts()

const _questions = [
  {
    type: 'text',
    name: 'name',
    message: 'What is the name of the project you are creating a plugin for?',
    validate: (name: string) => {
      if (name.length < 1) {
        return 'Please enter a name'
      }
      const invalidNameRegex = new RegExp('^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$')
      if (!invalidNameRegex.test(name)) {
        // See https://docs.npmjs.com/cli/v10/configuring-npm/package-json#name for name rules
        return 'Please enter a valid node package name.'
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
  // {
  //   type: 'text',
  //   name: 'tx',
  //   message:
  //     'Provide an example transaction hash for the action you want to create a plugin for',
  //   initial: '',
  // },
  {
    type: 'multiselect',
    name: 'action',
    message:
      'How would you describe the actions you want the user to take? (multi-select)',
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
    actionTypes: _response.action,
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
