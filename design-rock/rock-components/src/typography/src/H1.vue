<script lang="ts" setup>
import { useDriverComponent, RockComponent } from '#/index'
import { DriverRefKey } from '#/utils/refSupport'
import { ref } from 'vue-demi';
const DriverRef = ref()
defineExpose({ [DriverRefKey]: DriverRef })
const H1 = useDriverComponent(RockComponent.H1)
</script>
<template>
  <H1 v-bind="$attrs" :ref="DriverRefKey"><slot></slot></H1>
</template>

<style scoped></style>
