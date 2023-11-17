<script lang="ts" setup>
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
import { ref } from 'vue-demi';
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
const H6 = useDriverComponent(RockComponent.H6)
</script>
<template>
  <H6 v-bind="$attrs" :ref="DriverRefKey"><slot></slot></H6>
</template>

<style scoped></style>
