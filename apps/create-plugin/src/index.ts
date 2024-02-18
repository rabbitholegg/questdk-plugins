import { createPlugin, logBoostStars } from './builder'
import { askQuestions } from './prompts'
const figlet = require('figlet')

async function run() {
  console.log('\n\n\n');
  console.log(figlet.textSync('BOOSTDK'));
  console.log(figlet.textSync('PLUGIN CREATOR'));
  logBoostStars();
  const response = await askQuestions()
  createPlugin(response);
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
