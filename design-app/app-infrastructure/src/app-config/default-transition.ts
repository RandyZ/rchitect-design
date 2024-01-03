import type { TransitionSetting } from "@rchitect-design/types";
import { RouterTransitionEnum } from "@rchitect-design/constants";

const transitionSetting: TransitionSetting = {
  //  Whether to open the page switching animation
  // The disabled state will also disable pageLoading
  enable: true,

  // Route basic switching animation
  basicTransition: RouterTransitionEnum.FADE_SIDE,

  // Whether to open page switching loading
  // Only open when enable=true
  openPageLoading: true,

  // Whether to open the top progress bar
  openNProgress: false,
}
export default transitionSetting;