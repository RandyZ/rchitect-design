import { Repository } from "@rchitect-design/types";
import { ThemeEnum } from "@rchitect-design/constants";

export namespace ThemeSettings {
  export interface State extends Repository.State {
    // Theme
    theme:ThemeEnum
    // Theme color
    themeColor:string
    // Website gray mode, open for possible mourning dates
    grayMode:boolean
    // Whether to turn on the color weak mode
    colorWeak:boolean
  }
}