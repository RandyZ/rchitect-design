<script lang="ts" setup>
import LayoutMenu from '#/layouts/components/menu'
import LayoutHeader from './components/header/index.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { onMounted, ref, unref } from "vue-demi";
import { diKT } from "@rchitect-rock/ioc";
import { useComosables } from './useComosables'
import { Beans as settingBeans } from '@rchitect-rock/settings'
import Logo from '#/layouts/components/logo/index.vue'

// const { Logo } = resolveContextOptions();

const { getMenuWidth } = diKT(settingBeans.MenuSettingManager);
const containerSetting = diKT(settingBeans.AppConfigState).containerSetting

const { headerRef, footerRef, contentStyle, mainStyle } = useComosables()

const active = ref(false);
onMounted(() => {
  active.value = true
})
const activeTrigger = () => {
  active.value = !unref(active)
}
</script>
<template>
  <WmqLayout class="h-full min-w-375px">
    <WmqDrawer v-model:show="active" placement="left" :width="getMenuWidth">
      <WmqDrawerContent :body-content-style="{padding:0}">
        <LayoutMenu/>
      </WmqDrawerContent>
    </WmqDrawer>
    <WmqLayoutHeader ref="headerRef">
      <slot name="header">
        <LayoutHeader>
          <template #logo>
            <WmqSpace align="center" :wrap-item="false">
              <Logo :show-title="false"/>
              <WmqIconify @click="activeTrigger" :icon="active?'menu-fold-outlined':'ant-design:menu-unfold-outlined'"
                          size="24" hoverPointer/>
            </WmqSpace>
          </template>
        </LayoutHeader>
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
</template>

<style scoped></style>
