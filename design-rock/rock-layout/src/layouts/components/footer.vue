<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { createNamespace } from '@rchitect-rock/tools'
import { useAppConfigState } from "#/hooks";
import { toRefs } from "vue-demi";
// import { useI18n } from '@rchitect-rock/locale'
// import { useDefininationConfig } from '@rchitect-rock/hooks'

defineOptions({
  name: 'LayoutFooter',
})

const appConfigState = useAppConfigState()
const web = toRefs(appConfigState.websiteSetting)
const props = defineProps({
  height: {
    type: String,
    default: null,
  },
})
const { bem, cssVarBlock } = createNamespace('footer')
const style = computed(() =>
  (props.height
    ? cssVarBlock({ height: props.height })
    : {}
  ) as CSSProperties,
)
</script>
<template>
  <footer :class="bem()" :style="style">
    <div class="lh-32px">
      <template v-for="(item, index) in appConfigState.websiteSetting.links" :key="index">
        <WmqButton text tag="a" :href="item.url" target="_blank">
          <WmqIconify v-if="item.icon" :icon="item.icon" size="18" />
          <WmqText v-if="item.label" depth="3" :type="'primary'" :ellipsis="true">{{ item.label }}</WmqText>
        </WmqButton>
      </template>
    </div>
    <WmqText depth="3" :type="'primary'" :ellipsis="true">Copyright © {{ appConfigState.websiteSetting.copyright }}</WmqText>
  </footer>
</template>

<style lang="less" scoped>
.footer {
  --footer-padding: 0 20px;
  --footer-height: 60px;
  padding: var(--footer-padding);
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--footer-height);
  text-align: center;
}
</style>
