<script lang="ts" setup>
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
import { ref } from 'vue-demi';
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
const H5 = useDriverComponent(RockComponent.H5)
</script>
<template>
  <H5 v-bind="$attrs" :ref="DriverRefKey"><slot></slot></H5>
</template>

<style scoped></style>
