import { createPlugin, logBoostStars } from './builder'
import { askQuestions } from './prompts'
const figlet = require('figlet')

async function run() {
  console.log('\n\n\n')
  console.log(figlet.textSync('BOOST SDK'))
  console.log(figlet.textSync('PLUGIN CREATOR'))
  logBoostStars()
  const response = await askQuestions()
  createPlugin(response)
}

run()
