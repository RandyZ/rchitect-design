<script lang="ts" setup>
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
import { ref } from 'vue-demi';
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
const H4 = useDriverComponent(RockComponent.H4)
</script>
<template>
  <H4 v-bind="$attrs" :ref="DriverRefKey"><slot></slot></H4>
</template>

<style scoped></style>
