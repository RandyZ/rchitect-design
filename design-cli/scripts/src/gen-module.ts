import { execNpmCmd } from "./base";
const prompts = require('prompts')

const args = process.argv.slice(2);

export type ModuleLevel = 'app' | 'cli' | 'def' | 'rock' | 'demo'
export type ModuleType = 'package' | 'app'

const [
  moduleLevel,
  moduleName,
  moduleType = 'package',
  destination = `design-${moduleLevel}/${moduleLevel}-${moduleName}`,
  template = '@rchitect-cli/template',
  root = '../../'
] = args;

/**
 * 生成模块
 * 
 * @param moduleName 模块名称
 * @param moduleLevel 模块级别
 * @param moduleType 模块类型
 * @param destination 目标目录
 * @param root 模版模块名称
 * @param template 模版模块名称
 */
export const generateModule = (
  moduleName: string,
  moduleLevel: ModuleLevel,
  moduleType: ModuleType,
  root: string | null = null,
  destination: string | null = null,
  template: string = '@rchitect-cli/template'
) => {
  if (!moduleName) {
    console.warn('请指定模块名称');
    process.exit(1);
  }
  if (!template) {
    console.warn('请指定模板名称');
    process.exit(1);
  }
  if (!root) {
    console.warn('请指定模板根目录');
    process.exit(1);
  }

  const cmd = [
    'turbo', 'gen', 'workspace',
    '--name', `@rchitect-${moduleLevel}/${moduleName}`,
    '--type', moduleType,
    '--copy', template
  ];
  if (destination) {
    cmd.push('--destination', '../../' + destination)
  }
  console.log('执行命令：\n', cmd.join(' '))
  execNpmCmd(cmd);
};

generateModule(moduleName, moduleLevel as ModuleLevel, moduleType as ModuleType, root, destination, template)
