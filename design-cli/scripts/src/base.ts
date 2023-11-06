import { execa } from 'execa'
import {
  commandArgv,
  error,
  filterWorkspace,
  getWorkspacePackages,
} from './helper'
import { isArray, isString } from 'lodash-es'
import { DEFAULT_SELECT_TYPE } from './constant'
// import ora from 'ora'
// const spinner = ora({
//   text: 'Loading...',
//   color: 'yellow',
// })
const prompts = require('prompts')

/**
 * 执行Npm脚本
 * @param argv 
 * @param script 
 */
export async function runTurboScript(argv: string[], script: string) {
  await execNpmCmd([`-w run turbo:${script}`, ...argv])
}

/**
 * 执行Npm环境中的命令
 * @param argv 
 * @param script 
 */
export async function execNpmCmd(argv: string[]) {
  // spinner.stop()
  execa('pnpm', argv, { stdio: 'inherit', preferLocal: true, })
}

async function baseScript(command: string, isFilterWorkspace: boolean, isAll = false) {
  const argv = commandArgv('filter')
  let filterArgv: string[] = []
  try {
    if (isArray(argv)) {
      filterArgv = argv
        .map((argvItem) => ['--filter', `../${argvItem}`])
        .flatMap((argvItem) => argvItem)
    } else if (isString(argv)) {
      filterArgv = ['--filter', argv]
    } else {
      filterArgv = isFilterWorkspace ? await filterWorkspace() : []
    }
    const workspacePackages = await getWorkspacePackages(filterArgv)
    if (!workspacePackages.length) {
      throw new Error('No items meet the requirements!')
    }
    if (workspacePackages.length === 1) {
      await runTurboScript(['--filter', workspacePackages[0].name], command)
      return
    }
    const choices = workspacePackages.map((item) => ({
      title: item.name,
      value: item.name,
    }))
    let scriptArgv
    if (isAll) {
      scriptArgv = choices.map((argvItem) => ['--filter', argvItem.value])
        .flatMap((argvItem) => argvItem)
    } else {
      const { packages } = await prompts([
        {
          type: DEFAULT_SELECT_TYPE,
          message: `Choose the package to run ${command} script: `,
          name: 'packages',
          choices,
          validate: function (val: any[]) {
            if (val && val.length) return true
            return 'Please choose at least one: '
          },
        },
      ])
      scriptArgv = isArray(packages)
        ? packages
          .map((argvItem) => ['--filter', argvItem])
          .flatMap((argvItem) => argvItem)
        : ['--filter', packages || '']
    }
    await runTurboScript(scriptArgv, command)
  } catch (e) {
    throw e
  }
}

export function run(command: string, isFilterWorkspace = false, isAll = false) {
  // spinner.start()
  baseScript(command, isFilterWorkspace, isAll).catch((err) => {
    error(err)
    process.exit(1)
  })
}
