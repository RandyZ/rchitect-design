import type { ExtractPropTypes } from 'vue';
export { default as Button } from './src/BasicButton.vue';
export { default as PopConfirmButton } from './src/PopConfirmButton.vue'
import { buttonProps } from './src/props';

export declare type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>;
