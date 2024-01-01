import { Repository } from "@rchitect-design/types";

/**
 * TODO 将Setting中的State和Getters上浮到AppHeader中
 */
export namespace AppHeader {

  export interface State extends Repository.State {
  }

  export interface Getters extends Repository.Getters {
  }
}