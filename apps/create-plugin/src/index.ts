import { Command } from 'commander'
// import prompts from 'prompts'
import packageJson from '../package.json'

const figlet = require('figlet')

let pluginName = ''
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

console.log('\n\n\n')

console.log(figlet.textSync('BOOST PLUGIN BUILDER'))
console.log('--------------------------------------- +++')
console.log('--------------------------- +++')
console.log('--------------- +++')
console.log()

if (_options.name) {
  pluginName = _options.name
  console.log(`Creating a plugin for ${pluginName}`)
} else {
  console.log('Please provide a name for the plugin')
  process.exit(1)
}

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
