<script lang="ts" setup>
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
import { ref } from 'vue-demi';
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
const H3 = useDriverComponent(RockComponent.H3)
</script>
<template>
  <H3 v-bind="$attrs" :ref="DriverRefKey"><slot></slot></H3>
</template>

<style scoped></style>
