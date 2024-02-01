import { Command } from 'commander'
import packageJson from '../package.json'
import { createPlugin, logBoostStars } from './builder'
const _prompts = require('prompts')
const figlet = require('figlet')

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
      const invalidNameRegex = new RegExp('[~"#%&*:<>?/\\{|}]+')
      if (invalidNameRegex.test(name)) {
        return 'Please enter a name without special characters'
      }
      return true
    },
  },
  {
    type: 'multiselect',
    name: 'chain',
    message: 'What blockchain is the project on?',
    choices: [
      { title: 'ethereum', value: '1' },
      { title: 'optimism', value: '2' },
    ],
  },
  {
    type: 'text',
    name: 'tx',
    message:
      'Provide an example transaction hash for the action you want to create a plugin for',
    initial: '',
  },
  {
    type: 'multiselect',
    name: 'action',
    message: 'How would you describe the action you want the user to take?',
    initial: '',
    choices: [
      { title: 'mint', value: '1' },
      { title: 'swap', value: '2' },
    ],
  },
]

async function run(): Promise<void> {
  console.log('\n\n\n')

  console.log(figlet.textSync('BOOST'))
  console.log(figlet.textSync('PLUGIN BUILDER'))
  logBoostStars()

  const _response = await _prompts(_questions)

  logBoostStars()
  //   console.log('Creating a plugin for', pluginName)
  //   console.log(_response)
  createPlugin({
    projectName: _response.name,
    chain: _response.chain,
    tx: _response.tx,
    action: _response.action,
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
