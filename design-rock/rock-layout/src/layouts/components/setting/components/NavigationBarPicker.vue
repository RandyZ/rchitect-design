<script lang="ts" setup name="NavigationBarPicker">
import { useI18n } from '@rchitect-rock/locale'
import { unref } from 'vue'
import { NavigationBarType } from '#/layouts/components/setting/constant';

const { t } = useI18n();
defineProps({
  typeList: {
    type: Array as PropType<NavigationBarType[]>,
    default: () => []
  },
  def: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['handler']);

const handlerPicker = (data) => {
  emits('handler', data)
}
</script>
<template>
  <div class="setting-navigation-bar-picker">
    <WmqSpace justify="space-between">
      <template v-for="(item, index) in typeList" :key="index">
        <WmqTooltip placement="bottom" trigger="hover">
          <template #trigger>
            <div class="h-48px w-56px bg-gray-300 rounded relative
                        shadow-inner box-border cursor-pointer
                        overflow-hidden bar-item" :class="[(`bar-item__${item.type}`), { active: item.type == def }]"
              @click="handlerPicker(item)">
              <div class="mix-sidebar"></div>
            </div>
          </template>
          <span>{{ t(unref(item.title)) }}</span>
        </WmqTooltip>
      </template>
    </WmqSpace>
  </div>
</template>
<style lang="less" scoped>
.setting-navigation-bar-picker {
  .bar-item {
    box-shadow: 0px 1px 5px rgba(156, 163, 173, 1);

    &:hover,
    &.active {
      border: 2px solid rgba(6, 96, 189, 1);
    }

    &:before,
    &:after {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
    }

    &:before {
      width: 33%;
      height: 100%;
      z-index: 1;
      background-color: rgba(12, 33, 53, 1);
    }

    &:after {
      width: 100%;
      height: 25%;
      background-color: rgba(249, 250, 251, 1);
    }
  }

  .bar-item__sidebar {
    &:before {
      z-index: 1;
    }
  }

  .bar-item__mix {
    &:before {
      width: 33%;
      height: 100%;
      background-color: rgba(249, 250, 251, 1);
    }

    &:after {
      z-index: 1;
      background-color: rgba(12, 33, 53, 1);
    }
  }

  .bar-item__split-level {
    &:before {
      width: 33%;
      height: 100%;
      background-color: rgba(12, 33, 53, 1);
    }

    &:after {
      z-index: 1;
      background-color: rgba(12, 33, 53, 1);
    }
  }

  .bar-item__top-menu {
    &:before {
      display: none;
    }

    &:after {
      z-index: 1;
      width: 100%;
      height: 25%;
      background-color: rgba(12, 33, 53, 1);
    }
  }

  .bar-item__mix-sidebar {
    &:before {
      width: 25%;
      z-index: 1;
    }

    .mix-sidebar {
      width: 18%;
      height: 100%;
      background-color: rgba(249, 250, 251, 1);
      margin-left: 25%;
    }
  }
}
</style>
