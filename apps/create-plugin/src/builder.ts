const fs = require('fs-extra')
const path = require('path')
import Handlebars from 'handlebars'
import { cyan, red } from 'picocolors'

type BuilderParams = {
  projectName: string
  chains: string[]
  tx: string
  actionType: string
  publish: boolean
}

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
  logBoostStars()
  console.log('Created a plugin for', cyan(`"${params.projectName}"`))
  console.log()
  console.log('run the following commands:')
  console.log('cd ../..')
  console.log('pnpm i')
  console.log('pnpm run build')
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
  Handlebars.registerHelper('capitalize', function (aString) {
    return capitalize(aString)
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
  const dest = path.join(__dirname, `../../../packages/${params.projectName}`)
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
  const dest = path.join(__dirname, `../../../packages/${params.projectName}`)

  // replace the project name in the package.json
  const packageJsonPath = path.join(dest, 'package.json')
  const packageJson = await fs.readJson(packageJsonPath)
  packageJson.name = `@rabbitholegg/questdk-plugin-${params.projectName}`
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
  const dest = path.join(__dirname, `../../../packages/${params.projectName}`)

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
  const dest = path.join(__dirname, `../../../packages/${params.projectName}`)

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
}
