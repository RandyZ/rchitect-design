<script lang="ts" setup>
import { ref, onBeforeUnmount } from "vue-demi"
import { useComosables } from './useComosables'
import LayoutMenu from './components/menu'
import LayoutHeader from './components/header/index.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { useContainerSetting, useMenuSettingManager } from "#/hooks";


defineOptions({
  name: 'LayoutLeftMenu',
  wmqDesc: '左侧菜单布局-传统模式',
})

const { headerRef, contentStyle, mainStyle, footerRef } = useComosables()
const { 
  toggleCollapsed, getCollapsed, getMenuWidth, getShowSidebar, destory 
} = useMenuSettingManager()
const containerSetting = useContainerSetting();
const menuLayout = ref<InstanceType<typeof LayoutMenu>>();

const onSelectMenu = (event:any) => {
  // FIXME: 这个是横向功能推荐设置菜单布局的钩子，确认下方法expose的情况
  menuLayout.value.setMenuList(event);
};

onBeforeUnmount(() => {
  destory()
})

</script>
<template>
  <WmqLayout has-sider class="h-full">
    <WmqLayoutSider
      v-if="getShowSidebar"
      show-trigger
      bordered
      :collapsed-width="48"
      :width="getMenuWidth"
      collapse-mode="width"
      :collapsed="getCollapsed"
      @update:collapsed="toggleCollapsed"
    >
      <slot name="sider">
        <LayoutMenu ref="menuLayout"/>
      </slot>
    </WmqLayoutSider>
    <WmqLayout>
      <WmqLayoutHeader ref="headerRef">
        <slot name="header">
          <LayoutHeader @selectMenu="onSelectMenu"/>
        </slot>
      </WmqLayoutHeader>
      <WmqLayout :content-style="contentStyle">
        <WmqLayoutContent :content-style="mainStyle">
          <LayoutMain>
            <slot name="main"></slot>
          </LayoutMain>
        </WmqLayoutContent>
        <WmqLayoutFooter v-if="containerSetting?.showFooter" ref="footerRef">
          <slot name="footer">
            <LayoutFooter/>
          </slot>
        </WmqLayoutFooter>
      </WmqLayout>
    </WmqLayout>
  </WmqLayout>
</template>