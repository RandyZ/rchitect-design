import '@rchitect-design/styles';
import 'virtual:svg-icons-register';
import { createApp } from 'vue'
import App from './app.vue'
import { setupRouteGuard } from '@/router-guard';
import { AppContext } from '@rchitect-rock/base-package';
import { IocPlugin, THROWN_HANDLER } from '@rchitect-rock/ioc';
import { Lib as routeLib } from '@rchitect-rock/router';
import { Lib as localeLib } from '@rchitect-rock/locale';
import { Lib as baseComponentLib } from '@rchitect-rock/components';
import { Lib as layoutsLib, useUserGetter, useUserAction } from '@rchitect-rock/layouts';
import { InfrastructureOptions, Lib as infrastructureLib } from '@rchitect-app/infrastructure';
import { Lib as accountLib } from '@rchitect-app/account';
import { NavieuiComponentDriver as ComponentDriver } from '@rchitect-app/component-driver-naive';
import { useGlobConfig } from "@rchitect-rock/hooks";
import { WmqAxiosTransform } from "@/configuration/axios-transform";
import type { FailData, HandleTypes } from "@rchitect-design/types";

(async () => {
  // 创建AppContext
  const appContext = new AppContext({
    defaultScope: 'Singleton',
    autoBindInjectable: true,
    skipBaseClassChecks: true,
  });
  await setupRouteGuard(appContext);
  appContext.addIocModule(async (bind) => {
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
    bind(infrastructureLib.types.AxiosTransform).to(WmqAxiosTransform);
    bind(infrastructureLib.types.InfrastructureOptions).toDynamicValue(() => {
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
  })
  // TODO NaiveUI组件驱动的载入放到组件驱动模块中独立处理
  const bridge:ComponentDriver = ComponentDriver.builder().enableAll();
  const dictionary = bridge.componentDictoray();
  appContext.registerParam(baseComponentLib.types.ComponentDictionary, dictionary);
  // 创建&载入Vue App
  const app = await appContext.load(
    createApp(App)
      // 安装IOC插件
      .use(IocPlugin, appContext)
      // 使用基础设施
      .use(infrastructureLib, appContext)
      // 使用路由
      .use(routeLib, appContext)
      // 布局组件
      .use(layoutsLib, appContext)
      // 本地化
      .use(localeLib, appContext)
      // 使用基础组件
      .use(baseComponentLib, appContext)
      // 账号模块
      .use(accountLib, appContext)
  )
  // 挂载Vue App
  app.mount('#app')
  // When Closing mock, Tree Shaking `mockjs` dep
  if (__VITE_USE_MOCK__) {
    console.info('使用Mock数据～～～')
    // import('../mock/_mock-server').then(({ setupProdMockServer }) =>
    //   setupProdMockServer()
    // );
  }
})()
