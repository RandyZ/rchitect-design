/**
 * Support printing the file name, line number and variable name.
 * Support background highlighting of different files. (Currently supporting .js(x), .ts(x), .vue, .svelte, and .astro)
 * @see https://github.com/yuyinws/vite-plugin-turbo-console
 */
import TurboConsole from "vite-plugin-turbo-console";

export function configTurboConsolePlugin() {
  return TurboConsole({})
}
