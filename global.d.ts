// GlobalComponents for Volar
import { RockButton } from "@rchitect-rock/components";

declare module '@vue/runtime-core' {
  export interface GlobalComponents{
    WmqButton: typeof RockButton
  }
}