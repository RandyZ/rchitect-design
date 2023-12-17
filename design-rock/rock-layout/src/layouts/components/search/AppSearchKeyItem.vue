<script lang="ts" setup>
defineProps({
  icon: String,
})
</script>

<template>
  <span :class="$attrs.class">
    <WmqIconify :icon="icon" />
  </span>
</template>
