import {AppContext, Library} from "@rchitect-rock/base-package";
import {IocPlugin} from '@rchitect-rock/ioc';
import {Lib as routeLib} from '@rchitect-rock/router';
import {Lib as localeLib} from '@rchitect-rock/locale';
import {Lib as stateLib} from '@rchitect-rock/state';
import {Lib as settingsLib} from '@rchitect-rock/settings';
import {Lib, Lib as baseComponentLib, RockComponent, COMPONENT_PREFIX } from '@rchitect-rock/components';
import {Lib as eventBusLib} from '@rchitect-rock/events';
import {Lib as layoutsLib} from '@rchitect-rock/layouts';
import {Lib as infrastructureLib} from '@rchitect-app/infrastructure';
import {Lib as naiveLib} from '@rchitect-app/component-driver-naive';
import {Lib as elementPlusLib} from '@rchitect-app/component-driver-element-plus';
import {Component, createApp} from "vue";
import {forIn} from "lodash-es";

interface SetupOptions {
    modules?: Array<Library<any>>,
    driver?: 'naive' | 'ep'
}

/**
 * 每个模块在写单元测试之前都需要依赖 `@rchitect-app/testing-setup` 模块
 * 调用此方法处理容器的初始化和注入逻辑
 * @param modules 当前业务需要额外注入的 IOC 模块
 * @param driver 期望验证的组件驱动
 */
export async function setup({ modules = [], driver = 'naive' }: SetupOptions = {}) {
    const appContext = new AppContext({
        defaultScope: 'Singleton',
        autoBindInjectable: true,
        skipBaseClassChecks: true,
    });

    // 批量加载所有 IOC 模块，处理全局容器单例的初始化和注入逻辑
    // 加载各个模块的时候，会将所有的组件都挂载到 Vue 实例上，但是这个在单元测试的场景下没有用
    const libraryList = [
        eventBusLib,
        routeLib,
        stateLib,
        settingsLib,
        layoutsLib,
        localeLib,
        baseComponentLib,
        driver == 'naive' ? naiveLib : elementPlusLib,
        infrastructureLib,
        ...modules
    ];
    // VTU 有自己的 Vue 实例，createApp() 生成的是全新的 Vue 实例不会用在单元测试中
    // 但是这里我们只是利用 Vue.use 把 IOC 插件做好装配工作，容器是全局单例，与 Vue 实例无关
    const localVue = createApp().use(IocPlugin, appContext);
    libraryList.forEach(module => {
       localVue.use(module, appContext)
    });
    await appContext.load(localVue)

    // VTU 2.0 的全局组件需要通过 global.components 属性来进行 mock，并且需要传入真实组件，但是代码里用的都是契约组件
    // 构建 Record<RockComponent, DriverComponent> 类型的字典并返回给单元测试使用
    const components: Record<string, Component> = {};
    const param = appContext.getParam(Lib.types.ComponentDictionary);
    forIn(RockComponent, (rockComponent: RockComponent) => {
        components[`${COMPONENT_PREFIX}${rockComponent}`] = param[rockComponent];
    })

    return { components }
}
