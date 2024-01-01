import type { HeaderSetting, Repository } from "@rchitect-design/types";

export namespace Header {
  export interface State extends Repository.State, HeaderSetting {
  }
}