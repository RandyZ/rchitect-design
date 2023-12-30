import type { AsyncIocModuleCallBack } from "@rchitect-rock/ioc";
import { THROWN_HANDLER } from "@rchitect-rock/ioc";
import type { FailData, HandleTypes } from "@rchitect-design/types";
import { Lib as accountLib } from "@rchitect-app/account";
import { AppAccountRepository } from "@/server/account";
import { InfrastructureOptions, Beans as infrastructureBeans } from "@rchitect-app/infrastructure";
import { AIHelpAxiosTransform } from "@/configuration/axios-transform";
import { useGlobConfig } from "@rchitect-rock/hooks";
import { useUserAction, useUserGetter } from "@rchitect-rock/layouts";
import Beans from "./beankes";
import ApiMappings from "@/server/api-mapping-local";

export default (async (bind) => {
  bind(Beans.ServerApiMapping).toConstantValue(ApiMappings)
  bind(THROWN_HANDLER).toConstantValue({
    async debug(msg:string, handleType:HandleTypes, failData?:FailData, err?:Error) {
      console.debug('Rchitect Sample:' + msg, handleType, failData, err);
    },
    async info(msg:string, handleType:HandleTypes, failData?:FailData, err?:Error) {
      console.debug('Rchitect Sample:' + msg, handleType, failData, err);
    },
    async warn(msg:string, handleType:HandleTypes, failData?:FailData, err?:Error) {
      console.debug('Rchitect Sample:' + msg, handleType, failData, err);
    },
    async error(msg:string, handleType:HandleTypes, failData?:FailData, err?:Error) {
      console.debug('Rchitect Sample:' + msg, handleType, failData, err);
    },
  });
  bind(accountLib.types.Repository).to(AppAccountRepository);
  bind(infrastructureBeans.AxiosTransform).to(AIHelpAxiosTransform);
  bind(infrastructureBeans.InfrastructureOptions).toDynamicValue(() => {
    const { apiUrl } = useGlobConfig();
    // const { t } = useI18n();
    return {
      apiUrl,
      tokenProvider() {
        return useUserGetter().getToken;
      },
      onUnauthorized() {
        useUserAction().logout(true);
        // TODO 提示登出
      },
      onAll(event:string | Symbol, payload?:any) {
        console.log('InfrastructureOptions~~~~~~~', event, payload);
      }
    } as InfrastructureOptions;
  });
}) as AsyncIocModuleCallBack