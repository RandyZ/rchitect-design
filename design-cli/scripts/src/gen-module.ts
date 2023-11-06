import { execNpmCmd } from "./base";

const args = process.argv.slice(2);
console.log('process.argv：\n', process.argv)
console.log('参数：\n', args)
const [moduleName, destination = null, template = '@rchitect-cli/template'] = args;

if (!moduleName) {
  console.log('请指定模块名称');
  process.exit(1);
}
if (!template) {
  console.log('请指定模板名称');
  process.exit(1);
}
// turbo gen workspace --name @rchitect-app/test --type package --copy @rchitect-cli/template
const cmd = [
  'turbo', 'gen', 'workspace', '--root', '../../',
  '--name', `@rchitect-app/${moduleName}`,
  '--type', 'package',
  '--copy', template
];
if (destination) {
  cmd.push('--destination', destination)
}
console.log('执行命令：\n', cmd.join(' '))
execNpmCmd(cmd);
