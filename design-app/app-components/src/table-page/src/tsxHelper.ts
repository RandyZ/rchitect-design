import { VueHelper } from "@rchitect-rock/tools";

/**
 * @description 直接使用@rchitect-rock/tools/VueHelper的方法
 */
//Q: 为什么下面这行代码提示“Volar: Property 'getSlot' does not exist on type 'typeof VueHelper'.”
//A: 因为Volar插件的问题，可以忽略
//@ts-ignore
export const getSlot = VueHelper.getSlot
