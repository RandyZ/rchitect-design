<script lang="ts" setup>
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
import { ref } from 'vue-demi';
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
const H2 = useDriverComponent(RockComponent.H2)
</script>
<template>
  <H2 v-bind="$attrs" :ref="DriverRefKey"><slot></slot></H2>
</template>

<style scoped></style>
