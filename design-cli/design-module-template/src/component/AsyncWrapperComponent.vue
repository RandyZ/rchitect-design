<script setup lang="ts">
import AsyncComp from './AsyncComponent.vue'

defineProps<{ promise: Promise<void> }>()
</script>

<template>
  <Suspense>
    <AsyncComp :promise="promise" />
    <template #fallback>
      fallback
    </template>
  </Suspense>
</template>