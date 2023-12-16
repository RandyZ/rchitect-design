<script lang="ts" setup>
import LayoutMenu from '#/layouts/components/menu'
import LayoutHeader from './components/header/index.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { resolveContextOptions } from '#/../bridge'
import {onMounted, ref, unref} from "vue";
import { useComosables} from './useComosables'
const { useMenuSetting, Logo, useRootSetting } = resolveContextOptions();

const { getMenuWidth } = useMenuSetting()
const { getShowFooter } = useRootSetting();

const {headerRef, footerRef, contentStyle, mainStyle} = useComosables()

const active = ref(false);
onMounted(()=>{
  active.value = true
})
const activeTrigger = ()=>{
  active.value = !unref(active)
}
</script>
<template>
  <WmqLayout class="h-full min-w-375px">
    <WmqDrawer v-model:show="active" placement="left" :width="getMenuWidth">
      <WmqDrawerContent :body-content-style="{padding:0}">
        <LayoutMenu />
      </WmqDrawerContent>
    </WmqDrawer>
    <WmqLayoutHeader ref="headerRef">
      <slot name="header">
        <LayoutHeader>
          <template #logo>
            <WmqSpace align="center" :wrap-item="false">
              <Logo :show-title="false"/>
              <WmqIconify @click="activeTrigger" :icon="active?'menu-fold-outlined':'ant-design:menu-unfold-outlined'" size="24" hoverPointer/>
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
      <WmqLayoutFooter v-if="getShowFooter" ref="footerRef">
        <slot name="footer">
          <LayoutFooter/>
        </slot>
      </WmqLayoutFooter>
    </WmqLayout>
  </WmqLayout>
</template>

<style scoped></style>
