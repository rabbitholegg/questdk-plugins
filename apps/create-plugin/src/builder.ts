const fs = require('fs-extra')
const path = require('path')
import Handlebars from 'handlebars'
import { cyan, red } from 'picocolors'
import { isAddress } from 'viem'
import { type BuilderParams } from './types'

const arrow = '=>'
const logo = '✛' // not the logo but pretty close

export async function createPlugin(params: BuilderParams) {
  const result = await copyDirectory(params)
  if (!result) {
    return
  }

  registerHelpers()
  await setActionNames(params)
  await replaceProjectName(params)
  await replaceFileNames(params)
  await updateRegistry(params)
  logBoostStars()
  console.log('Created a plugin for', cyan(`"${params.projectName}"`))
  console.log()
  console.log('run the following commands:')
  console.log('pnpm i')
  console.log('pnpm build')
  console.log()
  console.log(
    'View your new plugin todo list in the README, located at',
    cyan(`packages/${params.projectName}/README.md`),
  )

  console.log('\n\n\n')
}

export function logBoostStars() {
  console.log()
  console.log(`--------------------------- ${logo} ${logo} ${logo} `)
  console.log(`--------------------------- ${logo} ${logo} ${logo} `)
  console.log(`--------------------------- ${logo} ${logo} ${logo}  `)
  console.log()
}

function capitalize(aString: string) {
  return aString.charAt(0).toUpperCase() + aString.slice(1)
}

function registerHelpers() {
  Handlebars.registerHelper('lowercase', function (aString) {
    return aString.toLowerCase()
  })
  Handlebars.registerHelper('uppercase', function (aString) {
    return aString.toUpperCase()
  })
  Handlebars.registerHelper('capitalize', function (aString) {
    return capitalize(aString)
  })
  Handlebars.registerHelper('addressToString', function (value) {
    if (typeof value === 'string' && isAddress(value)) {
      return `'${value}'`
    }
    return value
  })
  Handlebars.registerHelper('eq', function (this: string, arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this)
  })
  Handlebars.registerHelper('hasAmountKey', function(this: string, tx, options) {
    // Logic to determine if any tx.params keys start with "amount"
    for (const transaction of tx) {
      for (const key of Object.keys(transaction.params)) {
        if (key.startsWith("amount")) {
          return options.fn(this)
        }
      }
    }
    return options.inverse(this)
  })
}

/**
 * This function creates the directory structure and copies over the template
 *
 * @param params
 * @returns
 */
async function copyDirectory(params: BuilderParams) {
  if (params.projectName === undefined) {
    console.log(` ${red('exiting')} `)
    return false
  }
  // get the target directory location
  const dest = path.join(
    __dirname,
    `../../../packages/${params.projectName.toLowerCase()}`,
  )
  // if there is already a directory with the name throw an error
  if (await fs.pathExists(dest)) {
    console.error(
      `Could not create a plugin called ${red(
        `"${params.projectName}"`,
      )} because it already exists!`,
    )
    return false
  }
  // create the directory
  try {
    await fs.ensureDir(dest)
  } catch (_e) {
    console.error(
      `Could not create a plugin called ${red(
        `"${params.projectName}"`,
      )} because of ${_e}`,
    )
    return false
  }

  // copy the template files to the new directory
  const _source = path.join(__dirname, '../template')
  try {
    await fs.copy(_source, dest)
    console.log(
      `\t ${arrow} Created directory for ${cyan(`"${params.projectName}"`)}!`,
    )
    return true
  } catch (_e) {
    console.error(
      `Could not create a plugin called ${red(
        `"${params.projectName}"`,
      )} because of ${_e}`,
    )
    return false
  }
}

/**
 * This function replaces multiple instances of the project name
 *
 * package.json
 * readme
 * src/project.ts
 * src/project.test.ts
 * index.ts
 *
 * @param params
 * @returns
 */
async function replaceProjectName(params: BuilderParams) {
  // get the target directory location
  const dest = path.join(
    __dirname,
    `../../../packages/${params.projectName.toLowerCase()}`,
  )

  // replace the project name in the package.json
  const packageJsonPath = path.join(dest, 'package.json')
  const packageJson = await fs.readJson(packageJsonPath)
  packageJson.name = `@rabbitholegg/questdk-plugin-${params.projectName.toLowerCase()}`
  packageJson.version = '1.0.0-alpha.0'
  packageJson.private = !params.publish
  packageJson.description = `Plugin for ${params.projectName}`
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })
  console.log(`\t ${arrow} Updated file ${cyan('package.json')}!`)

  //replace the project name in the readme
  const readmePath = path.join(dest, 'README.md')
  const readme = await fs.readFile(readmePath, 'utf8')
  const readmeTemplate = Handlebars.compile(readme)
  await fs.writeFile(readmePath, readmeTemplate(params))
  console.log(`\t ${arrow} Updated file ${cyan('README.md')}!`)

  //replace the project name in index.ts.t
  const indexPath = path.join(dest, 'src/index.ts.t')
  const index = await fs.readFile(indexPath, 'utf8')
  const indexTemplate = Handlebars.compile(index)
  await fs.writeFile(indexPath, indexTemplate(params))
  console.log(`\t ${arrow} Updated file ${cyan('index.ts')}!`)

  const configPath = path.join(dest, 'plugin-details.yml')
  const config = await fs.readFile(configPath, 'utf8')
  const configTemplate = Handlebars.compile(config)
  await fs.writeFile(configPath, configTemplate(params))
  console.log(`\t ${arrow} Updated file ${cyan('plugin-details.yml')}!`)
}

/**
 * This function renames filenames to match the project name -and- it removes the .t(emplate) extension
 *
 * src/project.ts
 * src/project.test.ts
 * index.ts
 *
 * @param params
 * @returns
 */
async function replaceFileNames(params: BuilderParams) {
  // get the target directory location
  const dest = path.join(
    __dirname,
    `../../../packages/${params.projectName.toLowerCase()}`,
  )

  //rename index.ts
  const indexPath = path.join(dest, 'src/index.ts.t')
  await fs.rename(indexPath, path.join(dest, 'src/index.ts'))
  console.log(`\t ${arrow} finalized file ${cyan('index.ts')}!`)

  //rename project.ts
  const projectPath = path.join(dest, 'src/Project.ts.t')
  await fs.rename(
    projectPath,
    path.join(dest, `src/${capitalize(params.projectName)}.ts`),
  )
  console.log(
    `\t ${arrow} finalized file ${cyan(
      `${capitalize(params.projectName)}.ts`,
    )}!`,
  )
  //rename project.test.ts
  const testPath = path.join(dest, 'src/Project.test.ts.t')
  await fs.rename(
    testPath,
    path.join(dest, `src/${capitalize(params.projectName)}.test.ts`),
  )
  console.log(
    `\t ${arrow} finalized file ${cyan(
      `${capitalize(params.projectName)}.test.ts`,
    )}!`,
  )
  //rename test-trasactions.ts
  const transactionsPath = path.join(dest, 'src/test-transactions.ts.t')
  await fs.rename(transactionsPath, path.join(dest, 'src/test-transactions.ts'))
  console.log(`\t ${arrow} finalized file ${cyan('test-transactions.ts')}!`)
}

/**
 * This function creates the code for the specified actions
 *
 *
 * @param params
 * @returns
 */
async function setActionNames(params: BuilderParams) {
  // get the target directory location
  const dest = path.join(
    __dirname,
    `../../../packages/${params.projectName.toLowerCase()}`,
  )

  //replace the action names in the index
  const indexPath = path.join(dest, 'src/index.ts.t')
  const index = await fs.readFile(indexPath, 'utf8')
  const indexTemplate = Handlebars.compile(index)
  await fs.writeFile(indexPath, indexTemplate(params))
  console.log(`\t ${arrow} created actions in file ${cyan('index.ts')}!`)

  //replace the action names in the project file
  const projectPath = path.join(dest, 'src/Project.ts.t')
  const project = await fs.readFile(projectPath, 'utf8')
  const projectTemplate = Handlebars.compile(project)
  await fs.writeFile(projectPath, projectTemplate(params))
  console.log(`\t ${arrow} created actions in file ${cyan('Project.ts')}!`)

  //replace the action names in the project test file
  const testPath = path.join(dest, 'src/Project.test.ts.t')
  const testFile = await fs.readFile(testPath, 'utf8')
  const testTemplate = Handlebars.compile(testFile)
  await fs.writeFile(testPath, testTemplate(params))
  console.log(`\t ${arrow} created actions in file ${cyan('Project.test.ts')}!`)

  // compile test-transactions.ts from template
  const transactionsPath = path.join(dest, 'src/test-transactions.ts.t')
  const transactionsFile = await fs.readFile(transactionsPath, 'utf8')
  const transactionsTemplate = Handlebars.compile(transactionsFile)
  await fs.writeFile(transactionsPath, transactionsTemplate(params))
  console.log(
    `\t ${arrow} created actions in file ${cyan('test-transactions.ts')}!`,
  )
}

export async function updateRegistry(params: BuilderParams) {
  const filePath = path.join(
    __dirname,
    '../../../packages/',
    'registry',
    'src/index.ts',
  )

  const { projectName } = params

  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    const lines: string[] = data.split('\n')
    const importIndex = lines.findIndex((line) =>
      line.includes("import { ENTRYPOINT } from './contract-addresses'"),
    )
    const newImport = `import { ${capitalize(
      projectName,
    )} } from '@rabbitholegg/questdk-plugin-${projectName.toLowerCase()}'`
    lines.splice(importIndex, 0, newImport)
    const pluginIndex = lines.findIndex((line) => line.trim() === '}')
    const newProperty = `  [${capitalize(projectName)}.pluginId]: ${capitalize(
      projectName,
    )},`
    lines.splice(pluginIndex, 0, newProperty)

    const newData = lines.join('\n')
    fs.writeFileSync(filePath, newData, 'utf-8')
  } catch (err) {
    console.error(`Error updating index.ts: ${err}`)
  }

  // add plugin to registry package.json
  const packagefilePath = path.join(
    __dirname,
    '../../../packages/',
    'registry',
    'package.json',
  )
  try {
    const data = fs.readFileSync(packagefilePath, 'utf-8')
    const json = JSON.parse(data)
    const packages = json.dependencies
    json.dependencies = {
      ...packages,
      [`@rabbitholegg/questdk-plugin-${params.projectName.toLowerCase()}`]:
        'workspace:*',
    }
    const newData = JSON.stringify(json, null, 2) + '\n'
    fs.writeFileSync(packagefilePath, newData, 'utf-8')
  } catch (err) {
    console.error(`Error updating package.json: ${err}`)
  }
}
