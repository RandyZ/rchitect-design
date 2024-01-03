import type { SporadicSetting } from "@rchitect-design/types";
import {
  CacheTypeEnum,
  ContentLayoutEnum,
  PermissionModeEnum,
  SessionTimeoutProcessingEnum
} from "@rchitect-design/constants";

const def:SporadicSetting = {
  lockTime: 0,
  permissionCacheType: CacheTypeEnum.LOCAL,
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
  contentMode: ContentLayoutEnum.FULL
}
export default def