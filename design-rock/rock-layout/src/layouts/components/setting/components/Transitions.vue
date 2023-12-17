<script lang="ts" setup>
import SwitchItem from './SwitchItem.vue'
import SelectItem from './SelectItem.vue'
import {HandlerSettingEnum} from '@rchitect-design/constants'
// import { resolveContextOptions } from '../../../../../bridge'
import {
  routerTransitionOptions
} from '../constant'
import {useI18n} from '@rchitect-rock/locale';
// import { animateSettingHooks } from "@rchitect-rock/hooks";

const { t } = useI18n();

// const hooks = animateSettingHooks();
const onChange = (value, event) => {
  hooks[event] && hooks[event](value);
};

</script>
<template>
  <WmqSpace vertical>
    <SwitchItem :title="t('layout.setting.progress')"
                :def="hooks.getShowProgress"
                :isEmit="true"
                :event="HandlerSettingEnum.OPEN_PROGRESS"
                @change="onChange($event,'setShowProgress')"/>
    <SwitchItem :title="t('layout.setting.switchLoading')"
                :def="hooks.getShowLoading"
                :isEmit="true"
                :event="HandlerSettingEnum.OPEN_PAGE_LOADING"
                @change="onChange($event,'setShowLoading')"/>
    <SwitchItem :title="t('layout.setting.switchAnimation')"
                :def="hooks.getShowSwitchAnimation"
                :isEmit="true"
                :event="HandlerSettingEnum.OPEN_ROUTE_TRANSITION"
                @change="onChange($event,'setShowSwitchAnimation')"/>
    <SelectItem :title="t('layout.setting.animationType')" :options="routerTransitionOptions"
                :def="hooks.getSwitchAnimation"
                :isEmit="true"
                :event="HandlerSettingEnum.ROUTER_TRANSITION"
                :disabled="!hooks.getShowSwitchAnimation"
                @change="onChange($event, 'setSwitchAnimation')"/>
  </WmqSpace>
</template>
