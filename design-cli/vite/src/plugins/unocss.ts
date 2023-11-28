/**
 * The instant on-demand atomic CSS engine.
 * @see https://github.com/unocss/unocss
 * @see https://github.com/action-hong/unocss-preset-scrollbar
 */

import Unocss from 'unocss/vite'
// import Inspect from 'vite-plugin-inspect'
import { type Preset, type UserConfig, presetAttributify, presetIcons, presetMini, presetUno, defineConfig } from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'
/**
 * 创建Vite插件
 * 
 * @returns 
 */
export function configUnocssPlugin() {
  return [
    Unocss(configUnocss()),
    // Inspect({
    //   build: true,
    //   outputDir: '.vite-inspect'
    // })
  ]
}

/**
 * 生成 unocss 配置
 * @param presets 
 * @returns 
 */
export const configUnocss = (
  presets: Preset[] = [
    presetUno(),
    presetIcons(),
    presetMini({ dark: 'class' }),
    presetAttributify(),
    presetScrollbar()
  ]
) => {
  return {
    exclude: ['node_modules', '.git', 'dist'],
    presets,
    shortcuts: {
      'flex-center': 'flex justify-center items-center',
      'grid-center': 'grid place-content-center',
    },
    theme: {
      colors: {
        primary: 'var(--primary-color)',
      },
      backgroundColor: {},
      transitionProperty: [],
    },
  }
}

export type UserUnocssConfig = UserConfig

/**
 * 创建Unocss配置
 * @param command 
 * @param mode 
 * @param cwd 
 * @param param3 
 * @returns 
 */
export const createUnocssConfig = (
  presets?: Preset[]
): UserUnocssConfig => {
  return defineConfig(configUnocss(presets))
}